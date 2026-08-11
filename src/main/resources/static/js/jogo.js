const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

// carrega o avatar salvo (ou usa peça 1 em tudo como padrão)
const avatarSalvo = JSON.parse(localStorage.getItem("blocz_avatar") || "null")
  || { cabeca: 1, torso: 1, pernas: 1, acessorio: 1 };

const imgCabeca = new Image();
const imgTorso = new Image();
const imgPernas = new Image();
const imgAcessorio = new Image();
imgCabeca.src = `/lego/cabeca/${avatarSalvo.cabeca}.svg`;
imgTorso.src = `/lego/torso/${avatarSalvo.torso}.svg`;
imgPernas.src = `/lego/pernas/${avatarSalvo.pernas ?? 1}.svg`;
imgAcessorio.src = `/lego/acessorio/${avatarSalvo.acessorio ?? 1}.svg`;

const CORES_BLOCO = ["#7c3aed", "#38bdf8", "#f472b6", "#facc15"];

// mesmas alturas customizadas por variante de cabeça do criador de avatar (lego.js).
// cabeças de cabelo longo precisam de mais altura pra "descer" até o colarinho —
// usar uma altura fixa pra todas deixava um vão entre a cabeça e o torso.
const ALTURAS_CABECA = {
  1: 171, 2: 171, 3: 171, 4: 169, 5: 171, 6: 171, 7: 169.75, 8: 171, 9: 171,
  10: 171, 11: 169.67, 12: 261, 13: 258, 14: 170, 15: 171, 16: 171, 17: 171,
  18: 313, 19: 171, 20: 261, 21: 225, 22: 261, 23: 170, 24: 260
};
// escala: mesma proporção do criador de avatar (container ~494px) pro tamanho do jogo.
const ESCALA_AVATAR = 170 / 494;

let player, itens, score, vidas, velocidadeBase, rodando, ultimoSpawn, frame;

function reiniciarEstado() {
  player = { x: W / 2 - 35, y: H - 190, largura: 70, altura: 170, vx: 0 };
  itens = [];
  score = 0;
  vidas = 3;
  velocidadeBase = 2.6;
  rodando = false;
  ultimoSpawn = 0;
  frame = 0;
  atualizarHud();
}
reiniciarEstado();

function atualizarHud() {
  document.getElementById("hud-score").textContent = score;
  document.getElementById("hud-vidas").textContent = vidas;
}

function spawnItem() {
  const ehBomba = Math.random() < 0.18;
  itens.push({
    x: Math.random() * (W - 40) + 20,
    y: -30,
    raio: ehBomba ? 18 : 20,
    velocidade: velocidadeBase + Math.random() * 1.5,
    bomba: ehBomba,
    cor: CORES_BLOCO[Math.floor(Math.random() * CORES_BLOCO.length)]
  });
}

function desenharBlocoArredondado(x, y, tamanho, raioCanto) {
  // desenha um quadrado arredondado manualmente — evita depender de ctx.roundRect,
  // que não existe em todo navegador/contexto e travava o loop do jogo silenciosamente.
  const r = raioCanto;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + tamanho - r, y);
  ctx.quadraticCurveTo(x + tamanho, y, x + tamanho, y + r);
  ctx.lineTo(x + tamanho, y + tamanho - r);
  ctx.quadraticCurveTo(x + tamanho, y + tamanho, x + tamanho - r, y + tamanho);
  ctx.lineTo(x + r, y + tamanho);
  ctx.quadraticCurveTo(x, y + tamanho, x, y + tamanho - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

function desenharBloco(item) {
  ctx.save();
  ctx.translate(item.x, item.y);
  if (item.bomba) {
    ctx.fillStyle = "#1f1f24";
    ctx.beginPath();
    ctx.arc(0, 0, item.raio, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -item.raio);
    ctx.lineTo(6, -item.raio - 10);
    ctx.stroke();
  } else {
    ctx.fillStyle = item.cor;
    const s = item.raio;
    desenharBlocoArredondado(-s, -s, s * 2, 6);
    // "tocos" de lego no topo
    ctx.beginPath();
    ctx.arc(-s / 2, -s, s / 4, 0, Math.PI * 2);
    ctx.arc(s / 2, -s, s / 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// desenha uma peça mantendo a proporção original (largura calculada a partir da altura),
// centralizada horizontalmente em xCentro. Evita esticar a imagem.
function desenharPecaProporcional(img, xCentro, yTopo, alturaAlvo) {
  if (!img.complete) return;
  const temDimensoes = img.naturalWidth > 0 && img.naturalHeight > 0;
  const proporcao = temDimensoes ? img.naturalWidth / img.naturalHeight : 1;
  const largura = alturaAlvo * proporcao;
  ctx.drawImage(img, xCentro - largura / 2, yTopo, largura, alturaAlvo);
}

function desenharPlayer() {
  const centroX = player.x + player.largura / 2;
  const py = player.y;

  const alturaCabeca = (ALTURAS_CABECA[avatarSalvo.cabeca] || 170) * ESCALA_AVATAR;

  // pernas e torso ficam em posição FIXA (igual ao criador de avatar) — quem varia
  // é só a altura da cabeça, que se estende pra baixo quando o cabelo é mais longo.
  desenharPecaProporcional(imgPernas, centroX, py + 110, 60);      // pernas
  desenharPecaProporcional(imgTorso, centroX, py + 58, 69);        // torso
  desenharPecaProporcional(imgCabeca, centroX, py, alturaCabeca);  // cabeça (altura variável)

  // acessório: no criador original ele tem offset próprio (x:+95, y:80, altura:130
  // num container de 500px) — não fica centralizado. Escalando pra cá:
  desenharPecaProporcional(imgAcessorio, centroX + 33, py + 27, 45);
}

function colidiu(item) {
  return (
    item.y + item.raio > player.y &&
    item.y - item.raio < player.y + player.altura &&
    item.x + item.raio > player.x &&
    item.x - item.raio < player.x + player.largura
  );
}

function loop() {
  if (!rodando) return;
  try {
    frame++;

    ctx.clearRect(0, 0, W, H);

    // fundo com leve grid
    ctx.fillStyle = "#f0e9fb";
    ctx.fillRect(0, 0, W, H);

    // spawn periódico, acelera com o tempo
    const intervaloSpawn = Math.max(28, 55 - Math.floor(frame / 200));
    if (frame - ultimoSpawn > intervaloSpawn) {
      spawnItem();
      ultimoSpawn = frame;
    }

    // move player
    player.x += player.vx;
    player.x = Math.max(0, Math.min(W - player.largura, player.x));

    // atualiza itens
    for (let i = itens.length - 1; i >= 0; i--) {
      const item = itens[i];
      item.y += item.velocidade;
      desenharBloco(item);

      if (colidiu(item)) {
        if (item.bomba) {
          vidas--;
          atualizarHud();
          if (vidas <= 0) return fimDeJogo();
        } else {
          score += 10;
          atualizarHud();
        }
        itens.splice(i, 1);
        continue;
      }

      if (item.y - item.raio > H) {
        if (!item.bomba) {
          vidas--;
          atualizarHud();
          if (vidas <= 0) { itens.splice(i, 1); return fimDeJogo(); }
        }
        itens.splice(i, 1);
      }
    }

    desenharPlayer();

    requestAnimationFrame(loop);
  } catch (erro) {
    console.error("Erro no loop do jogo:", erro);
    rodando = false;
    fimDeJogo();
  }
}

function iniciarJogo() {
  reiniciarEstado();
  document.getElementById("overlay-inicio").style.display = "none";
  document.getElementById("overlay-fim").style.display = "none";
  rodando = true;
  requestAnimationFrame(loop);
}

function fimDeJogo() {
  rodando = false;
  const recorde = Number(localStorage.getItem("blocz_highscore") || 0);
  const bateuRecorde = score > recorde;
  if (bateuRecorde) localStorage.setItem("blocz_highscore", score);

  document.getElementById("resultado-final").textContent = bateuRecorde
    ? `Novo recorde: ${score} pontos! 🎉`
    : `Você fez ${score} pontos. Recorde: ${Math.max(score, recorde)}.`;
  document.getElementById("overlay-fim").style.display = "flex";

  // leva o foco pro título de fim de jogo, pra quem navega por teclado/leitor de tela
  const titulo = document.getElementById("titulo-fim");
  titulo.focus();
}

// controles
const VELOCIDADE_MOVIMENTO = 6;
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") player.vx = -VELOCIDADE_MOVIMENTO;
  if (e.key === "ArrowRight") player.vx = VELOCIDADE_MOVIMENTO;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") player.vx = 0;
});

function segurarBotao(botaoId, direcao) {
  const btn = document.getElementById(botaoId);
  const iniciar = () => player.vx = direcao * VELOCIDADE_MOVIMENTO;
  const parar = () => player.vx = 0;
  btn.addEventListener("touchstart", (e) => { e.preventDefault(); iniciar(); });
  btn.addEventListener("touchend", parar);
  btn.addEventListener("mousedown", iniciar);
  btn.addEventListener("mouseup", parar);
  btn.addEventListener("mouseleave", parar);
}
segurarBotao("btn-esquerda", -1);
segurarBotao("btn-direita", 1);

document.getElementById("btn-iniciar").addEventListener("click", iniciarJogo);
document.getElementById("btn-jogar-de-novo").addEventListener("click", iniciarJogo);

// foco inicial no botão de jogar, pra quem navega por teclado não precisar dar Tab manualmente
document.getElementById("btn-iniciar").focus();