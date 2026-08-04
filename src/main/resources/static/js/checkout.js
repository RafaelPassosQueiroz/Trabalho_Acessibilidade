const API_URL = "http://localhost:8080";
let cliente = null;
let enderecoSelecionado = null;
let cartaoSelecionado = null;

function mostrarMsg(texto, tipo) {
  const msg = document.getElementById("msg");
  msg.textContent = texto;
  msg.className = `msg show msg-${tipo}`;
}

async function iniciarCheckout() {
  cliente = JSON.parse(localStorage.getItem("blocz_cliente") || "null");
  const container = document.getElementById("conteudo-checkout");

  if (!cliente) {
    container.innerHTML = `
      <h1>Você precisa entrar</h1>
      <p class="subtext">Faça login ou crie uma conta pra finalizar a compra.</p>
      <a href="/login" class="btn btn-primary btn-block" style="display:block;text-align:center;">IR PARA LOGIN</a>
    `;
    return;
  }

  if (!getCarrinho().length) {
    container.innerHTML = `
      <h1>Carrinho vazio</h1>
      <p class="subtext">Adiciona alguns produtos antes de finalizar.</p>
      <a href="/produtos" class="btn btn-primary btn-block" style="display:block;text-align:center;">VER PRODUTOS</a>
    `;
    return;
  }

  try {
    const [resEnd, resCartoes] = await Promise.all([
      fetch(`${API_URL}/addresses`),
      fetch(`${API_URL}/cards`)
    ]);
    const enderecos = (await resEnd.json()).filter(e => e.cliente?.id === cliente.id);
    const cartoes = (await resCartoes.json()).filter(c => c.cliente?.id === cliente.id);

    renderizarCheckout(enderecos, cartoes);
  } catch (err) {
    console.error(err);
    mostrarMsg("Erro ao carregar dados de endereço/cartão.", "error");
  }
}

function renderizarCheckout(enderecos, cartoes) {
  const container = document.getElementById("conteudo-checkout");
  const total = totalCarrinho();

  const enderecosHtml = enderecos.length
    ? enderecos.map(e => `
        <button type="button" class="address-option" data-id="${e.id}" aria-pressed="false">
          <span>${e.rua}, ${e.numero} — ${e.cidade}/${e.estado}</span>
        </button>`).join("")
    : `<p class="subtext">Nenhum endereço cadastrado ainda. <a href="/enderecos">Cadastrar endereço →</a></p>`;

  const cartoesHtml = cartoes.length
    ? cartoes.map(c => `
        <button type="button" class="card-option" data-id="${c.id}" aria-pressed="false">
          <span>${c.bandeira} •••• ${c.numeroMascarado?.slice(-4) ?? ""}</span>
        </button>`).join("")
    : `<p class="subtext">Nenhum cartão cadastrado ainda. <a href="/cartoes">Cadastrar cartão →</a></p>`;

  container.innerHTML = `
    <h1>Finalizar pedido</h1>
    <p class="subtext">Confirme endereço, pagamento e revise o total.</p>

    <h2 style="font-size:15px;margin-bottom:10px;">Endereço de entrega</h2>
    ${enderecosHtml}

    <h2 style="font-size:15px;margin:20px 0 10px;">Forma de pagamento</h2>
    ${cartoesHtml}

    <div class="summary total">
      <span>Total</span>
      <span>R$ ${total.toFixed(2).replace(".", ",")}</span>
    </div>

    <button id="btn-confirmar" class="btn btn-primary btn-block" style="margin-top:16px;" disabled>
      CONFIRMAR PEDIDO
    </button>
  `;

  container.querySelectorAll(".address-option").forEach(el => {
    el.addEventListener("click", () => {
      container.querySelectorAll(".address-option").forEach(x => {
        x.classList.remove("selected");
        x.setAttribute("aria-pressed", "false");
      });
      el.classList.add("selected");
      el.setAttribute("aria-pressed", "true");
      enderecoSelecionado = Number(el.dataset.id);
      atualizarBotaoConfirmar();
    });
  });

  container.querySelectorAll(".card-option").forEach(el => {
    el.addEventListener("click", () => {
      container.querySelectorAll(".card-option").forEach(x => {
        x.classList.remove("selected");
        x.setAttribute("aria-pressed", "false");
      });
      el.classList.add("selected");
      el.setAttribute("aria-pressed", "true");
      cartaoSelecionado = Number(el.dataset.id);
      atualizarBotaoConfirmar();
    });
  });

  document.getElementById("btn-confirmar").addEventListener("click", confirmarPedido);
}

function atualizarBotaoConfirmar() {
  document.getElementById("btn-confirmar").disabled = !(enderecoSelecionado && cartaoSelecionado);
}

async function confirmarPedido() {
  const btn = document.getElementById("btn-confirmar");
  btn.disabled = true;
  btn.textContent = "PROCESSANDO...";

  try {
    // 1. cria o pedido
    const pedidoRes = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cliente: { id: cliente.id },
        enderecoEntrega: { id: enderecoSelecionado },
        dataPedido: new Date().toISOString().split("T")[0],
        status: "PENDENTE",
        valorTotal: totalCarrinho()
      })
    });
    if (!pedidoRes.ok) throw new Error("Falha ao criar pedido");
    const pedido = await pedidoRes.json();

    // 2. cria um product-order pra cada item do carrinho
    const itens = getCarrinho();
    await Promise.all(itens.map(i =>
      fetch(`${API_URL}/product-orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pedido: { id: pedido.id },
          produto: { id: i.produtoId },
          quantidade: i.quantidade,
          precoUnitario: i.preco
        })
      })
    ));

    limparCarrinho();
    mostrarMsg("Pedido confirmado com sucesso! 🎉", "success");
    document.getElementById("conteudo-checkout").innerHTML = `
      <h1>Pedido #${pedido.id} confirmado!</h1>
      <p class="subtext">Você vai receber atualizações do status por aqui.</p>
      <a href="/produtos" class="btn btn-primary btn-block" style="display:block;text-align:center;">CONTINUAR COMPRANDO</a>
    `;
  } catch (err) {
    console.error(err);
    mostrarMsg("Erro ao confirmar o pedido. Tenta de novo.", "error");
    btn.disabled = false;
    btn.textContent = "CONFIRMAR PEDIDO";
  }
}

document.addEventListener("DOMContentLoaded", iniciarCheckout);