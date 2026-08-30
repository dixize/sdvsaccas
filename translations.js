/*
 * i18n.js — простая система локализации без перезагрузки страницы.
 * Как это работает:
 *  - каждый переводимый элемент помечен атрибутом data-i18n="ключ"
 *  - для плейсхолдеров используется data-i18n-placeholder="ключ"
 *  - для aria-label — data-i18n-aria="ключ"
 *  - applyLanguage(lang) проходит по всем таким элементам и подставляет текст
 *  - выбранный язык хранится в localStorage и восстанавливается при заходе
 */

const translations = {
  ru: {
    "meta.title": "dixize.store — Разработка сайтов и веб-интерфейсов",
    "meta.description": "Разработка адаптивных сайтов, лендингов и интернет-магазинов на HTML/CSS/JS с интеграцией Telegram и продуманной анимацией.",

    "skip.content": "Перейти к содержанию",

    "nav.advantages": "Преимущества",
    "nav.about": "Обо мне",
    "nav.portfolio": "Портфолио",
    "nav.contact": "Заказать",
    "nav.menuLabel": "Меню",
    "lang.ru": "RU",
    "lang.en": "EN",
    "lang.switchToEn": "Переключить на English",
    "lang.switchToRu": "Переключить на русский",

    "hero.eyebrow": "Веб-разработчик · HTML / CSS / JS",
    "hero.headline": "Создаю премиальные интерфейсы и веб-приложения",
    "hero.lead": "Разрабатываю адаптивные, быстрые и современные сайты с глубокой интеграцией автоматизации и интерактивных элементов.",
    "hero.ctaPrimary": "Рассчитать стоимость",
    "hero.ctaSecondary": "Смотреть работы",
    "hero.tag1": "Чистый ванильный код",
    "hero.tag2": "Telegram-автоматизация",
    "hero.tag3": "Открыт к новым проектам",
    "hero.scroll": "Листайте вниз",

    "adv.eyebrow": "Почему я",
    "adv.title": "Три главных плюса",
    "adv.speed.title": "Высокая скорость",
    "adv.speed.text": "Оптимизированный чистый код без тяжелых библиотек. Молниеносная загрузка на любых устройствах.",
    "adv.responsive.title": "Адаптивность",
    "adv.responsive.text": "Идеальное отображение как на огромных 4K мониторах, так и на экранах старых смартфонов.",
    "adv.automation.title": "Автоматизация",
    "adv.automation.text": "Прямая интеграция с Telegram API. Получайте уведомления и ТЗ от клиентов мгновенно прямо в мессенджер.",

    "about.eyebrow": "Портрет разработчика",
    "about.title": "Создаю проекты, которые работают на вас",
    "about.text": "Я занимаюсь веб-разработкой и созданием интерактивных сайтов. В каждый проект закладываю кастомную анимацию, плавные переходы и продуманную логику. Использую современные возможности ванильного JavaScript в связке с Telegram API для реализации задач любой сложности — от лендингов и корпоративных сайтов до интернет-магазинов.",
    "about.stackLabel": "Стек, с которым я работаю",

    "portfolio.eyebrow": "Кейсы",
    "portfolio.title": "Мои последние работы",
    "portfolio.text": "Лендинги, корпоративные сайты и интернет-магазины — каждый проект с уникальным визуалом и продуманной анимацией.",
    "portfolio.openBtn": "Примеры работ",
    "portfolio.modalTitle": "Мои последние работы",
    "portfolio.closeAria": "Закрыть окно с проектами",
    "portfolio.filter.all": "Все проекты",
    "portfolio.filter.web": "Веб-сайты",
    "portfolio.filter.store": "Магазины",
    "portfolio.viewProject": "Смотреть проект",
    "portfolio.showAll": "Показать все проекты",

    "project.forest.title": "Save Forest",
    "project.forest.category": "UI / Экология",
    "project.forest.text": "Интерактивный сайт, посвященный защите лесов и охране дикой природы. Каталог флоры и фауны, привлекает внимание к экологии через плавный визуал.",
    "project.neon.title": "Neon Gen",
    "project.neon.category": "HTML / CSS / JS",
    "project.neon.text": "Футуристичный генератор случайных чисел и списков с неоновым интерфейсом. Гибкая настройка диапазона и мгновенная генерация результата.",
    "project.office.title": "Проектный офис",
    "project.office.category": "Корпоративный сайт",
    "project.office.text": "Корпоративный сайт-презентация для промышленной экосистемы: автоматизация, видеоаналитика и промышленный IoT в едином стильном интерфейсе.",
    "project.store.title": "Ultra Tech",
    "project.store.category": "Интернет-магазин",
    "project.store.text": "Интернет-магазин премиальной техники с каталогом товаров, корзиной и продуманным пользовательским путём от выбора до покупки.",

    "config.eyebrow": "Интерактивный оптимизатор",
    "config.title": "Сконфигурируйте ваше ТЗ",
    "config.subtitle": "Выберите тип проекта, укажите опции и мгновенно отправьте спецификацию разработчику.",
    "config.step1.label": "Тип проекта",
    "config.step2.label": "Модули",
    "config.step3.label": "Контакты",
    "config.back": "Назад",
    "config.next": "Далее",

    "type.landing.title": "Лендинг / Промо",
    "type.landing.text": "Одностраничный сайт для яркой презентации продукта.",
    "type.landing.example": "Пример структуры",
    "type.service.title": "Сайт услуг",
    "type.service.text": "Многостраничная платформа для бизнеса и услуг.",
    "type.service.example": "Пример структуры",
    "type.store.title": "Интернет-магазин",
    "type.store.text": "Сложная система с корзиной и встроенными модулями.",
    "type.store.example": "Пример структуры",

    "addons.groupLabel": "Дополнительные модули",
    "addons.tg.label": "Интеграция Telegram API",
    "addons.anim.label": "Премиальные UI-анимации",
    "addons.included": "Включено",

    "form.groupLabel": "Контактные данные и детали",
    "form.name.label": "Ваше имя",
    "form.name.placeholder": "Иван Иванов",
    "form.name.error": "Пожалуйста, введите ваше имя",
    "form.contact.label": "Способ связи (Telegram / телефон)",
    "form.contact.placeholder": "@username или +7...",
    "form.contact.error": "Укажите контакт для связи",
    "form.comment.label": "Дополнительные пожелания к ТЗ (необязательно)",
    "form.comment.placeholder": "Например: тёмная тема, интерактивная карта, галерея работ...",

    "price.label": "Предварительный расчёт стоимости:",
    "price.summaryType": "Тип проекта",
    "price.summaryAddons": "Модули",
    "price.summaryNone": "Нет",

    "submit.button": "Утвердить и отправить в Telegram",
    "submit.sending": "Отправка спецификации ТЗ...",
    "submit.error": "Ошибка сети. Повторить?",

    "success.title": "ТЗ успешно сформировано!",
    "success.text": "Спецификация отправлена разработчику в Telegram. Я свяжусь с вами в ближайшее время для подтверждения деталей.",

    "backToTop.aria": "Наверх",

    "footer.text": "Разработка сайтов и веб-интерфейсов для бизнеса и личных проектов.",
    "footer.status": "Открыт к новым проектам",
    "footer.copyright": "© 2026 dixize.store. Все права защищены.",
    "footer.github": "GitHub",
    "footer.telegram": "Telegram",
    "footer.vk": "ВКонтакте",
  },

  en: {
    "meta.title": "dixize.store — Web Development & Digital Interfaces",
    "meta.description": "Responsive websites, landing pages and online stores built with HTML/CSS/JS, with Telegram integration and refined motion design.",

    "skip.content": "Skip to content",

    "nav.advantages": "Advantages",
    "nav.about": "About",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Get a quote",
    "nav.menuLabel": "Menu",
    "lang.ru": "RU",
    "lang.en": "EN",
    "lang.switchToEn": "Switch to English",
    "lang.switchToRu": "Switch to Russian",

    "hero.eyebrow": "Web Developer · HTML / CSS / JS",
    "hero.headline": "I build premium interfaces and web applications",
    "hero.lead": "I develop responsive, fast, modern websites with deep automation integrations and thoughtful interaction design.",
    "hero.ctaPrimary": "Get a price estimate",
    "hero.ctaSecondary": "View my work",
    "hero.tag1": "Clean vanilla code",
    "hero.tag2": "Telegram automation",
    "hero.tag3": "Open to new projects",
    "hero.scroll": "Scroll down",

    "adv.eyebrow": "Why work with me",
    "adv.title": "Three core strengths",
    "adv.speed.title": "High performance",
    "adv.speed.text": "Optimized, dependency-free code with no heavy libraries. Lightning-fast loading on any device.",
    "adv.responsive.title": "Fully responsive",
    "adv.responsive.text": "Pixel-perfect on huge 4K monitors as well as older, smaller smartphone screens.",
    "adv.automation.title": "Automation",
    "adv.automation.text": "Direct Telegram API integration. Get client briefs and notifications instantly, right in your messenger.",

    "about.eyebrow": "Developer profile",
    "about.title": "I build projects that work for you",
    "about.text": "I work on web development and interactive websites. Every project gets custom animation, smooth transitions and carefully thought-through logic. I use modern vanilla JavaScript alongside the Telegram API to deliver projects of any complexity — from landing pages and corporate sites to online stores.",
    "about.stackLabel": "The stack I work with",

    "portfolio.eyebrow": "Case studies",
    "portfolio.title": "Recent work",
    "portfolio.text": "Landing pages, corporate sites and online stores — every project with its own visual identity and carefully crafted motion.",
    "portfolio.openBtn": "View examples",
    "portfolio.modalTitle": "Recent work",
    "portfolio.closeAria": "Close project gallery",
    "portfolio.filter.all": "All projects",
    "portfolio.filter.web": "Websites",
    "portfolio.filter.store": "Stores",
    "portfolio.viewProject": "View project",
    "portfolio.showAll": "Show all projects",

    "project.forest.title": "Save Forest",
    "project.forest.category": "UI / Conservation",
    "project.forest.text": "An interactive site dedicated to forest protection and wildlife conservation. A catalogue of flora and fauna, raising awareness through smooth visuals.",
    "project.neon.title": "Neon Gen",
    "project.neon.category": "HTML / CSS / JS",
    "project.neon.text": "A futuristic random number and list generator with a neon interface. Flexible range settings and instant results.",
    "project.office.title": "Project Office",
    "project.office.category": "Corporate site",
    "project.office.text": "A corporate presentation site for an industrial ecosystem: automation, video analytics and industrial IoT in one cohesive interface.",
    "project.store.title": "Ultra Tech",
    "project.store.category": "E-commerce",
    "project.store.text": "An online store for premium electronics with a product catalogue, cart, and a carefully designed path from browsing to checkout.",

    "config.eyebrow": "Interactive brief builder",
    "config.title": "Configure your project brief",
    "config.subtitle": "Choose a project type, pick your options, and send the spec straight to the developer.",
    "config.step1.label": "Project type",
    "config.step2.label": "Modules",
    "config.step3.label": "Contact",
    "config.back": "Back",
    "config.next": "Next",

    "type.landing.title": "Landing / Promo",
    "type.landing.text": "A single-page site for a bold product presentation.",
    "type.landing.example": "See structure",
    "type.service.title": "Business site",
    "type.service.text": "A multi-page platform for a business or service.",
    "type.service.example": "See structure",
    "type.store.title": "Online store",
    "type.store.text": "A complex system with a cart and built-in modules.",
    "type.store.example": "See structure",

    "addons.groupLabel": "Additional modules",
    "addons.tg.label": "Telegram API integration",
    "addons.anim.label": "Premium UI animations",
    "addons.included": "Included",

    "form.groupLabel": "Contact details",
    "form.name.label": "Your name",
    "form.name.placeholder": "John Smith",
    "form.name.error": "Please enter your name",
    "form.contact.label": "Contact method (Telegram / phone)",
    "form.contact.placeholder": "@username or +1...",
    "form.contact.error": "Please add a way to reach you",
    "form.comment.label": "Extra notes for the brief (optional)",
    "form.comment.placeholder": "E.g. dark theme, an interactive map, a project gallery...",

    "price.label": "Estimated price:",
    "price.summaryType": "Project type",
    "price.summaryAddons": "Modules",
    "price.summaryNone": "None",

    "submit.button": "Confirm & send to Telegram",
    "submit.sending": "Sending your brief...",
    "submit.error": "Network error. Try again?",

    "success.title": "Your brief has been sent!",
    "success.text": "The specification has been sent to the developer on Telegram. I'll get back to you shortly to confirm the details.",

    "backToTop.aria": "Back to top",

    "footer.text": "Web development and digital interfaces for businesses and personal projects.",
    "footer.status": "Open to new projects",
    "footer.copyright": "© 2026 dixize.store. All rights reserved.",
    "footer.github": "GitHub",
    "footer.telegram": "Telegram",
    "footer.vk": "VKontakte",
  },
};

const I18N_STORAGE_KEY = "dixize_lang";

function getStoredLanguage() {
  try {
    const stored = localStorage.getItem(I18N_STORAGE_KEY);
    if (stored === "ru" || stored === "en") return stored;
  } catch (err) {
    /* localStorage может быть недоступен (приватный режим) — используем язык по умолчанию */
  }
  return "ru";
}

function storeLanguage(lang) {
  try {
    localStorage.setItem(I18N_STORAGE_KEY, lang);
  } catch (err) {
    /* тихо игнорируем — язык просто не сохранится между визитами */
  }
}

function translate(key, lang) {
  const dict = translations[lang] || translations.ru;
  return dict[key] !== undefined ? dict[key] : translations.ru[key] || key;
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.title = translate("meta.title", lang);

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", translate("meta.description", lang));

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", translate("meta.title", lang));
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", translate("meta.description", lang));

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = translate(el.getAttribute("data-i18n"), lang);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", translate(el.getAttribute("data-i18n-placeholder"), lang));
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", translate(el.getAttribute("data-i18n-aria"), lang));
  });

  document.querySelectorAll(".lang-switch-btn").forEach((btn) => {
    const isActive = btn.getAttribute("data-lang") === lang;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  const indicator = document.querySelector(".lang-switch-indicator");
  if (indicator) indicator.setAttribute("data-active-lang", lang);

  document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));

  storeLanguage(lang);
}

function initLanguage() {
  applyLanguage(getStoredLanguage());

  document.querySelectorAll(".lang-switch-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if (lang) applyLanguage(lang);
    });
  });
}

document.addEventListener("DOMContentLoaded", initLanguage);
