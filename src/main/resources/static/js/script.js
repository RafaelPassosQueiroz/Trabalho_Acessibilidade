/*const API_URL = "http://localhost:8080";

async function carregarProdutos() {
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    const produtos = await res.json();

    renderizarGrid("grid-lancamentos", produtos);
    renderizarGrid("grid-vendidos", produtos); // troca o critério quando o back tiver ordenação/filtro
  } catch (err) {
    console.error("Falha ao carregar produtos:", err);
  }
}

function renderizarGrid(gridId, produtos) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = produtos.map(p => `
    <article class="product-card">
      <a href="/produtos/${p.id}" class="product-thumb-link">
        <div class="product-thumb">
          ${p.estoque === 0 ? '<span class="tag tag-out">ESGOTADO</span>' : ""}
          ${p.imagem_url
            ? `<img src="${p.imagem_url}" alt="" class="product-thumb-img">`
            : '<span class="thumb-icon">🧩</span>'}
        </div>
      </a>
      <span class="category">${(p.categoria?.nome ?? "").toUpperCase()}</span>
      <a href="/produtos/${p.id}" class="product-title-link"><h4>${p.nome}</h4></a>
      <div class="product-footer">
        <span class="price">R$ ${Number(p.preco).toFixed(2).replace(".", ",")}</span>
        <button class="btn btn-buy" data-id="${p.id}" ${p.estoque === 0 ? "disabled" : ""}>
          ${p.estoque === 0 ? "ESGOTADO" : "COMPRAR"}
        </button>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".btn-buy:not([disabled])").forEach(btn => {
    btn.addEventListener("click", () => {
      const produto = produtos.find(p => p.id === Number(btn.dataset.id));
      adicionarAoCarrinho(produto);
      btn.textContent = "ADICIONADO ✓";
      setTimeout(() => btn.textContent = "COMPRAR", 1000);
    });
  });
}

document.addEventListener("DOMContentLoaded", carregarProdutos);

*/

(function () {
  "use strict";

  const API_URL = "http://localhost:8080";

  async function carregarProdutos() {
    const grids = [
      document.getElementById("grid-lancamentos"),
      document.getElementById("grid-vendidos")
    ];

    try {
      const res = await fetch(`${API_URL}/products`);

      if (!res.ok) {
        throw new Error(`Erro ${res.status}`);
      }

      const produtos = await res.json();

      renderizarGrid("grid-lancamentos", produtos);
      renderizarGrid("grid-vendidos", produtos);

    } catch (err) {
      console.error("Falha ao carregar produtos:", err);

      grids.forEach((grid) => {
        if (!grid) return;

        grid.setAttribute("aria-busy", "false");

        grid.innerHTML = `
          <div class="products-error">
            <strong>Ops! Os blocos estão brincando de esconder.</strong>
            <p>
              Não conseguimos carregar os produtos agora.
              Tente novamente em alguns instantes.
            </p>
          </div>
        `;
      });
    }
  }


  function escaparHTML(valor) {
    return String(valor ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }


  function renderizarGrid(gridId, produtos) {
    const grid = document.getElementById(gridId);

    if (!grid) return;

    grid.innerHTML = produtos.map((p) => {

      const nome = escaparHTML(p.nome);
      const categoria = escaparHTML(
        p.categoria?.nome ?? ""
      );

      const preco = Number(p.preco)
        .toFixed(2)
        .replace(".", ",");

      const imagem = p.imagem_url
        ? `
          <img
            src="${escaparHTML(p.imagem_url)}"
            alt="${nome}"
            class="product-thumb-img"
            loading="lazy"
          >
        `
        : `
          <span
            class="thumb-icon"
            aria-hidden="true"
          >
            🧩
          </span>
        `;

      const estoqueZero = Number(p.estoque) === 0;

      return `
        <article class="product-card">

          <a
            href="/produtos/${encodeURIComponent(p.id)}"
            class="product-thumb-link"
            aria-label="Ver detalhes de ${nome}"
          >

            <div class="product-thumb">

              ${
                estoqueZero
                  ? `
                    <span
                      class="tag tag-out"
                    >
                      ESGOTADO
                    </span>
                  `
                  : ""
              }

              ${
                !estoqueZero
                  ? `
                    <span
                      class="tag tag-new"
                    >
                      NOVO
                    </span>
                  `
                  : ""
              }

              ${imagem}

            </div>

          </a>


          <span class="category">
            ${categoria.toUpperCase()}
          </span>


          <a
            href="/produtos/${encodeURIComponent(p.id)}"
            class="product-title-link"
          >
            <h4>${nome}</h4>
          </a>


          <div class="product-footer">

            <span class="price">
              R$ ${preco}
            </span>

            <button
              class="btn btn-buy"
              data-id="${Number(p.id)}"
              ${estoqueZero ? "disabled" : ""}
              type="button"
              aria-label="${
                estoqueZero
                  ? `${nome} está esgotado`
                  : `Comprar ${nome}`
              }"
            >
              ${
                estoqueZero
                  ? "ESGOTADO"
                  : "COMPRAR"
              }
            </button>

          </div>

        </article>
      `;
    }).join("");

    grid.setAttribute("aria-busy", "false");

    configurarBotoesCompra(grid, produtos);
  }


  function configurarBotoesCompra(grid, produtos) {
    const botoes = grid.querySelectorAll(
      ".btn-buy:not([disabled])"
    );

    botoes.forEach((btn) => {

      btn.addEventListener("click", () => {

        const id = Number(btn.dataset.id);

        const produto = produtos.find(
          (p) => Number(p.id) === id
        );

        if (!produto) return;

        if (typeof adicionarAoCarrinho !== "function") {
          console.error(
            "adicionarAoCarrinho não está disponível."
          );

          return;
        }

        adicionarAoCarrinho(produto);

        btn.textContent = "ADICIONADO ✓";

        btn.setAttribute(
          "aria-label",
          `${produto.nome} foi adicionado ao carrinho`
        );

        setTimeout(() => {

          btn.textContent = "COMPRAR";

          btn.setAttribute(
            "aria-label",
            `Comprar ${produto.nome}`
          );

        }, 1200);

      });

    });
  }


  function configurarNewsletter() {

    const form = document.querySelector(
      ".newsletter-form"
    );

    const input = document.getElementById(
      "newsletter-email"
    );

    const message = document.getElementById(
      "newsletter-message"
    );

    if (!form || !input || !message) {
      return;
    }

    form.addEventListener("submit", (event) => {

      event.preventDefault();

      if (!input.checkValidity()) {

        input.reportValidity();

        return;
      }

      message.textContent =
        "Você entrou para o Club BlocZ! ✦";

      input.value = "";

    });
  }


  function configurarAnimacoes() {

    const elementos = document.querySelectorAll(
      ".product-card, .category-card, .banner"
    );

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "is-visible"
          );

          obs.unobserve(entry.target);

        });

      },
      {
        threshold: 0.08
      }
    );

    elementos.forEach((elemento) => {

      elemento.classList.add(
        "reveal-item"
      );

      observer.observe(elemento);

    });
  }


  document.addEventListener(
    "DOMContentLoaded",
    () => {

      carregarProdutos();

      configurarNewsletter();

      configurarAnimacoes();

    }
  );

})();