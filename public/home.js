(function () {
  var button = document.getElementById('copiarEmail');
  var email = document.getElementById('emailContato');
  if (!button || !email) return;

  var label = button.textContent;
  var timer;

  function confirmCopy() {
    button.textContent = 'Copiado';
    clearTimeout(timer);
    timer = setTimeout(function () {
      button.textContent = label;
    }, 1600);
  }

  // Sem permissão para a área de transferência, deixa o e-mail selecionado para o Ctrl+C.
  function selectEmail() {
    var range = document.createRange();
    range.selectNodeContents(email);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  button.addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email.textContent).then(confirmCopy, selectEmail);
    } else {
      selectEmail();
    }
  });
})();
