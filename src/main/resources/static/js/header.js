(function () {
  function normalizarCaminho(caminho) {
    return caminho.replace(/\/+$/, "") || "/";
  }

  function marcarLinkAtivo() {
    const links = document.querySelectorAll(".site-nav a");
    const caminhoAtual = normalizarCaminho(window.location.pathname);

    links.forEach(a => {
      const caminhoLink = normalizarCaminho(new URL(a.href, window.location.origin).pathname);
      if (caminhoLink === caminhoAtual) {
        a.classList.add("active");
      }
    });
  }

  function atualizarAuthStatus() {
    const el = document.getElementById("auth-status");
    if (!el) return;

    const cliente = JSON.parse(localStorage.getItem("blocz_cliente") || "null");

    if (cliente) {
      const primeiroNome = (cliente.nome || "").split(" ")[0];
      el.innerHTML = `Olá, ${primeiroNome} · <a href="#" id="logout-link">Sair</a>`;
      document.getElementById("logout-link").addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("blocz_cliente");
        window.location.href = "/";
      });
    } else {
      el.innerHTML = `<a href="/login">Entrar</a>`;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    marcarLinkAtivo();
    atualizarAuthStatus();
  });
})();