export type ProductTag = "hits" | "new" | "sale" | "recommended";
export type DemoProductCategory = "nutrition" | "equipment" | "clothing" | "accessories";
export type DemoProductSectionId =
  | "protein"
  | "gainers"
  | "bcaa"
  | "creatine"
  | "amino-acids"
  | "preworkout"
  | "vitamins"
  | "strength-equipment"
  | "cardio"
  | "recovery"
  | "tops"
  | "bottoms"
  | "shakers"
  | "bags"
  | "training-support";

export type DemoProduct = {
  id: string;
  slug: string;
  categoryId: DemoProductCategory;
  sectionId: DemoProductSectionId;
  brand: string;
  name: string;
  packageLabel: string;
  price: number;
  oldPrice?: number;
  stock: "in-stock" | "low" | "out";
  tags: ProductTag[];
  artLabel: string;
  artTone: "lime" | "blue" | "orange" | "silver" | "violet" | "red";
  isDemo: true;
};

export type DemoCategory = {
  id: string;
  name: string;
  eyebrow: string;
  href: string;
  kind: "nutrition" | "equipment" | "clothing" | "accessories" | "brands";
};

export type DemoCatalogSection = {
  id: DemoProductSectionId;
  categoryId: DemoProductCategory;
  name: string;
  description: string;
  href: string;
};

export const categories: DemoCategory[] = [
  { id: "nutrition", name: "Спортивне харчування", eyebrow: "Протеїн, амінокислоти, вітаміни", href: "/catalog?category=nutrition", kind: "nutrition" },
  { id: "equipment", name: "Спортивні товари", eyebrow: "Для залу та тренувань", href: "/catalog?category=equipment", kind: "equipment" },
  { id: "clothing", name: "Одяг", eyebrow: "Форма для руху", href: "/catalog?category=clothing", kind: "clothing" },
  { id: "accessories", name: "Аксесуари", eyebrow: "Шейкери, сумки, рукавички", href: "/catalog?category=accessories", kind: "accessories" },
  { id: "brands", name: "Бренди", eyebrow: "Добірка виробників", href: "/catalog?category=brands", kind: "brands" },
];

export const catalogSections: DemoCatalogSection[] = [
  { id: "protein", categoryId: "nutrition", name: "Протеїни", description: "Сироваткові, ізоляти та рослинні", href: "/catalog?category=nutrition&section=protein" },
  { id: "gainers", categoryId: "nutrition", name: "Гейнери", description: "Вуглеводно-білкові суміші", href: "/catalog?category=nutrition&section=gainers" },
  { id: "bcaa", categoryId: "nutrition", name: "BCAA", description: "Комплекси розгалужених амінокислот", href: "/catalog?category=nutrition&section=bcaa" },
  { id: "creatine", categoryId: "nutrition", name: "Креатин", description: "Порошки та капсули", href: "/catalog?category=nutrition&section=creatine" },
  { id: "amino-acids", categoryId: "nutrition", name: "Амінокислоти", description: "EAA, глютамін та комплекси", href: "/catalog?category=nutrition&section=amino-acids" },
  { id: "preworkout", categoryId: "nutrition", name: "Перед тренуванням", description: "Тестові передтренувальні комплекси", href: "/catalog?category=nutrition&section=preworkout" },
  { id: "vitamins", categoryId: "nutrition", name: "Вітаміни та здоров’я", description: "Омега, мінерали та гідратація", href: "/catalog?category=nutrition&section=vitamins" },
  { id: "strength-equipment", categoryId: "equipment", name: "Силові тренування", description: "Стрічки, колеса та пояси", href: "/catalog?category=equipment&section=strength-equipment" },
  { id: "cardio", categoryId: "equipment", name: "Кардіо", description: "Скакалки та інвентар для темпу", href: "/catalog?category=equipment&section=cardio" },
  { id: "recovery", categoryId: "equipment", name: "Відновлення", description: "Ролери та масажний інвентар", href: "/catalog?category=equipment&section=recovery" },
  { id: "tops", categoryId: "clothing", name: "Футболки та худі", description: "Верх для тренувань і відпочинку", href: "/catalog?category=clothing&section=tops" },
  { id: "bottoms", categoryId: "clothing", name: "Шорти та низ", description: "Одяг для вільного руху", href: "/catalog?category=clothing&section=bottoms" },
  { id: "shakers", categoryId: "accessories", name: "Шейкери та пляшки", description: "Для сумішей і води", href: "/catalog?category=accessories&section=shakers" },
  { id: "bags", categoryId: "accessories", name: "Сумки", description: "Для форми та спорядження", href: "/catalog?category=accessories&section=bags" },
  { id: "training-support", categoryId: "accessories", name: "Підтримка хвату", description: "Лямки та рукавички", href: "/catalog?category=accessories&section=training-support" },
];

export const products: DemoProduct[] = [
  {
    id: "demo-whey", slug: "demo-whey-lab-900", categoryId: "nutrition", sectionId: "protein", brand: "GainLab Demo", name: "Whey Lab Protein", packageLabel: "900 г",
    price: 1290, oldPrice: 1490, stock: "in-stock", tags: ["hits", "sale", "recommended"], artLabel: "WHEY", artTone: "lime", isDemo: true,
  },
  {
    id: "demo-creatine", slug: "demo-creatine-300", categoryId: "nutrition", sectionId: "creatine", brand: "GainLab Demo", name: "Creatine Mono", packageLabel: "300 г",
    price: 690, stock: "in-stock", tags: ["hits", "new"], artLabel: "CREATINE", artTone: "silver", isDemo: true,
  },
  {
    id: "demo-bcaa", slug: "demo-bcaa-211", categoryId: "nutrition", sectionId: "bcaa", brand: "GainLab Demo", name: "BCAA 2:1:1", packageLabel: "400 г",
    price: 740, oldPrice: 820, stock: "low", tags: ["sale", "recommended"], artLabel: "BCAA", artTone: "orange", isDemo: true,
  },
  {
    id: "demo-glutamine", slug: "demo-glutamine-500", categoryId: "nutrition", sectionId: "amino-acids", brand: "GainLab Demo", name: "L-Glutamine", packageLabel: "500 г",
    price: 810, stock: "in-stock", tags: ["hits", "recommended"], artLabel: "GLUTAMINE", artTone: "blue", isDemo: true,
  },
  {
    id: "demo-omega", slug: "demo-omega-3", categoryId: "nutrition", sectionId: "vitamins", brand: "GainLab Demo", name: "Omega 3", packageLabel: "120 капсул",
    price: 520, stock: "in-stock", tags: ["new", "recommended"], artLabel: "OMEGA 3", artTone: "violet", isDemo: true,
  },
  {
    id: "demo-preworkout", slug: "demo-pre-workout-390", categoryId: "nutrition", sectionId: "preworkout", brand: "GainLab Demo", name: "Pre-Workout Pulse", packageLabel: "390 г",
    price: 990, stock: "out", tags: ["new"], artLabel: "PULSE", artTone: "red", isDemo: true,
  },
  {
    id: "demo-isolate", slug: "demo-isolate-vanilla-750", categoryId: "nutrition", sectionId: "protein", brand: "GainLab Demo", name: "Isolate Vanilla", packageLabel: "750 г",
    price: 1540, oldPrice: 1690, stock: "in-stock", tags: ["new", "sale", "recommended"], artLabel: "ISOLATE", artTone: "blue", isDemo: true,
  },
  {
    id: "demo-vegan", slug: "demo-vegan-protein-600", categoryId: "nutrition", sectionId: "protein", brand: "GainLab Demo", name: "Vegan Protein", packageLabel: "600 г",
    price: 1180, stock: "low", tags: ["new", "recommended"], artLabel: "VEGAN", artTone: "lime", isDemo: true,
  },
  {
    id: "demo-electrolytes", slug: "demo-electrolytes-20", categoryId: "nutrition", sectionId: "vitamins", brand: "GainLab Demo", name: "Electrolyte Mix", packageLabel: "20 стіків",
    price: 460, stock: "in-stock", tags: ["hits", "recommended"], artLabel: "HYDRO", artTone: "orange", isDemo: true,
  },
  {
    id: "demo-vitamins", slug: "demo-daily-vitamins-60", categoryId: "nutrition", sectionId: "vitamins", brand: "GainLab Demo", name: "Daily Vitamins", packageLabel: "60 капсул",
    price: 580, stock: "in-stock", tags: ["hits"], artLabel: "DAILY", artTone: "violet", isDemo: true,
  },
  {
    id: "demo-bands", slug: "demo-resistance-bands", categoryId: "equipment", sectionId: "strength-equipment", brand: "GainLab Demo", name: "Resistance Bands", packageLabel: "Набір із 5 стрічок",
    price: 720, oldPrice: 840, stock: "in-stock", tags: ["hits", "sale"], artLabel: "BANDS", artTone: "lime", isDemo: true,
  },
  {
    id: "demo-rope", slug: "demo-speed-rope", categoryId: "equipment", sectionId: "cardio", brand: "GainLab Demo", name: "Speed Rope", packageLabel: "Регульована довжина",
    price: 390, stock: "in-stock", tags: ["new", "recommended"], artLabel: "SPEED", artTone: "blue", isDemo: true,
  },
  {
    id: "demo-wheel", slug: "demo-ab-wheel", categoryId: "equipment", sectionId: "strength-equipment", brand: "GainLab Demo", name: "Core Ab Wheel", packageLabel: "Колесо та килимок",
    price: 640, stock: "low", tags: ["recommended"], artLabel: "CORE", artTone: "orange", isDemo: true,
  },
  {
    id: "demo-tee", slug: "demo-training-tee", categoryId: "clothing", sectionId: "tops", brand: "GainLab Demo", name: "Training Tee", packageLabel: "Розміри S–XL",
    price: 790, stock: "in-stock", tags: ["hits", "new"], artLabel: "TRAIN", artTone: "silver", isDemo: true,
  },
  {
    id: "demo-hoodie", slug: "demo-recovery-hoodie", categoryId: "clothing", sectionId: "tops", brand: "GainLab Demo", name: "Recovery Hoodie", packageLabel: "Розміри S–XXL",
    price: 1690, oldPrice: 1890, stock: "low", tags: ["sale", "recommended"], artLabel: "RECOVER", artTone: "violet", isDemo: true,
  },
  {
    id: "demo-shorts", slug: "demo-performance-shorts", categoryId: "clothing", sectionId: "bottoms", brand: "GainLab Demo", name: "Performance Shorts", packageLabel: "Розміри S–XL",
    price: 940, stock: "in-stock", tags: ["new"], artLabel: "MOVE", artTone: "blue", isDemo: true,
  },
  {
    id: "demo-shaker", slug: "demo-shaker-700", categoryId: "accessories", sectionId: "shakers", brand: "GainLab Demo", name: "Mix Shaker", packageLabel: "700 мл",
    price: 290, stock: "in-stock", tags: ["hits", "recommended"], artLabel: "MIX", artTone: "lime", isDemo: true,
  },
  {
    id: "demo-bag", slug: "demo-gym-bag-35", categoryId: "accessories", sectionId: "bags", brand: "GainLab Demo", name: "Gym Bag", packageLabel: "35 л",
    price: 1290, oldPrice: 1450, stock: "in-stock", tags: ["sale", "recommended"], artLabel: "CARRY", artTone: "red", isDemo: true,
  },
  {
    id: "demo-bottle", slug: "demo-steel-bottle-750", categoryId: "accessories", sectionId: "shakers", brand: "GainLab Demo", name: "Steel Bottle", packageLabel: "750 мл",
    price: 610, stock: "low", tags: ["new"], artLabel: "STEEL", artTone: "silver", isDemo: true,
  },
  {
    id: "demo-straps", slug: "demo-lifting-straps", categoryId: "accessories", sectionId: "training-support", brand: "GainLab Demo", name: "Lifting Straps", packageLabel: "Пара",
    price: 340, stock: "in-stock", tags: ["hits"], artLabel: "GRIP", artTone: "orange", isDemo: true,
  },
  {
    id: "demo-whey-chocolate", slug: "demo-whey-chocolate-900", categoryId: "nutrition", sectionId: "protein", brand: "GainLab Demo", name: "Whey Chocolate", packageLabel: "900 г",
    price: 1340, stock: "in-stock", tags: ["new", "recommended"], artLabel: "CHOCO", artTone: "orange", isDemo: true,
  },
  {
    id: "demo-casein", slug: "demo-casein-night-750", categoryId: "nutrition", sectionId: "protein", brand: "GainLab Demo", name: "Casein Night", packageLabel: "750 г",
    price: 1420, stock: "low", tags: ["recommended"], artLabel: "CASEIN", artTone: "violet", isDemo: true,
  },
  {
    id: "demo-gainer-mass", slug: "demo-mass-gainer-1500", categoryId: "nutrition", sectionId: "gainers", brand: "GainLab Demo", name: "Mass Gainer", packageLabel: "1500 г",
    price: 1190, oldPrice: 1320, stock: "in-stock", tags: ["hits", "sale"], artLabel: "MASS", artTone: "red", isDemo: true,
  },
  {
    id: "demo-gainer-pro", slug: "demo-gainer-pro-3000", categoryId: "nutrition", sectionId: "gainers", brand: "GainLab Demo", name: "Gainer Pro", packageLabel: "3000 г",
    price: 1990, stock: "in-stock", tags: ["new", "recommended"], artLabel: "GAIN", artTone: "lime", isDemo: true,
  },
  {
    id: "demo-bcaa-zero", slug: "demo-bcaa-zero-250", categoryId: "nutrition", sectionId: "bcaa", brand: "GainLab Demo", name: "BCAA Zero", packageLabel: "250 г",
    price: 650, stock: "in-stock", tags: ["hits", "new"], artLabel: "BCAA 0", artTone: "blue", isDemo: true,
  },
  {
    id: "demo-eaa", slug: "demo-eaa-complex-300", categoryId: "nutrition", sectionId: "amino-acids", brand: "GainLab Demo", name: "EAA Complex", packageLabel: "300 г",
    price: 790, oldPrice: 860, stock: "in-stock", tags: ["sale", "recommended"], artLabel: "EAA", artTone: "orange", isDemo: true,
  },
  {
    id: "demo-creatine-caps", slug: "demo-creatine-caps-120", categoryId: "nutrition", sectionId: "creatine", brand: "GainLab Demo", name: "Creatine Caps", packageLabel: "120 капсул",
    price: 760, stock: "low", tags: ["new"], artLabel: "CREA", artTone: "silver", isDemo: true,
  },
  {
    id: "demo-focus", slug: "demo-pre-workout-focus-300", categoryId: "nutrition", sectionId: "preworkout", brand: "GainLab Demo", name: "Pre-Workout Focus", packageLabel: "300 г",
    price: 920, stock: "in-stock", tags: ["hits", "recommended"], artLabel: "FOCUS", artTone: "red", isDemo: true,
  },
  {
    id: "demo-zma", slug: "demo-zma-recovery-90", categoryId: "nutrition", sectionId: "vitamins", brand: "GainLab Demo", name: "ZMA Recovery", packageLabel: "90 капсул",
    price: 610, stock: "in-stock", tags: ["new"], artLabel: "ZMA", artTone: "violet", isDemo: true,
  },
  {
    id: "demo-belt", slug: "demo-lifting-belt", categoryId: "equipment", sectionId: "strength-equipment", brand: "GainLab Demo", name: "Lifting Belt", packageLabel: "Розміри M–XL",
    price: 1280, stock: "in-stock", tags: ["hits", "recommended"], artLabel: "BELT", artTone: "silver", isDemo: true,
  },
  {
    id: "demo-roller", slug: "demo-massage-roller", categoryId: "equipment", sectionId: "recovery", brand: "GainLab Demo", name: "Massage Roller", packageLabel: "45 см",
    price: 780, oldPrice: 890, stock: "in-stock", tags: ["sale", "recommended"], artLabel: "ROLL", artTone: "blue", isDemo: true,
  },
  {
    id: "demo-gloves", slug: "demo-training-gloves", categoryId: "accessories", sectionId: "training-support", brand: "GainLab Demo", name: "Training Gloves", packageLabel: "Розміри S–XL",
    price: 540, stock: "in-stock", tags: ["new", "recommended"], artLabel: "GRIP", artTone: "lime", isDemo: true,
  },
];
