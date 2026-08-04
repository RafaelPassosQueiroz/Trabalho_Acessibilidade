(function () {
  const CHAVE_TEMA = "blocz_tema";
  const CHAVE_MANUAL = "blocz_tema_manual";

  function obterTemaInicial() {
    const salvo = localStorage.getItem(CHAVE_TEMA);
    if (salvo) return salvo;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function aplicarTema(tema, manual) {
    document.documentElement.setAttribute("data-theme", tema);
    localStorage.setItem(CHAVE_TEMA, tema);
    if (manual) localStorage.setItem(CHAVE_MANUAL, "1");
    atualizarBotao(tema);
  }

  function atualizarBotao(tema) {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.textContent = tema === "dark" ? "☀️" : "🌙";
    btn.setAttribute("aria-label", tema === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro");
  }

  // aplica o tema o quanto antes (antes do body existir), pra evitar o "flash" de tema errado
  document.documentElement.setAttribute("data-theme", obterTemaInicial());

  function injetarEstilos() {
    style.textContent = `
      html[data-theme="dark"] {
        --dark-bg: #15121c;
        --dark-surface: #201b2b;
        --dark-surface-2: #2a2438;
        --dark-border: #3a3347;
        --dark-text: #f1edf7;
        --dark-text-soft: #b8b0c7;
        --dark-purple: #a78bfa;
      }

      html[data-theme="dark"] body{
        background: var(--dark-bg);
        color: var(--dark-text);
      }

      /* header */
      html[data-theme="dark"] .site-header{
        background: var(--dark-surface);
        border-bottom-color: var(--dark-border);
      }
      html[data-theme="dark"] .site-logo-img{ filter: brightness(0) invert(1); }
      html[data-theme="dark"] .site-nav a{ color: var(--dark-text-soft); }
      html[data-theme="dark"] .site-nav a:hover{ color: #fff; }
      html[data-theme="dark"] .site-nav a.active{ color: var(--dark-purple); }
      html[data-theme="dark"] .site-nav a.active::after{ background: var(--dark-purple); }
      html[data-theme="dark"] .auth-status{ color: var(--dark-text-soft); }
      html[data-theme="dark"] .auth-status a{ color: var(--dark-purple); }

      /* cartões, formulários, superfícies brancas em geral */
      html[data-theme="dark"] .card,
      html[data-theme="dark"] .product-card,
      html[data-theme="dark"] .cart-item,
      html[data-theme="dark"] .produto-imagem,
      html[data-theme="dark"] .avatar-stage,
      html[data-theme="dark"] #conteudo-produto .card{
        background: var(--dark-surface);
        border-color: var(--dark-border);
        color: var(--dark-text);
      }
      html[data-theme="dark"] .product-thumb,
      html[data-theme="dark"] .banner-gray,
      html[data-theme="dark"] .cart-item .thumb{
        background: var(--dark-surface-2);
      }
      html[data-theme="dark"] h1, html[data-theme="dark"] h2,
      html[data-theme="dark"] h3, html[data-theme="dark"] h4{
        color: var(--dark-text);
      }
      html[data-theme="dark"] .subtext, html[data-theme="dark"] .price,
      html[data-theme="dark"] .lego-hint{
        color: var(--dark-text-soft);
      }
      html[data-theme="dark"] .product-title-link:hover h4{ color: var(--dark-purple); }

      /* formulários */
      html[data-theme="dark"] .field input,
      html[data-theme="dark"] .field select,
      html[data-theme="dark"] .filters input,
      html[data-theme="dark"] .filters select{
        background: var(--dark-surface-2);
        border-color: var(--dark-border);
        color: var(--dark-text);
      }
      html[data-theme="dark"] .field label{ color: var(--dark-text-soft); }
      html[data-theme="dark"] .address-option, html[data-theme="dark"] .card-option{
        background: var(--dark-surface-2);
        border-color: var(--dark-border);
        color: var(--dark-text);
      }
      html[data-theme="dark"] .address-option.selected, html[data-theme="dark"] .card-option.selected{
        border-color: var(--dark-purple);
        background: #2a2244;
      }
      html[data-theme="dark"] .btn-secondary{
        background: var(--dark-surface-2);
        color: var(--dark-text);
        border-color: var(--dark-border);
      }
      html[data-theme="dark"] .tabs{ background: var(--dark-surface-2); }
      html[data-theme="dark"] .tabs button{ color: var(--dark-text-soft); }
      html[data-theme="dark"] .tabs button.active{ background: var(--dark-surface); color: var(--dark-purple); }

      /* diversão / hub */
      html[data-theme="dark"] .fun-hero h1{ color: #fff; }
      html[data-theme="dark"] .fun-hero p{ color: var(--dark-text-soft); }

      /* criador de avatar */
      html[data-theme="dark"] .lego-page{
        background: radial-gradient(circle at 50% 0%, #241d3d 0%, #15121c 60%);
      }
      html[data-theme="dark"] .lego-topbar h1{ color: #fff; }
      html[data-theme="dark"] .btn-lego-nav{ background: var(--dark-surface-2); color: var(--dark-text); }
      html[data-theme="dark"] .btn-nav{ background: var(--dark-surface-2); color: var(--dark-purple); }

      /* footer */
      html[data-theme="dark"] .footer-links a{ color: var(--dark-text); }
      html[data-theme="dark"] .copyright, html[data-theme="dark"] .social-icons{ color: var(--dark-text-soft); }

      #theme-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        border: none;
        background: #171321;
        color: #fff;
        font-size: 22px;
        line-height: 1;
        cursor: pointer;
        box-shadow: 0 8px 20px -6px rgba(0,0,0,.4);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform .15s ease;
      }
      #theme-toggle:hover { transform: scale(1.08); }
      #theme-toggle:active { transform: scale(.94); }
      #theme-toggle:focus-visible { outline: 3px solid #7c3aed; outline-offset: 2px; }

      @media (prefers-reduced-motion: reduce) {
        #theme-toggle { transition: none; }
      }
    `;
    document.head.appendChild(style);
  }

  function injetarBotao() {
    if (document.getElementById("theme-toggle")) return;
    const btn = document.createElement("button");
    btn.id = "theme-toggle";
    btn.type = "button";
    btn.addEventListener("click", () => {
      const atual = document.documentElement.getAttribute("data-theme");
      aplicarTema(atual === "dark" ? "light" : "dark", true);
    });
    document.body.appendChild(btn);
    atualizarBotao(document.documentElement.getAttribute("data-theme"));
  }

  document.addEventListener("DOMContentLoaded", () => {
    injetarEstilos();
    injetarBotao();
  });

  // se a pessoa nunca escolheu manualmente, acompanha o sistema em tempo real
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem(CHAVE_MANUAL)) {
      aplicarTema(e.matches ? "dark" : "light", false);
    }
  });
})();
