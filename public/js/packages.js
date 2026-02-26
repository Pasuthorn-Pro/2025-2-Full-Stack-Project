document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-confirm-delete]");
  if (!btn) return;

  const name = btn.getAttribute("data-name") || "รายการนี้";
  const ok = confirm(`ยืนยันลบ ${name} ?`);
  if (!ok) e.preventDefault();
});
