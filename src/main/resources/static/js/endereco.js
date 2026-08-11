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
        <p class="subtext">Faça login pra gerenciar seus endereços.</p>
        <a href="/login" class="btn btn-primary btn-block" style="display:block;text-align:center;">IR PARA LOGIN</a>
      </div>`;
    return;
  }

  await carregarEnderecos();
}

async function carregarEnderecos() {
  try {
    const res = await fetch(`${API_URL}/addresses`);
    if (!res.ok) throw new Error("Falha ao buscar endereços");
    const todos = await res.json();
    const meus = todos.filter(e => e.cliente?.id === cliente.id);
    renderizarLista(meus);
  } catch (err) {
    console.error(err);
    mostrarMsg("Erro ao carregar endereços.", "error");
  }
}

function renderizarLista(enderecos) {
  const container = document.getElementById("lista-enderecos");

  if (!enderecos.length) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    <div class="card">
      <h2 style="font-size:15px;margin-bottom:12px;">Seus endereços</h2>
      ${enderecos.map(e => `
        <div class="address-option" data-id="${e.id}" style="cursor:default;">
          <span>${e.rua}, ${e.numero} — ${e.cidade}/${e.estado} · CEP ${e.cep}</span>
          <button class="remove-item" data-id="${e.id}">remover</button>
        </div>
      `).join("")}
    </div>
  `;

  container.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", async () => {
      await fetch(`${API_URL}/addresses/${btn.dataset.id}`, { method: "DELETE" });
      carregarEnderecos();
    });
  });
}

document.getElementById("form-endereco").addEventListener("submit", async (e) => {
  e.preventDefault();

  const novoEndereco = {
    cliente: { id: cliente.id },
    cep: document.getElementById("end-cep").value.trim(),
    estado: document.getElementById("end-estado").value.trim().toUpperCase(),
    cidade: document.getElementById("end-cidade").value.trim(),
    rua: document.getElementById("end-rua").value.trim(),
    numero: Number(document.getElementById("end-numero").value),
    logradouro: document.getElementById("end-logradouro").value.trim() || null,
    complemento: document.getElementById("end-complemento").value.trim() || null
  };

  try {
    const res = await fetch(`${API_URL}/addresses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoEndereco)
    });
    if (!res.ok) throw new Error("Falha ao salvar endereço");

    mostrarMsg("Endereço salvo!", "success");
    document.getElementById("form-endereco").reset();
    carregarEnderecos();
  } catch (err) {
    console.error(err);
    mostrarMsg("Erro ao salvar endereço.", "error");
  }
});

document.addEventListener("DOMContentLoaded", iniciar);
