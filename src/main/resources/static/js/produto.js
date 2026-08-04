const API_URL = "http://localhost:8080";
let produtoAtual = null;
let quantidadeSelecionada = 1;

function getIdDaUrl() {
  const partes = window.location.pathname.split("/").filter(Boolean);
  return Number(partes[partes.length - 1]);
}

async function carregarProduto() {
  const id = getIdDaUrl();
  const container = document.getElementById("conteudo-produto");

  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    if (!res.ok) throw new Error("Produto não encontrado");
    produtoAtual = await res.json();
    if (!produtoAtual) throw new Error("Produto não encontrado");

    renderizarProduto();
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p style="color:#6b6675;">Não foi possível carregar este produto.</p>`;
  }
}

function statusEstoque(estoque) {
  if (estoque === 0) return { texto: "Esgotado", classe: "estoque-zero" };
  if (estoque <= 5) return { texto: `Só ${estoque} em estoque`, classe: "estoque-baixo" };
  return { texto: "Em estoque", classe: "estoque-disponivel" };
}

function renderizarProduto() {
  const p = produtoAtual;
  const container = document.getElementById("conteudo-produto");
  const estoqueInfo = statusEstoque(p.estoque ?? 0);
  const semEstoque = (p.estoque ?? 0) === 0;

  container.innerHTML = `
    <div class="produto-detalhe">
      <div class="produto-imagem">
        ${p.imagem_url
          ? `<img src="${p.imagem_url}" alt="${p.nome}" class="produto-imagem-img">`
          : '🧩'}
      </div>

      <div class="produto-info">
        <span class="category">${(p.categoria?.nome ?? "").toUpperCase()}</span>
        <h1>${p.nome}</h1>
        <div class="produto-preco">R$ ${Number(p.preco).toFixed(2).replace(".", ",")}</div>

        <span class="produto-estoque ${estoqueInfo.classe}">${estoqueInfo.texto}</span>

        <p class="produto-desc">${p.descricao ?? "Sem descrição cadastrada ainda."}</p>

        <div class="qty-selector">
          <button id="qty-menos" aria-label="Diminuir quantidade">−</button>
          <span id="qty-valor" aria-live="polite">1</span>
          <button id="qty-mais" aria-label="Aumentar quantidade">+</button>
        </div>

        <div class="produto-acoes">
          <button id="btn-adicionar" class="btn btn-secondary" ${semEstoque ? "disabled" : ""}>
            ADICIONAR AO CARRINHO
          </button>
          <button id="btn-comprar" class="btn btn-primary" ${semEstoque ? "disabled" : ""}>
            COMPRAR AGORA
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("qty-mais").addEventListener("click", () => alterarQuantidade(1));
  document.getElementById("qty-menos").addEventListener("click", () => alterarQuantidade(-1));

  document.getElementById("btn-adicionar")?.addEventListener("click", () => {
    for (let i = 0; i < quantidadeSelecionada; i++) adicionarAoCarrinho(p);
    const btn = document.getElementById("btn-adicionar");
    btn.textContent = "ADICIONADO ✓";
    setTimeout(() => btn.textContent = "ADICIONAR AO CARRINHO", 1200);
  });

  document.getElementById("btn-comprar")?.addEventListener("click", () => {
    for (let i = 0; i < quantidadeSelecionada; i++) adicionarAoCarrinho(p);
    window.location.href = "/checkout";
  });
}

function alterarQuantidade(delta) {
  const max = produtoAtual.estoque ?? 99;
  quantidadeSelecionada = Math.max(1, Math.min(max, quantidadeSelecionada + delta));
  document.getElementById("qty-valor").textContent = quantidadeSelecionada;
}

document.addEventListener("DOMContentLoaded", carregarProduto);