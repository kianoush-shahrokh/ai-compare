// ===== داده‌های قیمت =====
// priceMonthly: قیمت ماهانه به دلار
// priceYearly: قیمت سالانه (با تخفیف) به دلار — اگر null باشه، تخفیف نداره
// hasFree: آیا نسخه رایگان داره؟
const pricingData = [
  {
    name: "ChatGPT Plus",
    maker: "OpenAI",
    icon: "💬",
    priceMonthly: 20,
    priceYearly: 192, // 20% off ≈ 192
    hasFree: true,
    features: [
      "دسترسی به GPT-6 و مدل‌های پیشرفته",
      "محدودیت پیام بالاتر",
      "تولید تصویر پیشرفته",
      "ابزارهای تحلیل داده و کدنویسی",
      "دستیار صوتی و ویدیویی"
    ],
    popular: true
  },
  {
    name: "Claude Pro",
    maker: "Anthropic",
    icon: "🧠",
    priceMonthly: 20,
    priceYearly: 204, // $17/ماه معادل سالانه
    hasFree: true,
    features: [
      "استفاده ۵ برابری نسبت به نسخه رایگان",
      "دسترسی به مدل‌های Opus و Sonnet",
      "پردازش اسناد طولانی",
      "پروژه‌ها و حافظه پیشرفته",
      "اولویت دسترسی در ساعات شلوغ"
    ],
    popular: false
  },
  {
    name: "Google AI Pro",
    maker: "Google",
    icon: "✨",
    priceMonthly: 19.99,
    priceYearly: 191.90,
    hasFree: true,
    features: [
      "دسترسی به Gemini پیشرفته",
      "یکپارچگی با Gmail و Docs",
      "تولید تصویر و ویدیو",
      "۲ ترابایت فضای ابری",
      "Gemini در Google Sheets"
    ],
    popular: false
  },
  {
    name: "Midjourney Basic",
    maker: "Midjourney",
    icon: "🎨",
    priceMonthly: 10,
    priceYearly: 96,
    hasFree: false,
    features: [
      "حدود ۲۰۰ تصویر در ماه",
      "دسترسی به گالری عمومی",
      "حالت Fast و Relax",
      "تولید تصویر با کیفیت بالا",
      "بدون نسخه رایگان"
    ],
    popular: false
  },
  {
    name: "GitHub Copilot",
    maker: "GitHub",
    icon: "💻",
    priceMonthly: 10,
    priceYearly: 100,
    hasFree: true,
    features: [
      "اتوکامپلیت هوشمند کد",
      "چت درون VS Code",
      "پشتیبانی از چند زبان برنامه‌نویسی",
      "توضیح و ریفکتور کد",
      "نسخه رایگان محدود"
    ],
    popular: false
  },
  {
    name: "ویرا (Vira)",
    maker: "ایرانی",
    icon: "🇮🇷",
    priceMonthly: 0, // رایگان با پلن‌های ارتقا
    priceYearly: null,
    hasFree: true,
    features: [
      "دسترسی به GPT, Claude, Gemini, Grok",
      "بدون نیاز به فیلترشکن",
      "تولید و ویرایش تصویر",
      "تقلید صدا و گفتار به متن",
      "پرداخت ریالی"
    ],
    popular: true,
    isIranian: true
  },
  {
    name: "رخشای (Rakhshai)",
    maker: "ایرانی",
    icon: "🇮🇷",
    priceMonthly: 0, // سکه‌ای / بسته‌ای
    priceYearly: null,
    hasFree: true,
    features: [
      "مدل اختصاصی «زال» برای متن",
      "مدل «شهرزاد» برای تصویر",
      "۲,۵۰۰ سکه رایگان شروع",
      "پشتیبانی ۱۶ زبان",
      "API برای توسعه‌دهندگان"
    ],
    popular: false,
    isIranian: true
  },
  {
    name: "GapGPT",
    maker: "ایرانی",
    icon: "🇮🇷",
    priceMonthly: 0,
    priceYearly: null,
    hasFree: true,
    features: [
      "چت فارسی با GPT-5",
      "بدون فیلترشکن",
      "تولید محتوا و ایده‌پردازی",
      "نسخه رایگان محدود",
      "اپلیکیشن اندروید"
    ],
    popular: false,
    isIranian: true
  }
];

// ===== وضعیت =====
let isYearly = false;
const grid = document.getElementById("pricingGrid");
const toggle = document.getElementById("billingToggle");
const labelMonthly = document.getElementById("labelMonthly");
const labelYearly = document.getElementById("labelYearly");

// ===== رندر کارت‌ها =====
function renderPricing() {
  grid.innerHTML = "";

  pricingData.forEach(plan => {
    const card = document.createElement("div");
    card.className = "pricing-card" + (plan.popular ? " popular" : "");

    let priceHtml = "";
    if (plan.isIranian) {
      if (plan.priceMonthly === 0) {
        priceHtml = `<span class="price-free">رایگان / سکه‌ای</span>`;
      }
    } else {
      const price = isYearly && plan.priceYearly ? plan.priceYearly : plan.priceMonthly;
      const period = isYearly && plan.priceYearly ? "/ سال" : "/ ماه";
      const monthlyEquivalent = isYearly && plan.priceYearly
        ? `<span class="price-monthly-eq">معادل ${(plan.priceYearly / 12).toFixed(1)}$ در ماه</span>`
        : "";
      priceHtml = `
        <span class="price-amount">$${price % 1 === 0 ? price : price.toFixed(2)}</span>
        <span class="price-period">${period}</span>
        ${monthlyEquivalent}
      `;
    }

    let badge = "";
    if (plan.popular) {
      badge = `<div class="popular-badge">${plan.isIranian ? "🇮🇷 پیشنهاد ایرانی" : "🔥 محبوب‌ترین"}</div>`;
    }

    let freeBadge = plan.hasFree
      ? `<span class="free-badge">✅ نسخه رایگان دارد</span>`
      : `<span class="no-free-badge">❌ بدون نسخه رایگان</span>`;

    card.innerHTML = `
      ${badge}
      <div class="pricing-header">
        <div class="pricing-icon">${plan.icon}</div>
        <h3>${plan.name}</h3>
        <p class="pricing-maker">${plan.maker}</p>
      </div>
      <div class="pricing-price">
        ${priceHtml}
      </div>
      <div class="pricing-free-status">${freeBadge}</div>
      <ul class="pricing-features">
        ${plan.features.map(f => `<li>✓ ${f}</li>`).join("")}
      </ul>
      <a href="#" class="btn btn-primary pricing-btn">
        ${plan.isIranian ? "مشاهده سایت" : "انتخاب پلن"}
      </a>
    `;

    grid.appendChild(card);
  });
}

// ===== تغییر دوره =====
toggle.addEventListener("click", () => {
  isYearly = !isYearly;
  toggle.classList.toggle("active", isYearly);

  labelMonthly.classList.toggle("active", !isYearly);
  labelYearly.classList.toggle("active", isYearly);

  renderPricing();
});

// ===== اجرای اولیه =====
renderPricing();