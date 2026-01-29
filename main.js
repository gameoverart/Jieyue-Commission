// ====== 改這裡：放你自己的連結 ======
const FORM_URL   = "https://forms.gle/XD1be3fsZhPkxKD98";      // 投標表單
const LIST_URL   = "https://docs.google.com/spreadsheets/d/1UW5O96Zl5oJ8n3jLkvkU9P6FsuzmRmBXR7EJcT-F0T4/edit?usp=sharing";      // 公開招標名單
const DONATE_URL = "https://payment.ecpay.com.tw/Upload/QRCode/202208/QRCode_9a46711e-e75f-4f44-9c15-ce593a3e5f27.png";    // 斗內
const POST_URL   = "https://beta.mosir.app/posts/m2Abn-IWZMM7lK4z70tBx"; // 全文說明（你原本那篇）

const setHref = (id, url) => {
  const el = document.getElementById(id);
  if (el) el.href = url;
};

// Top buttons
setHref("btnForm", FORM_URL);
setHref("btnList", LIST_URL);

// Hero CTAs
setHref("ctaForm", FORM_URL);
setHref("ctaList", LIST_URL);
setHref("ctaPost", POST_URL);

// Side quick links
setHref("miniForm", FORM_URL);
setHref("miniList", LIST_URL);
setHref("miniDonate", DONATE_URL);

// Mid-page CTAs
setHref("ctaForm2", FORM_URL);
setHref("ctaList2", LIST_URL);
setHref("ctaDonate", DONATE_URL);

// Footer links
setHref("fForm", FORM_URL);
setHref("fList", LIST_URL);
setHref("fPost", POST_URL);
setHref("fDonate", DONATE_URL);

// Smooth scroll for internal nav
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
// ===== Tabs (FAQ) =====
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
    // keyboard support: left/right
    t.addEventListener("keydown", (e) => {
      const idx = Array.from(tabs).indexOf(t);
      if (e.key === "ArrowRight") tabs[(idx + 1) % tabs.length].focus();
      if (e.key === "ArrowLeft") tabs[(idx - 1 + tabs.length) % tabs.length].focus();
      if (e.key === "Enter" || e.key === " ") activate(t.dataset.tab);
    });
  });

  // default
  activate("common");
})();
