"use strict";
// La validación y el guardado también se realizan en Python; el formulario funciona sin JS.
document.querySelectorAll('[data-submit-form]').forEach(form => {
  form.addEventListener('submit', () => {
    const button = form.querySelector('button[type="submit"]');
    if (button && form.checkValidity()) {
      button.dataset.original = button.textContent;
      button.disabled = true;
      button.textContent = button.dataset.pending || 'Enviando…';
    }
  });
});
window.addEventListener('pageshow', () => {
  document.querySelectorAll('[data-original]').forEach(button => {
    button.disabled = false;
    button.textContent = button.dataset.original;
  });
});
document.querySelector('[data-error-summary]')?.focus();
