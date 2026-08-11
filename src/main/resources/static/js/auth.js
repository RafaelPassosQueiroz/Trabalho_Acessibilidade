const API_URL = "http://localhost:8080";

function mostrarAba(aba) {
  document.getElementById("form-login").style.display = aba === "login" ? "block" : "none";
  document.getElementById("form-cadastro").style.display = aba === "cadastro" ? "block" : "none";
  document.getElementById("tab-login").classList.toggle("active", aba === "login");
  document.getElementById("tab-cadastro").classList.toggle("active", aba === "cadastro");
  esconderMsg();
}

function mostrarMsg(texto, tipo) {
  const msg = document.getElementById("msg");
  msg.textContent = texto;
  msg.className = `msg show msg-${tipo}`;
}
function esconderMsg() {
  document.getElementById("msg").className = "msg";
}

// LOGIN — aviso: GET /customers hoje devolve o campo "senha" em texto puro no JSON.
// Isso é inseguro (qualquer um vê no DevTools). O certo é o back ter um DTO sem
// "senha" no retorno e um endpoint POST /login que valida no servidor com hash (BCrypt).
// Fica funcional por enquanto, mas precisa virar isso antes de qualquer uso real.
document.getElementById("form-login").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim().toLowerCase();
  const senha = document.getElementById("login-senha").value;

  try {
    const res = await fetch(`${API_URL}/customers`);
    if (!res.ok) throw new Error("Falha ao consultar clientes");
    const clientes = await res.json();
    const cliente = clientes.find(c => c.email?.toLowerCase() === email);

    if (!cliente) {
      mostrarMsg("E-mail não encontrado. Cria uma conta na aba ao lado.", "error");
      return;
    }
    if (cliente.senha !== senha) {
      mostrarMsg("Senha incorreta.", "error");
      return;
    }

    // guarda os dados do cliente sem a senha
    const { senha: _omitida, ...clienteSemSenha } = cliente;
    localStorage.setItem("blocz_cliente", JSON.stringify(clienteSemSenha));

    mostrarMsg("Login feito! Redirecionando...", "success");
    setTimeout(() => window.location.href = "/produtos", 800);
  } catch (err) {
    console.error(err);
    mostrarMsg("Erro ao conectar com o servidor.", "error");
  }
});

// CADASTRO
document.getElementById("form-cadastro").addEventListener("submit", async (e) => {
  e.preventDefault();

  const novoCliente = {
    nome: document.getElementById("cad-nome").value.trim(),
    email: document.getElementById("cad-email").value.trim(),
    senha: document.getElementById("cad-senha").value,
    telefone: document.getElementById("cad-telefone").value.trim() || null,
    cpf: document.getElementById("cad-cpf")?.value.trim() || null,
    nascimento: document.getElementById("cad-nascimento")?.value || null,
    ativo: true
  };

  try {
    const res = await fetch(`${API_URL}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoCliente)
    });
    if (!res.ok) throw new Error("Falha ao cadastrar");
    const cliente = await res.json();

    const { senha: _omitida, ...clienteSemSenha } = cliente;
    localStorage.setItem("blocz_cliente", JSON.stringify(clienteSemSenha));

    mostrarMsg("Conta criada! Redirecionando...", "success");
    setTimeout(() => window.location.href = "/produtos", 800);
  } catch (err) {
    console.error(err);
    mostrarMsg("Erro ao criar conta. Confere se o e-mail já não está em uso.", "error");
  }
});