function renderizarCarrinho() {
  const container = document.getElementById("conteudo-carrinho");
  const itens = getCarrinho();

  if (!itens.length) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <div class="icon">🧩</div>
        <p>Seu carrinho está vazio.</p>
        <a href="/produtos" class="btn btn-primary" style="display:inline-block;margin-top:16px;">VER PRODUTOS</a>
      </div>`;
    return;
  }

  const listaHtml = itens.map(i => `
    <div class="cart-item" data-id="${i.produtoId}">
      <div class="thumb">${i.imagemUrl ? `<img src="${i.imagemUrl}" alt="" class="thumb-img">` : "🧩"}</div>
      <div class="info">
        <h4>${i.nome}</h4>
        <span class="unit-price">R$ ${i.preco.toFixed(2).replace(".", ",")} / un</span>
      </div>
      <div class="qty-control">
        <button class="qty-menos" data-id="${i.produtoId}" aria-label="Diminuir quantidade de ${i.nome}">−</button>
        <span aria-live="polite">${i.quantidade}</span>
        <button class="qty-mais" data-id="${i.produtoId}" aria-label="Aumentar quantidade de ${i.nome}">+</button>
      </div>
      <div class="line-total">R$ ${(i.preco * i.quantidade).toFixed(2).replace(".", ",")}</div>
      <button class="remove-item" data-id="${i.produtoId}">remover <span class="sr-only">${i.nome}</span></button>
    </div>
  `).join("");

  const total = totalCarrinho();

  container.innerHTML = `
    <div class="card">${listaHtml}</div>
    <div class="card">
      <h2>Resumo</h2>
      <div class="summary">
        <span>Subtotal</span>
        <span>R$ ${total.toFixed(2).replace(".", ",")}</span>
      </div>
      <div class="summary total">
        <span>Total</span>
        <span>R$ ${total.toFixed(2).replace(".", ",")}</span>
      </div>
      <a href="/checkout" class="btn btn-primary btn-block" style="display:block;text-align:center;margin-top:16px;text-decoration:none;">
        FINALIZAR COMPRA
      </a>
    </div>
  `;

  container.querySelectorAll(".qty-mais").forEach(btn =>
    btn.addEventListener("click", () => { atualizarQuantidade(Number(btn.dataset.id), 1); renderizarCarrinho(); })
  );
  container.querySelectorAll(".qty-menos").forEach(btn =>
    btn.addEventListener("click", () => { atualizarQuantidade(Number(btn.dataset.id), -1); renderizarCarrinho(); })
  );
  container.querySelectorAll(".remove-item").forEach(btn =>
    btn.addEventListener("click", () => { removerDoCarrinho(Number(btn.dataset.id)); renderizarCarrinho(); })
  );
}

document.addEventListener("DOMContentLoaded", renderizarCarrinho);