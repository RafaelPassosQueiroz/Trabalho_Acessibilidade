let cabecaAtual = 1;
let torsoAtual = 1;
let pernasAtual = 1;
let acessorioAtual = 1;

const totalCabecas = 24;
const totalTorsos = 24;
const totalPernas = 24;
const totalAcessorios = 1;

const cabecas = {
    1: { altura: 171 },
    2: { altura: 171 },
    3: { altura: 171 },
    4: { altura: 169 },
    5: { altura: 171 },
    6: { altura: 171 },
    7: { altura: 169.75 },
    8: { altura: 171 },
    9: { altura: 171 },
    10: { altura: 171 },
    11: { altura: 169.67 },
    12: { altura: 261 },
    13: { altura: 258 },
    14: { altura: 170 },
    15: { altura: 171 },
    16: { altura: 171 },
    17: { altura: 171 },
    18: { altura: 313 },
    19: { altura: 171 },
    20: { altura: 261 },
    21: { altura: 225 },
    22: { altura: 261 },
    23: { altura: 170 },
    24: { altura: 260 }
};

const acessorios = {
    1: { x: 95, y: 80, altura: 130 }
};

const cabeca = document.getElementById("cabeca");
const torso = document.getElementById("torso");
const pernas = document.getElementById("pernas");
const acessorio = document.getElementById("acessorio");

let animandoCabeca = false;
let animandoTorso = false;
let animandoPernas = false;
let animandoAcessorio = false;

function aplicarPropriedades(elemento, propriedades = {}) {
    if (propriedades.altura !== undefined) elemento.style.height = propriedades.altura + "px";
    if (propriedades.x !== undefined) elemento.style.left = `calc(50% + ${propriedades.x}px)`;
    if (propriedades.y !== undefined) elemento.style.top = propriedades.y + "px";
}

const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function trocarCarrossel(elemento, novaImagem, direcao, propriedades = {}) {

    if (prefereMenosMovimento) {
        elemento.src = novaImagem;
        aplicarPropriedades(elemento, propriedades);
        return;
    }

    const saidaX = direcao > 0 ? -70 : 70;

    elemento.style.transition = "0.28s cubic-bezier(.55,0,1,.45)";
    elemento.style.transform = `translateX(calc(-50% + ${saidaX}px)) scale(0.55) rotate(${direcao * 10}deg)`;
    elemento.style.opacity = "0";

    setTimeout(() => {

        elemento.src = novaImagem;
        aplicarPropriedades(elemento, propriedades);

        const entradaX = direcao > 0 ? 70 : -70;
        elemento.style.transition = "none";
        elemento.style.transform = `translateX(calc(-50% + ${entradaX}px)) scale(0.55) rotate(${-direcao * 10}deg)`;
        elemento.style.opacity = "0";

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                elemento.style.transition = "0.55s cubic-bezier(.34,1.56,.64,1)";
                elemento.style.transform = "translateX(-50%) scale(1) rotate(0deg)";
                elemento.style.opacity = "1";
            });
        });

    }, 280);

}

function mudarCabeca(direcao) {
    if (animandoCabeca) return;
    animandoCabeca = true;

    cabecaAtual += direcao;
    if (cabecaAtual > totalCabecas) cabecaAtual = 1;
    if (cabecaAtual < 1) cabecaAtual = totalCabecas;

    trocarCarrossel(cabeca, `/lego/cabeca/${cabecaAtual}.svg`, direcao, cabecas[cabecaAtual]);

    setTimeout(() => { animandoCabeca = false; }, 550);
}

function mudarTorso(direcao) {
    if (animandoTorso) return;
    animandoTorso = true;

    torsoAtual += direcao;
    if (torsoAtual > totalTorsos) torsoAtual = 1;
    if (torsoAtual < 1) torsoAtual = totalTorsos;

    trocarCarrossel(torso, `/lego/torso/${torsoAtual}.svg`, direcao);

    setTimeout(() => { animandoTorso = false; }, 550);
}

function mudarPernas(direcao) {
    if (animandoPernas) return;
    animandoPernas = true;

    pernasAtual += direcao;
    if (pernasAtual > totalPernas) pernasAtual = 1;
    if (pernasAtual < 1) pernasAtual = totalPernas;

    trocarCarrossel(pernas, `/lego/pernas/${pernasAtual}.svg`, direcao);

    setTimeout(() => { animandoPernas = false; }, 550);
}

function mudarAcessorio(direcao) {
    if (animandoAcessorio) return;
    animandoAcessorio = true;

    acessorioAtual += direcao;
    if (acessorioAtual > totalAcessorios) acessorioAtual = 1;
    if (acessorioAtual < 1) acessorioAtual = totalAcessorios;

    trocarCarrossel(acessorio, `/lego/acessorio/${acessorioAtual}.svg`, direcao, acessorios[acessorioAtual]);

    setTimeout(() => { animandoAcessorio = false; }, 550);
}

document.getElementById("prev-cabeca").addEventListener("click", () => mudarCabeca(-1));
document.getElementById("next-cabeca").addEventListener("click", () => mudarCabeca(1));

document.getElementById("prev-torso").addEventListener("click", () => mudarTorso(-1));
document.getElementById("next-torso").addEventListener("click", () => mudarTorso(1));

document.getElementById("prev-pernas").addEventListener("click", () => mudarPernas(-1));
document.getElementById("next-pernas").addEventListener("click", () => mudarPernas(1));

document.getElementById("prev-acessorio").addEventListener("click", () => mudarAcessorio(-1));
document.getElementById("next-acessorio").addEventListener("click", () => mudarAcessorio(1));

// "Voltar" agora é um link <a> de verdade (mais acessível: funciona sem JS,
// com clique do meio, botão direito "abrir em nova aba", etc). Nada a fazer aqui.

// ===== SALVAR AVATAR =====
// guarda os índices atuais em localStorage, pra usar no jogo (ou em qualquer outra tela).
function mostrarToast(texto) {
    const toast = document.getElementById("toast");
    toast.textContent = texto;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
}

document.getElementById("btn-salvar").addEventListener("click", () => {
    const avatar = {
        cabeca: cabecaAtual,
        torso: torsoAtual,
        pernas: pernasAtual,
        acessorio: acessorioAtual
    };
    localStorage.setItem("blocz_avatar", JSON.stringify(avatar));
    mostrarToast("Avatar salvo! ✓");
});

// carrega o avatar salvo, se existir, ao abrir a tela
(function carregarAvatarSalvo() {
    try {
        const salvo = JSON.parse(localStorage.getItem("blocz_avatar"));
        if (!salvo) return;

        cabecaAtual = salvo.cabeca ?? 1;
        torsoAtual = salvo.torso ?? 1;
        pernasAtual = salvo.pernas ?? 1;
        acessorioAtual = salvo.acessorio ?? 1;

        cabeca.src = `/lego/cabeca/${cabecaAtual}.svg`;
        aplicarPropriedades(cabeca, cabecas[cabecaAtual]);
        torso.src = `/lego/torso/${torsoAtual}.svg`;
        pernas.src = `/lego/pernas/${pernasAtual}.svg`;
        acessorio.src = `/lego/acessorio/${acessorioAtual}.svg`;
        aplicarPropriedades(acessorio, acessorios[acessorioAtual]);
    } catch (e) {
        console.warn("Sem avatar salvo ainda.");
    }
})();