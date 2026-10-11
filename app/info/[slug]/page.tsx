import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Suspense } from "react";

const pages: Record<string, { title: string; note: string }> = {
  about: { title: "Про нас", note: "Зміст сторінки буде підготовлено після погодження позиціонування магазину." },
  contacts: { title: "Контакти", note: "Контактні дані не додані, щоб не вигадувати реквізити магазину." },
  delivery: { title: "Доставка та оплата", note: "Умови, тарифи та строки не вказані до підтвердження реальних партнерів і правил." },
  returns: { title: "Обмін та повернення", note: "Юридично значущі умови буде додано лише після погодження власником." },
  privacy: { title: "Політика конфіденційності", note: "Це сторінка-заготовка без вигаданих юридичних формулювань." },
  offer: { title: "Публічна оферта", note: "Це сторінка-заготовка без вигаданих реквізитів та комерційних умов." },
};

async function InfoContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = pages[slug] ?? { title: "Інформація", note: "Матеріал для цієї сторінки ще не підготовлено." };

  return (
    <article className="w-full max-w-3xl rounded-[2.5rem] border border-black/8 bg-white p-7 shadow-xl shadow-black/5 sm:p-12">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-ink"><ArrowLeft size={18} /> На головну</Link>
      <FileText className="mt-14 text-[#6d9700]" size={44} />
      <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-[#5f8500]">Сторінка-заготовка</p>
      <h1 className="display-face mt-3 text-4xl sm:text-6xl">{content.title}</h1>
      <p className="mt-6 text-base leading-7 text-muted">{content.note}</p>
      <div className="mt-8 rounded-2xl bg-[#efffd0] p-4 text-sm font-bold text-ink">Реквізити, гарантії та умови не вигадані. Сторінку буде доповнено перевіреною інформацією.</div>
    </article>
  );
}

export default function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <main className="grid min-h-screen place-items-center bg-mist px-4 py-16">
      <Suspense fallback={<div className="text-sm font-bold text-muted">Завантаження…</div>}>
        <InfoContent params={params} />
      </Suspense>
    </main>
  );
}
