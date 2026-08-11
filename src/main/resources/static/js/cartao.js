const API_URL = "http://localhost:8080";
let cliente = null;

function mostrarMsg(texto, tipo) {
  const msg = document.getElementById("msg");
  msg.textContent = texto;
  msg.className = `msg show msg-${tipo}`;
}

async function iniciar() {
  cliente = JSON.parse(localStorage.getItem("blocz_cliente") || "null");

  if (!cliente) {
    document.querySelector("main").innerHTML = `
      <div class="card">
        <h1>Você precisa entrar</h1>
        <p class="subtext">Faça login pra gerenciar seus cartões.</p>
        <a href="/login" class="btn btn-primary btn-block" style="display:block;text-align:center;">IR PARA LOGIN</a>
      </div>`;
    return;
  }

  await carregarCartoes();
}

async function carregarCartoes() {
  try {
    const res = await fetch(`${API_URL}/cards`);
    if (!res.ok) throw new Error("Falha ao buscar cartões");
    const todos = await res.json();
    const meus = todos.filter(c => c.cliente?.id === cliente.id);
    renderizarLista(meus);
  } catch (err) {
    console.error(err);
    mostrarMsg("Erro ao carregar cartões.", "error");
  }
}

function renderizarLista(cartoes) {
  const container = document.getElementById("lista-cartoes");

  if (!cartoes.length) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    <div class="card">
      <h2 style="font-size:15px;margin-bottom:12px;">Seus cartões</h2>
      ${cartoes.map(c => `
        <div class="card-option" data-id="${c.id}" style="cursor:default;">
          <span>${c.bandeira} •••• ${(c.numeroMascarado || "").slice(-4)} — ${c.nomeTitular}</span>
          <button class="remove-item" data-id="${c.id}">remover</button>
        </div>
      `).join("")}
    </div>
  `;

  container.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", async () => {
      await fetch(`${API_URL}/cards/${btn.dataset.id}`, { method: "DELETE" });
      carregarCartoes();
    });
  });
}

document.getElementById("form-cartao").addEventListener("submit", async (e) => {
  e.preventDefault();

  const numeroDigitado = document.getElementById("cartao-numero").value.replace(/\D/g, "");
  if (numeroDigitado.length < 4) {
    mostrarMsg("Número de cartão inválido.", "error");
    return;
  }
  const ultimosDigitos = numeroDigitado.slice(-4);
  const [ano, mes] = document.getElementById("cartao-validade").value.split("-");

  const novoCartao = {
    cliente: { id: cliente.id },
    bandeira: document.getElementById("cartao-bandeira").value,
    nomeTitular: document.getElementById("cartao-titular").value.trim(),
    numeroMascarado: `**** **** **** ${ultimosDigitos}`,
    validade: `${ano}-${mes}-01`
  };

  try {
    const res = await fetch(`${API_URL}/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoCartao)
    });
    if (!res.ok) throw new Error("Falha ao salvar cartão");

    mostrarMsg("Cartão salvo!", "success");
    document.getElementById("form-cartao").reset();
    carregarCartoes();
  } catch (err) {
    console.error(err);
    mostrarMsg("Erro ao salvar cartão.", "error");
  }
});

document.addEventListener("DOMContentLoaded", iniciar);
