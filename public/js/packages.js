document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-confirm-delete]");
  if (!btn) return;

  const name = btn.getAttribute("data-name") || "รายการนี้";
  const ok = confirm(`ยืนยันลบ ${name} ?`);
  if (!ok) e.preventDefault();
});

// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const btn = document.querySelector(".nav-toggle");

  if (!header || !btn) return;

  btn.addEventListener("click", () => {
    header.classList.toggle("is-open");
  });
});