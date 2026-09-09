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
    substituirLogo(tema); // <-- agora a logo é atualizada toda vez que o tema muda
  }

  function atualizarBotao(tema) {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.textContent = tema === "dark" ? "☀️" : "🌙";
    btn.setAttribute("aria-label", tema === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro");
    btn.setAttribute("aria-pressed", tema === "dark" ? "true" : "false");
  }

  document.documentElement.setAttribute("data-theme", obterTemaInicial());

  function injetarEstilos() {
    const style = document.createElement("style");
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


      html[data-theme="dark"] body::before{
        filter: brightness(.35) saturate(.8);
      }
      html[data-theme="dark"] body::after{
        background:
          radial-gradient(circle at 15% 20%, rgba(124,58,237,.28), transparent 30%),
          radial-gradient(circle at 85% 75%, rgba(56,189,248,.22), transparent 32%);
      }

      html[data-theme="dark"] .site-header{
        background: var(--dark-surface);
        border-bottom-color: var(--dark-border);
      }
      html[data-theme="dark"] .site-nav a{ color: var(--dark-text-soft); }
      html[data-theme="dark"] .site-nav a:hover{ color: #fff; }
      html[data-theme="dark"] .site-nav a.active{ color: var(--dark-purple); }
      html[data-theme="dark"] .site-nav a.active::after{ background: var(--dark-purple); }
      html[data-theme="dark"] .auth-status{ color: var(--dark-text-soft); }
      html[data-theme="dark"] .auth-status a{ color: var(--dark-purple); }

      html[data-theme="dark"] .card,
      html[data-theme="dark"] .cart-item,
      html[data-theme="dark"] .produto-imagem,
      html[data-theme="dark"] .avatar-stage,
      html[data-theme="dark"] .produto-detalhe{
        background: var(--dark-surface);
        border-color: var(--dark-border);
        color: var(--dark-text);
        box-shadow: none;
      }
      html[data-theme="dark"] .qty-selector{ background: var(--dark-surface-2); }
      html[data-theme="dark"] .qty-selector button{
        background: var(--dark-surface);
        color: var(--dark-purple);
      }
      html[data-theme="dark"] .produto-info .produto-desc{
        color: var(--dark-text-soft);
        border-bottom-color: var(--dark-border);
      }
      html[data-theme="dark"] .produto-info .produto-preco{ color: var(--dark-text); }
      html[data-theme="dark"] .produto-info .category{
        background: linear-gradient(135deg, rgba(167,139,250,.22), rgba(56,189,248,.16));
        color: var(--dark-purple);
      }
      html[data-theme="dark"] .breadcrumb{
        color: var(--dark-text-soft);
        background: rgba(42,36,56,.85);
        box-shadow: 0 6px 18px -8px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.06);
      }
      html[data-theme="dark"] .breadcrumb:hover{ color: var(--dark-purple); background: var(--dark-surface); }


      html[data-theme="dark"] .produtos-page .hero{
        background: rgba(32,27,43,.82);
        border-color: rgba(255,255,255,.08);
        box-shadow: 0 18px 48px rgba(0,0,0,.4);
      }
      html[data-theme="dark"] .produtos-page .hero h1{
        background-image: linear-gradient(120deg, var(--dark-purple), #7dd3fc);
      }
      html[data-theme="dark"] .produtos-page .hero .subtext{ color: var(--dark-text-soft); }

      html[data-theme="dark"] .product-card{
        background: rgba(32,27,43,.85);
        border-color: rgba(255,255,255,.08);
        box-shadow: 0 12px 35px rgba(0,0,0,.45);
      }
      html[data-theme="dark"] .product-card:hover{
        box-shadow: 0 20px 45px rgba(0,0,0,.55);
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
      html[data-theme="dark"] .subtext, html[data-theme="dark"] .card .subtext, html[data-theme="dark"] .price,
      html[data-theme="dark"] .lego-hint{
        color: var(--dark-text-soft);
      }
      html[data-theme="dark"] .product-title-link:hover h4{ color: var(--dark-purple); }

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

      html[data-theme="dark"] .fun-hero h1{ color: #fff; }
      html[data-theme="dark"] .fun-hero p{ color: var(--dark-text-soft); }

      html[data-theme="dark"] .lego-page{
        background: radial-gradient(circle at 50% 0%, #241d3d 0%, #15121c 60%);
      }
      html[data-theme="dark"] .lego-topbar h1{ color: #fff; }
      html[data-theme="dark"] .btn-lego-nav{ background: var(--dark-surface-2); color: var(--dark-text); }
      html[data-theme="dark"] .btn-nav{ background: var(--dark-surface-2); color: var(--dark-purple); }

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
        background: linear-gradient(135deg, #7c3aed, #6d28d9);
        color: #fff;
        font-size: 22px;
        line-height: 1;
        cursor: pointer;
        box-shadow: 0 8px 20px -6px rgba(109,40,217,.55);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform .15s ease;
      }
      #theme-toggle:hover { transform: scale(1.08); }
      #theme-toggle:active { transform: scale(.94); }
      #theme-toggle:focus-visible { outline: 3px solid #171321; outline-offset: 2px; }
      html[data-theme="dark"] #theme-toggle:focus-visible { outline-color: #fff; }

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
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", () => {
      const atual = document.documentElement.getAttribute("data-theme");
      const novo = atual === "dark" ? "light" : "dark";
      aplicarTema(novo, true);
      btn.setAttribute("aria-pressed", novo === "dark" ? "true" : "false");
    });
    document.body.appendChild(btn);
    atualizarBotao(document.documentElement.getAttribute("data-theme"));
  }

  document.addEventListener("DOMContentLoaded", () => {
    injetarEstilos();
    injetarBotao();
    substituirLogo(document.documentElement.getAttribute("data-theme")); // usa o tema atual, não um valor fixo
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem(CHAVE_MANUAL)) {
      aplicarTema(e.matches ? "dark" : "light", false);
    }
  });
})();


function substituirLogo(tema) {
  const logos = document.querySelectorAll(".site-logo-img");
  const src = tema === "dark" ? "/img/download.png" : "/img/Logo.svg";

  logos.forEach((logo) => {
    logo.src = src;
    // Remove qualquer srcset que possa sobrescrever a troca acima
    logo.removeAttribute("srcset");
  });
}