-- Generated from lib/demo-data.ts. All records are explicitly demonstrational.

INSERT INTO "Category" ("id", "slug", "name", "eyebrow", "position", "isActive", "updatedAt") VALUES
  ('nutrition', 'nutrition', 'Спортивне харчування', 'Протеїн, амінокислоти, вітаміни', 0, TRUE, CURRENT_TIMESTAMP),
  ('equipment', 'equipment', 'Спортивні товари', 'Для залу та тренувань', 1, TRUE, CURRENT_TIMESTAMP),
  ('clothing', 'clothing', 'Одяг', 'Форма для руху', 2, TRUE, CURRENT_TIMESTAMP),
  ('accessories', 'accessories', 'Аксесуари', 'Шейкери, сумки, рукавички', 3, TRUE, CURRENT_TIMESTAMP);

INSERT INTO "CatalogSection" ("id", "slug", "name", "description", "position", "isActive", "categoryId", "updatedAt") VALUES
  ('protein', 'protein', 'Протеїни', 'Сироваткові, ізоляти та рослинні', 0, TRUE, 'nutrition', CURRENT_TIMESTAMP),
  ('gainers', 'gainers', 'Гейнери', 'Вуглеводно-білкові суміші', 1, TRUE, 'nutrition', CURRENT_TIMESTAMP),
  ('bcaa', 'bcaa', 'BCAA', 'Комплекси розгалужених амінокислот', 2, TRUE, 'nutrition', CURRENT_TIMESTAMP),
  ('creatine', 'creatine', 'Креатин', 'Порошки та капсули', 3, TRUE, 'nutrition', CURRENT_TIMESTAMP),
  ('amino-acids', 'amino-acids', 'Амінокислоти', 'EAA, глютамін та комплекси', 4, TRUE, 'nutrition', CURRENT_TIMESTAMP),
  ('preworkout', 'preworkout', 'Перед тренуванням', 'Тестові передтренувальні комплекси', 5, TRUE, 'nutrition', CURRENT_TIMESTAMP),
  ('vitamins', 'vitamins', 'Вітаміни та здоров’я', 'Омега, мінерали та гідратація', 6, TRUE, 'nutrition', CURRENT_TIMESTAMP),
  ('strength-equipment', 'strength-equipment', 'Силові тренування', 'Стрічки, колеса та пояси', 7, TRUE, 'equipment', CURRENT_TIMESTAMP),
  ('cardio', 'cardio', 'Кардіо', 'Скакалки та інвентар для темпу', 8, TRUE, 'equipment', CURRENT_TIMESTAMP),
  ('recovery', 'recovery', 'Відновлення', 'Ролери та масажний інвентар', 9, TRUE, 'equipment', CURRENT_TIMESTAMP),
  ('tops', 'tops', 'Футболки та худі', 'Верх для тренувань і відпочинку', 10, TRUE, 'clothing', CURRENT_TIMESTAMP),
  ('bottoms', 'bottoms', 'Шорти та низ', 'Одяг для вільного руху', 11, TRUE, 'clothing', CURRENT_TIMESTAMP),
  ('shakers', 'shakers', 'Шейкери та пляшки', 'Для сумішей і води', 12, TRUE, 'accessories', CURRENT_TIMESTAMP),
  ('bags', 'bags', 'Сумки', 'Для форми та спорядження', 13, TRUE, 'accessories', CURRENT_TIMESTAMP),
  ('training-support', 'training-support', 'Підтримка хвату', 'Лямки та рукавички', 14, TRUE, 'accessories', CURRENT_TIMESTAMP);

INSERT INTO "Brand" ("id", "slug", "name", "isActive", "updatedAt") VALUES
  ('gainlab-demo', 'gainlab-demo', 'GainLab Demo', TRUE, CURRENT_TIMESTAMP);

INSERT INTO "Product" ("id", "sku", "slug", "name", "description", "packageLabel", "optionLabel", "price", "oldPrice", "stock", "status", "isDemo", "isFeatured", "isRecommended", "isNew", "artLabel", "artTone", "categoryId", "sectionId", "brandId", "updatedAt") VALUES
  ('demo-whey', 'DEMO-WHEY-BASE', 'demo-whey-lab-900', 'Whey Lab Protein', 'Тестова картка сироваткового протеїну у великій банці для щоденного спортивного раціону.', '900 г', NULL, 1290.00, 1490.00, 12, 'ACTIVE', TRUE, TRUE, TRUE, FALSE, 'WHEY', 'lime', 'nutrition', 'protein', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-creatine', 'DEMO-CREATINE-BASE', 'demo-creatine-300', 'Creatine Mono', 'Демонстраційний моногідрат креатину в порошковому форматі з лаконічною карткою складу.', '300 г', NULL, 690.00, NULL, 12, 'ACTIVE', TRUE, TRUE, FALSE, TRUE, 'CREATINE', 'silver', 'nutrition', 'creatine', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-bcaa', 'DEMO-BCAA-BASE', 'demo-bcaa-211', 'BCAA 2:1:1', 'Тестовий амінокислотний комплекс у форматі BCAA 2:1:1 для демонстрації вибору добавок.', '400 г', NULL, 740.00, 820.00, 3, 'ACTIVE', TRUE, FALSE, TRUE, FALSE, 'BCAA', 'orange', 'nutrition', 'bcaa', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-glutamine', 'DEMO-GLUTAMINE-BASE', 'demo-glutamine-500', 'L-Glutamine', 'Порошкова тестова позиція з L-глютаміном для розділу амінокислот і відновлення.', '500 г', NULL, 810.00, NULL, 12, 'ACTIVE', TRUE, TRUE, TRUE, FALSE, 'GLUTAMINE', 'blue', 'nutrition', 'amino-acids', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-omega', 'DEMO-OMEGA-BASE', 'demo-omega-3', 'Omega 3', 'Демонстраційна капсульна позиція Omega 3 з простим вибором кількості упаковок.', '120 капсул', NULL, 520.00, NULL, 12, 'ACTIVE', TRUE, FALSE, TRUE, TRUE, 'OMEGA 3', 'violet', 'nutrition', 'vitamins', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-preworkout', 'DEMO-PREWORKOUT-BASE', 'demo-pre-workout-390', 'Pre-Workout Pulse', 'Тестовий передтренувальний комплекс у порошку; зараз показаний як тимчасово відсутній.', '390 г', NULL, 990.00, NULL, 0, 'ACTIVE', TRUE, FALSE, FALSE, TRUE, 'PULSE', 'red', 'nutrition', 'preworkout', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-isolate', 'DEMO-ISOLATE-BASE', 'demo-isolate-vanilla-750', 'Isolate Vanilla', 'Демонстраційний протеїновий ізолят зі смаковою позначкою ванілі та акційною ціною.', '750 г', NULL, 1540.00, 1690.00, 12, 'ACTIVE', TRUE, FALSE, TRUE, TRUE, 'ISOLATE', 'blue', 'nutrition', 'protein', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-vegan', 'DEMO-VEGAN-BASE', 'demo-vegan-protein-600', 'Vegan Protein', 'Тестова рослинна протеїнова позиція для майбутньої добірки альтернативних продуктів.', '600 г', NULL, 1180.00, NULL, 3, 'ACTIVE', TRUE, FALSE, TRUE, TRUE, 'VEGAN', 'lime', 'nutrition', 'protein', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-electrolytes', 'DEMO-ELECTROLYTES-BASE', 'demo-electrolytes-20', 'Electrolyte Mix', 'Порційний тестовий формат електролітної суміші у стіках для каталогу гідратації.', '20 стіків', NULL, 460.00, NULL, 12, 'ACTIVE', TRUE, TRUE, TRUE, FALSE, 'HYDRO', 'orange', 'nutrition', 'vitamins', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-vitamins', 'DEMO-VITAMINS-BASE', 'demo-daily-vitamins-60', 'Daily Vitamins', 'Демонстраційний щоденний вітамінний комплекс у компактній капсульній упаковці.', '60 капсул', NULL, 580.00, NULL, 12, 'ACTIVE', TRUE, TRUE, FALSE, FALSE, 'DAILY', 'violet', 'nutrition', 'vitamins', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-bands', 'DEMO-BANDS-BASE', 'demo-resistance-bands', 'Resistance Bands', 'Тестовий комплект із п’яти стрічок для демонстрації інвентарю різного опору.', 'Набір із 5 стрічок', NULL, 720.00, 840.00, 12, 'ACTIVE', TRUE, TRUE, FALSE, FALSE, 'BANDS', 'lime', 'equipment', 'strength-equipment', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-rope', 'DEMO-ROPE-BASE', 'demo-speed-rope', 'Speed Rope', 'Демонстраційна швидкісна скакалка з регулюванням довжини для кардіорозділу.', 'Регульована довжина', NULL, 390.00, NULL, 12, 'ACTIVE', TRUE, FALSE, TRUE, TRUE, 'SPEED', 'blue', 'equipment', 'cardio', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-wheel', 'DEMO-WHEEL-BASE', 'demo-ab-wheel', 'Core Ab Wheel', 'Тестовий набір із роликом і невеликим килимком для домашніх тренувань корпусу.', 'Колесо та килимок', NULL, 640.00, NULL, 3, 'ACTIVE', TRUE, FALSE, TRUE, FALSE, 'CORE', 'orange', 'equipment', 'strength-equipment', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-tee', 'DEMO-TEE-BASE', 'demo-training-tee', 'Training Tee', 'Демонстраційна тренувальна футболка з вибором розміру без заяв про склад тканини.', 'Розміри S–XL', 'Розмір', 790.00, NULL, 12, 'ACTIVE', TRUE, TRUE, FALSE, TRUE, 'TRAIN', 'silver', 'clothing', 'tops', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-hoodie', 'DEMO-HOODIE-BASE', 'demo-recovery-hoodie', 'Recovery Hoodie', 'Тестове худі для дороги до залу й відпочинку з повною демонстраційною розмірною сіткою.', 'Розміри S–XXL', 'Розмір', 1690.00, 1890.00, 3, 'ACTIVE', TRUE, FALSE, TRUE, FALSE, 'RECOVER', 'violet', 'clothing', 'tops', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-shorts', 'DEMO-SHORTS-BASE', 'demo-performance-shorts', 'Performance Shorts', 'Демонстраційні спортивні шорти з вибором розміру для перевірки картки одягу.', 'Розміри S–XL', 'Розмір', 940.00, NULL, 12, 'ACTIVE', TRUE, FALSE, FALSE, TRUE, 'MOVE', 'blue', 'clothing', 'bottoms', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-shaker', 'DEMO-SHAKER-BASE', 'demo-shaker-700', 'Mix Shaker', 'Тестовий шейкер об’ємом 700 мл для води та демонстрації аксесуарів каталогу.', '700 мл', NULL, 290.00, NULL, 12, 'ACTIVE', TRUE, TRUE, TRUE, FALSE, 'MIX', 'lime', 'accessories', 'shakers', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-bag', 'DEMO-BAG-BASE', 'demo-gym-bag-35', 'Gym Bag', 'Демонстраційна спортивна сумка об’ємом 35 літрів для форми й тренувальних речей.', '35 л', NULL, 1290.00, 1450.00, 12, 'ACTIVE', TRUE, FALSE, TRUE, FALSE, 'CARRY', 'red', 'accessories', 'bags', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-bottle', 'DEMO-BOTTLE-BASE', 'demo-steel-bottle-750', 'Steel Bottle', 'Тестова металева пляшка місткістю 750 мл у розділі шейкерів і пляшок.', '750 мл', NULL, 610.00, NULL, 3, 'ACTIVE', TRUE, FALSE, FALSE, TRUE, 'STEEL', 'silver', 'accessories', 'shakers', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-straps', 'DEMO-STRAPS-BASE', 'demo-lifting-straps', 'Lifting Straps', 'Демонстраційна пара лямок для перевірки товарів підтримки хвату в каталозі.', 'Пара', NULL, 340.00, NULL, 12, 'ACTIVE', TRUE, TRUE, FALSE, FALSE, 'GRIP', 'orange', 'accessories', 'training-support', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-whey-chocolate', 'DEMO-WHEY-CHOCOLATE-BASE', 'demo-whey-chocolate-900', 'Whey Chocolate', 'Тестова шоколадна версія сироваткового протеїну у форматі упаковки 900 грамів.', '900 г', NULL, 1340.00, NULL, 12, 'ACTIVE', TRUE, FALSE, TRUE, TRUE, 'CHOCO', 'orange', 'nutrition', 'protein', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-casein', 'DEMO-CASEIN-BASE', 'demo-casein-night-750', 'Casein Night', 'Демонстраційна картка казеїнового протеїну в упаковці 750 грамів.', '750 г', NULL, 1420.00, NULL, 3, 'ACTIVE', TRUE, FALSE, TRUE, FALSE, 'CASEIN', 'violet', 'nutrition', 'protein', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-gainer-mass', 'DEMO-GAINER-MASS-BASE', 'demo-mass-gainer-1500', 'Mass Gainer', 'Тестова велика упаковка гейнера для перевірки цін, знижок і товарної сторінки.', '1500 г', NULL, 1190.00, 1320.00, 12, 'ACTIVE', TRUE, TRUE, FALSE, FALSE, 'MASS', 'red', 'nutrition', 'gainers', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-gainer-pro', 'DEMO-GAINER-PRO-BASE', 'demo-gainer-pro-3000', 'Gainer Pro', 'Демонстраційний гейнер у форматі 3 кг для візуальної перевірки великої фасовки.', '3000 г', NULL, 1990.00, NULL, 12, 'ACTIVE', TRUE, FALSE, TRUE, TRUE, 'GAIN', 'lime', 'nutrition', 'gainers', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-bcaa-zero', 'DEMO-BCAA-ZERO-BASE', 'demo-bcaa-zero-250', 'BCAA Zero', 'Тестова компактна позиція BCAA у порошку для порівняння форматів у розділі.', '250 г', NULL, 650.00, NULL, 12, 'ACTIVE', TRUE, TRUE, FALSE, TRUE, 'BCAA 0', 'blue', 'nutrition', 'bcaa', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-eaa', 'DEMO-EAA-BASE', 'demo-eaa-complex-300', 'EAA Complex', 'Демонстраційний комплекс EAA в упаковці 300 грамів з тестовою акційною ціною.', '300 г', NULL, 790.00, 860.00, 12, 'ACTIVE', TRUE, FALSE, TRUE, FALSE, 'EAA', 'orange', 'nutrition', 'amino-acids', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-creatine-caps', 'DEMO-CREATINE-CAPS-BASE', 'demo-creatine-caps-120', 'Creatine Caps', 'Тестова капсульна версія креатину для порівняння з порошковим форматом.', '120 капсул', NULL, 760.00, NULL, 3, 'ACTIVE', TRUE, FALSE, FALSE, TRUE, 'CREA', 'silver', 'nutrition', 'creatine', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-focus', 'DEMO-FOCUS-BASE', 'demo-pre-workout-focus-300', 'Pre-Workout Focus', 'Демонстраційна передтренувальна позиція у форматі 300 грамів без вигаданого складу.', '300 г', NULL, 920.00, NULL, 12, 'ACTIVE', TRUE, TRUE, TRUE, FALSE, 'FOCUS', 'red', 'nutrition', 'preworkout', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-zma', 'DEMO-ZMA-BASE', 'demo-zma-recovery-90', 'ZMA Recovery', 'Тестова капсульна позиція ZMA для майбутнього розділу мінеральних комплексів.', '90 капсул', NULL, 610.00, NULL, 12, 'ACTIVE', TRUE, FALSE, FALSE, TRUE, 'ZMA', 'violet', 'nutrition', 'vitamins', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-belt', 'DEMO-BELT-BASE', 'demo-lifting-belt', 'Lifting Belt', 'Демонстраційний силовий пояс із вибором розміру для перевірки варіантів товару.', 'Розміри M–XL', 'Розмір', 1280.00, NULL, 12, 'ACTIVE', TRUE, TRUE, TRUE, FALSE, 'BELT', 'silver', 'equipment', 'strength-equipment', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-roller', 'DEMO-ROLLER-BASE', 'demo-massage-roller', 'Massage Roller', 'Тестовий масажний ролер довжиною 45 см для розділу інвентарю відновлення.', '45 см', NULL, 780.00, 890.00, 12, 'ACTIVE', TRUE, FALSE, TRUE, FALSE, 'ROLL', 'blue', 'equipment', 'recovery', 'gainlab-demo', CURRENT_TIMESTAMP),
  ('demo-gloves', 'DEMO-GLOVES-BASE', 'demo-training-gloves', 'Training Gloves', 'Демонстраційні тренувальні рукавички з вибором розміру та тестовою наявністю.', 'Розміри S–XL', 'Розмір', 540.00, NULL, 12, 'ACTIVE', TRUE, FALSE, TRUE, TRUE, 'GRIP', 'lime', 'accessories', 'training-support', 'gainlab-demo', CURRENT_TIMESTAMP);

INSERT INTO "ProductVariant" ("id", "sku", "name", "value", "priceDelta", "stock", "position", "productId") VALUES
  ('demo-tee-variant-1', 'DEMO-TEE-S', 'Розмір', 'S', 0.00, 12, 0, 'demo-tee'),
  ('demo-tee-variant-2', 'DEMO-TEE-M', 'Розмір', 'M', 0.00, 12, 1, 'demo-tee'),
  ('demo-tee-variant-3', 'DEMO-TEE-L', 'Розмір', 'L', 0.00, 12, 2, 'demo-tee'),
  ('demo-tee-variant-4', 'DEMO-TEE-XL', 'Розмір', 'XL', 0.00, 12, 3, 'demo-tee'),
  ('demo-hoodie-variant-1', 'DEMO-HOODIE-S', 'Розмір', 'S', 0.00, 3, 0, 'demo-hoodie'),
  ('demo-hoodie-variant-2', 'DEMO-HOODIE-M', 'Розмір', 'M', 0.00, 3, 1, 'demo-hoodie'),
  ('demo-hoodie-variant-3', 'DEMO-HOODIE-L', 'Розмір', 'L', 0.00, 3, 2, 'demo-hoodie'),
  ('demo-hoodie-variant-4', 'DEMO-HOODIE-XL', 'Розмір', 'XL', 0.00, 3, 3, 'demo-hoodie'),
  ('demo-hoodie-variant-5', 'DEMO-HOODIE-XXL', 'Розмір', 'XXL', 0.00, 3, 4, 'demo-hoodie'),
  ('demo-shorts-variant-1', 'DEMO-SHORTS-S', 'Розмір', 'S', 0.00, 12, 0, 'demo-shorts'),
  ('demo-shorts-variant-2', 'DEMO-SHORTS-M', 'Розмір', 'M', 0.00, 12, 1, 'demo-shorts'),
  ('demo-shorts-variant-3', 'DEMO-SHORTS-L', 'Розмір', 'L', 0.00, 12, 2, 'demo-shorts'),
  ('demo-shorts-variant-4', 'DEMO-SHORTS-XL', 'Розмір', 'XL', 0.00, 12, 3, 'demo-shorts'),
  ('demo-belt-variant-1', 'DEMO-BELT-M', 'Розмір', 'M', 0.00, 12, 0, 'demo-belt'),
  ('demo-belt-variant-2', 'DEMO-BELT-L', 'Розмір', 'L', 0.00, 12, 1, 'demo-belt'),
  ('demo-belt-variant-3', 'DEMO-BELT-XL', 'Розмір', 'XL', 0.00, 12, 2, 'demo-belt'),
  ('demo-gloves-variant-1', 'DEMO-GLOVES-S', 'Розмір', 'S', 0.00, 12, 0, 'demo-gloves'),
  ('demo-gloves-variant-2', 'DEMO-GLOVES-M', 'Розмір', 'M', 0.00, 12, 1, 'demo-gloves'),
  ('demo-gloves-variant-3', 'DEMO-GLOVES-L', 'Розмір', 'L', 0.00, 12, 2, 'demo-gloves'),
  ('demo-gloves-variant-4', 'DEMO-GLOVES-XL', 'Розмір', 'XL', 0.00, 12, 3, 'demo-gloves');

INSERT INTO "Banner" ("id", "title", "subtitle", "linkUrl", "position", "isDemo", "updatedAt") VALUES ('demo-stage-one-banner', 'Формула сильного старту', 'Тестовий банер етапу 1.', '/#popular', 1, TRUE, CURRENT_TIMESTAMP);

INSERT INTO "Supplier" ("id", "name", "code", "isActive", "updatedAt") VALUES ('demo-supplier', 'Тестовий постачальник', 'demo-supplier', FALSE, CURRENT_TIMESTAMP);
