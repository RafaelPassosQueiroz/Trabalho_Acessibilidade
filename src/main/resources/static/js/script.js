const API_URL = "http://localhost:8080";

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