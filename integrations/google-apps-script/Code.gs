const ORDER_FORM_NAME = "gainlab-order";
const KYIV_TIME_ZONE = "Europe/Kyiv";

function doPost(event) {
  const properties = PropertiesService.getScriptProperties();
  const recipient = properties.getProperty("GAINLAB_RECIPIENT");
  const expectedSecret = properties.getProperty("GAINLAB_WEBHOOK_SECRET");
  const actualSecret = event && event.parameter ? event.parameter.token : "";

  if (!recipient || !expectedSecret || actualSecret !== expectedSecret) {
    throw new Error("GainLab webhook configuration is invalid");
  }

  const requestBody = JSON.parse(event.postData.contents || "{}");
  const submission = requestBody.payload || requestBody;

  if (submission.form_name !== ORDER_FORM_NAME || !submission.data) {
    return textResponse("Ignored");
  }

  const submissionId = String(submission.id || "");
  const cache = CacheService.getScriptCache();
  if (submissionId && cache.get(submissionId)) {
    return textResponse("Already sent");
  }

  const data = submission.data;
  const order = normalizeOrder(data, submission.created_at);
  const subject = `Нове замовлення GainLab — ${order.itemCount} шт. на ${order.total}`;
  const options = {
    htmlBody: renderOrderEmail(order),
    name: "GainLab",
  };

  if (order.customerEmail) {
    options.replyTo = order.customerEmail;
  }

  GmailApp.sendEmail(recipient, subject, renderPlainText(order), options);

  if (submissionId) {
    cache.put(submissionId, "sent", 21600);
  }

  return textResponse("Sent");
}

function normalizeOrder(data, createdAt) {
  const itemLines = String(data.orderItems || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return {
    number: String(data.orderNumber || "Не присвоєно"),
    createdAt: formatDate(createdAt),
    customerName: String(data.customerName || "Не вказано"),
    phone: String(data.phone || "Не вказано"),
    customerEmail: String(data.email || ""),
    city: String(data.city || "Не вказано"),
    delivery: formatDelivery(data.delivery),
    comment: String(data.comment || "Без коментаря"),
    itemCount: String(data.itemCount || "0"),
    items: itemLines.map(parseOrderLine),
    total: String(data.orderTotal || "Не вказано"),
  };
}

function parseOrderLine(line) {
  const match = line.match(/^(.*?) — (.*?) × (\d+) = (.+)$/);
  if (!match) {
    return { name: line, option: "—", quantity: "—", total: "—" };
  }

  return {
    name: match[1],
    option: match[2],
    quantity: match[3],
    total: match[4],
  };
}

function formatDelivery(value) {
  if (value === "branch") return "До відділення перевізника";
  if (value === "address") return "Адресна доставка";
  return String(value || "Не вказано");
}

function formatDate(value) {
  const date = value ? new Date(value) : new Date();
  return Utilities.formatDate(date, KYIV_TIME_ZONE, "dd.MM.yyyy HH:mm");
}

function renderOrderEmail(order) {
  const itemRows = order.items.length
    ? order.items.map((item) => `
      <tr>
        <td style="${cellStyle()}">${escapeHtml(item.name)}</td>
        <td style="${cellStyle()}">${escapeHtml(item.option)}</td>
        <td style="${cellStyle("center")}">${escapeHtml(item.quantity)}</td>
        <td style="${cellStyle("right")}"><strong>${escapeHtml(item.total)}</strong></td>
      </tr>`).join("")
    : `<tr><td colspan="4" style="${cellStyle("center")}">Склад замовлення не передано</td></tr>`;

  return `<!doctype html>
<html lang="uk">
  <body style="margin:0;padding:0;background:#f3f5f6;font-family:Arial,Helvetica,sans-serif;color:#111315;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#f3f5f6;border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="680" cellspacing="0" cellpadding="0" style="width:100%;max-width:680px;background:#ffffff;border-collapse:separate;border-spacing:0;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.10);">
            <tr>
              <td style="padding:28px 30px;background:#0b0d0e;color:#ffffff;border-bottom:5px solid #a6ff00;">
                <div style="font-size:26px;font-weight:900;letter-spacing:-.5px;">GAIN<span style="color:#a6ff00;">LAB</span></div>
                <div style="margin-top:8px;font-size:13px;color:#bdc2c4;">Нове тестове замовлення · ${escapeHtml(order.createdAt)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 30px;">
                <h1 style="margin:0 0 22px;font-size:24px;line-height:1.25;color:#0b0d0e;">Дані нового замовлення</h1>

                ${sectionTitle("Клієнт")}
                ${keyValueTable([
                  ["Ім’я та прізвище", order.customerName],
                  ["Телефон", order.phone],
                  ["Email", order.customerEmail || "Не вказано"],
                ])}

                ${sectionTitle("Доставка")}
                ${keyValueTable([
                  ["Населений пункт", order.city],
                  ["Спосіб доставки", order.delivery],
                  ["Коментар", order.comment],
                ])}

                ${sectionTitle("Товари")}
                <table width="100%" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;border:1px solid #d9dddf;font-size:13px;">
                  <thead>
                    <tr style="background:#111516;color:#ffffff;">
                      <th style="${headerCellStyle()}">Товар</th>
                      <th style="${headerCellStyle()}">Варіант</th>
                      <th style="${headerCellStyle("center")}">К-сть</th>
                      <th style="${headerCellStyle("right")}">Сума</th>
                    </tr>
                  </thead>
                  <tbody>${itemRows}</tbody>
                </table>

                <table width="100%" cellspacing="0" cellpadding="0" style="width:100%;margin-top:18px;border-collapse:collapse;background:#eefbd3;border:1px solid #b9df68;">
                  <tr>
                    <td style="padding:14px 16px;font-size:13px;font-weight:700;">Усього товарів: ${escapeHtml(order.itemCount)} шт.</td>
                    <td align="right" style="padding:14px 16px;font-size:18px;font-weight:900;">Разом: ${escapeHtml(order.total)}</td>
                  </tr>
                </table>

                <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#687073;">Це повідомлення автоматично сформоване після підтвердженої заявки GainLab у Netlify Forms. Платіжні дані не збиралися.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function keyValueTable(rows) {
  return `<table width="100%" cellspacing="0" cellpadding="0" style="width:100%;margin-bottom:24px;border-collapse:collapse;border:1px solid #d9dddf;font-size:14px;">
    ${rows.map((row) => `<tr>
      <th width="38%" align="left" style="padding:12px 14px;background:#f1f3f4;border:1px solid #d9dddf;color:#41484b;font-weight:700;">${escapeHtml(row[0])}</th>
      <td style="padding:12px 14px;border:1px solid #d9dddf;color:#111315;word-break:break-word;">${escapeHtml(row[1])}</td>
    </tr>`).join("")}
  </table>`;
}

function sectionTitle(title) {
  return `<h2 style="margin:24px 0 10px;font-size:15px;text-transform:uppercase;letter-spacing:.08em;color:#5f8500;">${escapeHtml(title)}</h2>`;
}

function cellStyle(align) {
  return `padding:11px 12px;border:1px solid #d9dddf;vertical-align:top;text-align:${align || "left"};word-break:break-word;`;
}

function headerCellStyle(align) {
  return `padding:11px 12px;border:1px solid #303536;text-align:${align || "left"};font-weight:800;`;
}

function renderPlainText(order) {
  const items = order.items.map((item) => `- ${item.name}; ${item.option}; ${item.quantity} шт.; ${item.total}`).join("\n");
  return [
    "Нове замовлення GainLab",
    `Дата: ${order.createdAt}`,
    "",
    "КЛІЄНТ",
    `Ім’я та прізвище: ${order.customerName}`,
    `Телефон: ${order.phone}`,
    `Email: ${order.customerEmail || "Не вказано"}`,
    "",
    "ДОСТАВКА",
    `Населений пункт: ${order.city}`,
    `Спосіб доставки: ${order.delivery}`,
    `Коментар: ${order.comment}`,
    "",
    "ТОВАРИ",
    items || "Склад замовлення не передано",
    "",
    `Усього товарів: ${order.itemCount} шт.`,
    `Разом: ${order.total}`,
  ].join("\n");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function textResponse(message) {
  return HtmlService.createHtmlOutput(escapeHtml(message));
}
