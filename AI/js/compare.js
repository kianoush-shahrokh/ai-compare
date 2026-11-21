// ===== داده‌های مقایسه =====
const aiData = [
  {
    name: "ChatGPT",
    origin: "foreign",
    originLabel: "آمریکا",
    maker: "OpenAI",
    free: "yes",
    freeLabel: "✅ دارد",
    image: "yes",
    imageLabel: "✅ دارد",
    persian: 3,
    persianLabel: "خوب",
    price: "$20 / ماه"
  },
  {
    name: "Claude",
    origin: "foreign",
    originLabel: "آمریکا",
    maker: "Anthropic",
    free: "yes",
    freeLabel: "✅ محدود",
    image: "no",
    imageLabel: "❌ ندارد",
    persian: 3,
    persianLabel: "خوب",
    price: "$20 / ماه"
  },
  {
    name: "Gemini",
    origin: "foreign",
    originLabel: "آمریکا",
    maker: "Google",
    free: "yes",
    freeLabel: "✅ دارد",
    image: "yes",
    imageLabel: "✅ دارد",
    persian: 3,
    persianLabel: "خوب",
    price: "$20 / ماه"
  },
  {
    name: "Midjourney",
    origin: "foreign",
    originLabel: "آمریکا",
    maker: "Midjourney",
    free: "no",
    freeLabel: "❌ ندارد",
    image: "yes",
    imageLabel: "✅ تخصصی",
    persian: 1,
    persianLabel: "ضعیف",
    price: "$10 / ماه"
  },
  {
    name: "GitHub Copilot",
    origin: "foreign",
    originLabel: "آمریکا",
    maker: "GitHub",
    free: "no",
    freeLabel: "❌ محدود",
    image: "no",
    imageLabel: "❌ ندارد",
    persian: 2,
    persianLabel: "متوسط",
    price: "$10 / ماه"
  },
  {
    name: "DeepSeek",
    origin: "foreign",
    originLabel: "چین",
    maker: "DeepSeek",
    free: "yes",
    freeLabel: "✅ دارد",
    image: "no",
    imageLabel: "❌ ندارد",
    persian: 2,
    persianLabel: "متوسط",
    price: "رایگان"
  },
  {
    name: "Grok",
    origin: "foreign",
    originLabel: "آمریکا",
    maker: "xAI",
    free: "no",
    freeLabel: "❌ محدود",
    image: "yes",
    imageLabel: "✅ محدود",
    persian: 2,
    persianLabel: "متوسط",
    price: "$8 / ماه"
  },
  {
    name: "ویرا (Vira)",
    origin: "iranian",
    originLabel: "ایران",
    maker: "تیم ایرانی",
    free: "yes",
    freeLabel: "✅ دارد",
    image: "yes",
    imageLabel: "✅ دارد",
    persian: 4,
    persianLabel: "عالی",
    price: "رایگان"
  },
  {
    name: "GapGPT",
    origin: "iranian",
    originLabel: "ایران",
    maker: "تیم ایرانی",
    free: "yes",
    freeLabel: "✅ محدود",
    image: "no",
    imageLabel: "❌ محدود",
    persian: 4,
    persianLabel: "عالی",
    price: "رایگان / اشتراک"
  },
  {
    name: "رخشای (Rakhshai)",
    origin: "iranian",
    originLabel: "ایران",
    maker: "آریا هامان",
    free: "yes",
    freeLabel: "✅ دارد",
    image: "yes",
    imageLabel: "✅ دارد",
    persian: 4,
    persianLabel: "عالی",
    price: "سکه‌ای"
  },
  {
    name: "روبو (Robo)",
    origin: "iranian",
    originLabel: "ایران",
    maker: "تیم ایرانی",
    free: "yes",
    freeLabel: "✅ دارد",
    image: "yes",
    imageLabel: "✅ دارد",
    persian: 3,
    persianLabel: "خوب",
    price: "رایگان / اشتراک"
  },
  {
    name: "متیس (MetisAI)",
    origin: "iranian",
    originLabel: "ایران",
    maker: "تیم ایرانی",
    free: "no",
    freeLabel: "❌ محدود",
    image: "no",
    imageLabel: "❌ محدود",
    persian: 3,
    persianLabel: "خوب",
    price: "API-based"
  }
];

// ===== عناصر =====
const tbody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const filterOrigin = document.getElementById("filterOrigin");
const filterFree = document.getElementById("filterFree");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const table = document.getElementById("compareTable");

let sortKey = null;
let sortAsc = true;

// ===== رندر جدول =====
function renderTable(data) {
  tbody.innerHTML = "";

  if (data.length === 0) {
    emptyState.style.display = "block";
    resultCount.textContent = "";
    return;
  }

  emptyState.style.display = "none";
  resultCount.textContent = `📊 ${data.length} هوش مصنوعی نمایش داده می‌شود`;

  data.forEach(ai => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="ai-name-cell">${ai.name}</td>
      <td><span class="badge ${ai.origin}">${ai.originLabel}</span></td>
      <td>${ai.maker}</td>
      <td>${ai.freeLabel}</td>
      <td>${ai.imageLabel}</td>
      <td>${ai.persianLabel}</td>
      <td>${ai.price}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ===== اعمال فیلترها =====
function applyFilters() {
  const search = searchInput.value.trim().toLowerCase();
  const originVal = filterOrigin.value;
  const freeVal = filterFree.value;

  let filtered = aiData.filter(ai => {
    const matchSearch = ai.name.toLowerCase().includes(search) ||
                        ai.maker.toLowerCase().includes(search);
    const matchOrigin = originVal === "all" || ai.origin === originVal;
    const matchFree = freeVal === "all" || ai.free === freeVal;
    return matchSearch && matchOrigin && matchFree;
  });

  // مرتب‌سازی
  if (sortKey) {
    filtered.sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];
      if (typeof valA === "string") {
        return sortAsc ? valA.localeCompare(valB, "fa") : valB.localeCompare(valA, "fa");
      }
      return sortAsc ? valA - valB : valB - valA;
    });
  }

  renderTable(filtered);
}

// ===== مرتب‌سازی با کلیک روی هدر =====
document.querySelectorAll(".compare-table th[data-sort]").forEach(th => {
  th.addEventListener("click", () => {
    const key = th.dataset.sort;
    if (sortKey === key) {
      sortAsc = !sortAsc;
    } else {
      sortKey = key;
      sortAsc = true;
    }

    // آیکون‌ها را ریست کن
    document.querySelectorAll(".sort-icon").forEach(icon => icon.textContent = "↕");
    th.querySelector(".sort-icon").textContent = sortAsc ? "↑" : "↓";

    applyFilters();
  });
});

// ===== رویدادها =====
searchInput.addEventListener("input", applyFilters);
filterOrigin.addEventListener("change", applyFilters);
filterFree.addEventListener("change", applyFilters);

// ===== اجرای اولیه =====
applyFilters();
