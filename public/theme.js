(function () {
  var STORAGE_KEY = 'webbudget.site.theme';
  var root = document.documentElement;
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function readTheme() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {}
  }

  function shownTheme() {
    return getComputedStyle(root).colorScheme === 'dark' ? 'dark' : 'light';
  }

  // Aplica a escolha salva já na leitura do script (carregue-o no <head>, sem defer),
  // antes da primeira pintura, para não piscar o tema errado.
  var saved = readTheme();
  if (saved) root.dataset.theme = saved;

  function syncToggle(toggle) {
    var dark = shownTheme() === 'dark';
    toggle.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
    toggle.setAttribute('aria-pressed', String(dark));
    var label = toggle.querySelector('[data-theme-label]');
    if (label) label.textContent = dark ? 'Tema claro' : 'Tema escuro';
  }

  function init() {
    var toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      var next = shownTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      storeTheme(next);
      syncToggle(toggle);
    });
    darkQuery.addEventListener('change', function () {
      syncToggle(toggle);
    });

    syncToggle(toggle);
    toggle.hidden = false;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
