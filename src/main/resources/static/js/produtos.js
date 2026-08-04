const API_URL = "http://localhost:8080";
let todosProdutos = [];

async function carregarProdutos() {
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    todosProdutos = await res.json();

    popularCategorias(todosProdutos);
    renderizarProdutos(todosProdutos);
  } catch (err) {
    console.error("Falha ao carregar produtos:", err);
    document.getElementById("grid-produtos").innerHTML =
      `<p style="grid-column:1/-1;color:#6b6675;">Não foi possível carregar os produtos agora.</p>`;
  }
}

function popularCategorias(produtos) {
  const select = document.getElementById("filtro-categoria");
  const categorias = [...new Set(produtos.map(p => p.categoria?.nome).filter(Boolean))];
  categorias.forEach(nome => {
    const opt = document.createElement("option");
    opt.value = nome;
    opt.textContent = nome;
    select.appendChild(opt);
  });
}

function renderizarProdutos(produtos) {
  const grid = document.getElementById("grid-produtos");

  if (!produtos.length) {
    grid.innerHTML = `<p style="grid-column:1/-1;color:#6b6675;">Nenhum produto encontrado.</p>`;
    return;
  }

  grid.innerHTML = produtos.map(p => `
    <article class="product-card">
      <a href="/produtos/${p.id}" class="product-thumb-link">
        <div class="product-thumb">
          ${p.estoque === 0 ? '<span class="out-of-stock">ESGOTADO</span>' : ""}
          ${p.imagem_url
            ? `<img src="${p.imagem_url}" alt="" class="product-thumb-img">`
            : '<span>🧩</span>'}
        </div>
      </a>
      <span class="category">${(p.categoria?.nome ?? "").toUpperCase()}</span>
      <a href="/produtos/${p.id}" class="product-title-link"><h4>${p.nome}</h4></a>
      <div class="product-footer">
        <span class="price">R$ ${Number(p.preco).toFixed(2).replace(".", ",")}</span>
        <button class="btn-buy" ${p.estoque === 0 ? "disabled" : ""} data-id="${p.id}">
          ${p.estoque === 0 ? "ESGOTADO" : "ADICIONAR"}
        </button>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".btn-buy:not([disabled])").forEach(btn => {
    btn.addEventListener("click", () => {
      const produto = produtos.find(p => p.id === Number(btn.dataset.id));
      adicionarAoCarrinho(produto);
      btn.textContent = "ADICIONADO ✓";
      setTimeout(() => btn.textContent = "ADICIONAR AO CARRINHO", 1000);
    });
  });
}

function aplicarFiltros() {
  const termo = document.getElementById("busca").value.trim().toLowerCase();
  const categoria = document.getElementById("filtro-categoria").value;

  const filtrados = todosProdutos.filter(p => {
    const bateNome = p.nome.toLowerCase().includes(termo);
    const bateCategoria = !categoria || p.categoria?.nome === categoria;
    return bateNome && bateCategoria;
  });

  renderizarProdutos(filtrados);
}

document.getElementById("busca").addEventListener("input", aplicarFiltros);
document.getElementById("filtro-categoria").addEventListener("change", aplicarFiltros);

document.addEventListener("DOMContentLoaded", carregarProdutos);