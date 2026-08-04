const CART_KEY = "blocz_carrinho";

function getCarrinho() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function salvarCarrinho(itens) {
  localStorage.setItem(CART_KEY, JSON.stringify(itens));
  atualizarBadgeCarrinho();
}

function adicionarAoCarrinho(produto) {
  const itens = getCarrinho();
  const existente = itens.find(i => i.produtoId === produto.id);

  if (existente) {
    existente.quantidade += 1;
  } else {
    itens.push({
      produtoId: produto.id,
      nome: produto.nome,
      preco: Number(produto.preco),
      imagemUrl: produto.imagem_url || null,
      quantidade: 1
    });
  }
  salvarCarrinho(itens);
}

function atualizarQuantidade(produtoId, delta) {
  const itens = getCarrinho();
  const item = itens.find(i => i.produtoId === produtoId);
  if (!item) return;

  item.quantidade += delta;
  if (item.quantidade <= 0) {
    return removerDoCarrinho(produtoId);
  }
  salvarCarrinho(itens);
}

function removerDoCarrinho(produtoId) {
  const itens = getCarrinho().filter(i => i.produtoId !== produtoId);
  salvarCarrinho(itens);
}

function limparCarrinho() {
  localStorage.removeItem(CART_KEY);
  atualizarBadgeCarrinho();
}

function totalCarrinho() {
  return getCarrinho().reduce((soma, i) => soma + i.preco * i.quantidade, 0);
}

function contagemCarrinho() {
  return getCarrinho().reduce((soma, i) => soma + i.quantidade, 0);
}

// atualiza o badge do header (se existir na página)
function atualizarBadgeCarrinho() {
  const el = document.getElementById("cart-count");
  const elSr = document.getElementById("cart-count-sr");
  if (!el) return;
  const qtd = contagemCarrinho();
  el.textContent = qtd > 0 ? qtd : "";
  el.style.display = qtd > 0 ? "inline-flex" : "none";
  if (elSr) {
    elSr.textContent = qtd > 0 ? `, ${qtd} ${qtd === 1 ? "item" : "itens"} no carrinho` : "";
  }
}

document.addEventListener("DOMContentLoaded", atualizarBadgeCarrinho);