/* ========= 連結設定：把這些換成你的真實連結 ========= */
const URLS = {
  FORM_URL: "https://forms.gle/XD1be3fsZhPkxKD98",   // 投標表單
  LIST_URL: "https://docs.google.com/spreadsheets/d/1UW5O96Zl5oJ8n3jLkvkU9P6FsuzmRmBXR7EJcT-F0T4/edit?usp=sharing",   // 公開名單（一般可開新視窗的頁面）
  DONATE_URL: "https://payment.ecpay.com.tw/Upload/QRCode/202208/QRCode_9a46711e-e75f-4f44-9c15-ce593a3e5f27.png", // 斗內
  POST_URL: "https://beta.mosir.app/posts/m2Abn-IWZMM7lK4z70tBx", // 全文說明
  FEEDBACK_URL: "https://formspree.io/f/mvzrbwwy", // 反饋表單

  // Google Sheets：檔案 → 發布到網路 → 取得 pubhtml 的嵌入網址（推薦帶參數）
  LIST_EMBED_URL: "https://docs.google.com/spreadsheets/d/1UW5O96Zl5oJ8n3jLkvkU9P6FsuzmRmBXR7EJcT-F0T4/edit?usp=sharing",

  // 阿熊資訊頁
  AXB_INFO_URL: "https://www.laser-base.com/ruwayhsu",
};

/* ========= 小工具 ========= */
const setHref = (id, url) => {
  const el = document.getElementById(id);
  if (el && url) el.href = url;
};

const byId = (id) => document.getElementById(id);

/* ========= 連結綁定 ========= */
(() => {
  // Topbar
  setHref("btnForm", URLS.FORM_URL);
  setHref("btnList", URLS.LIST_URL);

  // Hero CTAs
  setHref("ctaForm", URLS.FORM_URL);
  setHref("ctaList", URLS.LIST_URL);
  setHref("ctaPost", URLS.POST_URL);
  setHref("ctaDonateTop", URLS.DONATE_URL);

  // Quick box
  setHref("miniForm", URLS.FORM_URL);
  setHref("miniList", URLS.LIST_URL);
  setHref("miniDonate", URLS.DONATE_URL);

  // Categories
  setHref("ctaForm2", URLS.FORM_URL);
  setHref("ctaList2", URLS.LIST_URL);
  setHref("ctaDonate", URLS.DONATE_URL);

  // Partners
  setHref("partnerAxbInfo", URLS.AXB_INFO_URL);
  setHref("partnerAxbInfo2", URLS.AXB_INFO_URL);

  // Public list section
  setHref("openListBtn", URLS.LIST_URL);

  // Feedback
  setHref("ctaFeedback", URLS.FEEDBACK_URL);
  setHref("ctaForm3", URLS.FORM_URL);
  setHref("ctaList3", URLS.LIST_URL);
  // Feedback（不要導到 Formspree endpoint）
setHref("ctaFeedback", "#feedback");
setHref("fFeedback", "#feedback");


  // Footer
  setHref("fForm", URLS.FORM_URL);
  setHref("fList", URLS.LIST_URL);
  setHref("fPost", URLS.POST_URL);
  setHref("fDonate", URLS.DONATE_URL);
  setHref("fFeedback", URLS.FEEDBACK_URL);

  // Year
  const y = byId("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();

/* ========= 公開名單嵌入：自動更新（iframe + 定時刷新） ========= */
(() => {
  const frame = byId("listPreviewFrame");
  if (!frame) return;

  const load = () => {
    // 加時間戳避免某些快取狀況（仍可能受 Google 端快取影響，但通常更穩）
    const u = new URL(URLS.LIST_EMBED_URL);
    u.searchParams.set("_ts", Date.now().toString());
    frame.src = u.toString();
  };

  load();

  // 手動刷新
  const refreshBtn = byId("refreshListBtn");
  if (refreshBtn) refreshBtn.addEventListener("click", load);

  // 定時刷新（預設 5 分鐘，可自行調整）
  const REFRESH_MS = 5 * 60 * 1000;
  window.setInterval(load, REFRESH_MS);
})();

/* ========= Tabs (FAQ) ========= */
(() => {
  const tabs = document.querySelectorAll(".tab[data-tab]");
  const panels = document.querySelectorAll(".tabPanel[data-panel]");
  if (!tabs.length || !panels.length) return;

  const activate = (key) => {
    tabs.forEach(t => {
      const active = t.dataset.tab === key;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
      t.tabIndex = active ? 0 : -1;
    });
    panels.forEach(p => p.classList.toggle("is-active", p.dataset.panel === key));
  };

  tabs.forEach(t => {
    t.addEventListener("click", () => activate(t.dataset.tab));
    t.addEventListener("keydown", (e) => {
      const idx = Array.from(tabs).indexOf(t);
      if (e.key === "ArrowRight") tabs[(idx + 1) % tabs.length].focus();
      if (e.key === "ArrowLeft") tabs[(idx - 1 + tabs.length) % tabs.length].focus();
      if (e.key === "Enter" || e.key === " ") activate(t.dataset.tab);
    });
  });

  activate("common");
})();

/* ========= 平滑捲動 ========= */
(() => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
/* ========= Scroll Reveal ========= */
(() => {
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const targets = [
    ...document.querySelectorAll("section"),
    ...document.querySelectorAll(".card, .feat, .partnerCard, .previewCard, .feedbackCard, footer")
  ];

  targets.forEach(el => el.classList.add("reveal"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => io.observe(el));
})();
/* ========= Feedback form (Formspree POST) ========= */
(() => {
  const form = document.getElementById("feedbackForm");
  const status = document.getElementById("feedbackStatus");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (status) status.textContent = "送出中…";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        form.reset();
        if (status) status.textContent = "收到！感謝你的反饋🫶";
      } else {
        if (status) status.textContent = "送出失敗，請稍後再試或改用其他方式。";
      }
    } catch {
      if (status) status.textContent = "網路似乎不穩，請稍後再試。";
    }
  });
})();
