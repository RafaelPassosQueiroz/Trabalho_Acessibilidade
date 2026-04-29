// ===== SLIDE ENGINE =====
const slides = document.querySelectorAll('.slide');
const progress = document.getElementById('progress');
const counter = document.getElementById('counter');
const navDotsContainer = document.getElementById('navDots');
let current = 0;
const total = slides.length;

// Create nav dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
  dot.onclick = () => goTo(i);
  dot.setAttribute('aria-label', `Slide ${i + 1}`);
  navDotsContainer.appendChild(dot);
});

function updateUI() {
  progress.style.width = ((current + 1) / total * 100) + '%';
  counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  document.querySelectorAll('.nav-dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

function goTo(n) {
  if (n < 0 || n >= total || n === current) return;
  slides[current].classList.remove('active');
  slides[current].classList.add('exit-left');
  setTimeout(() => slides[current === n ? current : current].classList.remove('exit-left'), 600);

  const prev = current;
  current = n;
  slides[current].classList.add('active');

  setTimeout(() => slides[prev].classList.remove('exit-left'), 600);

  updateUI();
  triggerSlideAnimations(current);
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  if (e.key === 'Home') { e.preventDefault(); goTo(0); }
  if (e.key === 'End') { e.preventDefault(); goTo(total - 1); }
});

// Touch
let touchStartX = 0;
document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
document.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 60) diff > 0 ? next() : prev();
});

// ===== ANIMATED COUNTERS =====
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const decimals = el.dataset.decimals !== undefined ? parseInt(el.dataset.decimals) : 1;
  const duration = 2000;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = (eased * target).toFixed(decimals);
    el.textContent = (decimals === 0 ? Math.round(eased * target) : value) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ===== ERROR BARS =====
function animateErrorBars() {
  document.querySelectorAll('.error-bar-fill').forEach((bar, i) => {
    setTimeout(() => {
      bar.style.width = bar.dataset.width + '%';
    }, i * 150);
  });
}

// ===== TRIGGER ON SLIDE ENTER =====
function triggerSlideAnimations(idx) {
  const slide = slides[idx];

  // Counters
  slide.querySelectorAll('.counter').forEach(animateCounter);

  // Error bars
  if (slide.querySelectorAll('.error-bar-fill').length) {
    animateErrorBars();
  }
}

// ===== DEMO INTERACTIVE =====
function switchDemo(mode) {
  const form = document.getElementById('demoForm');
  const blur = document.getElementById('blurOverlay');
  const sr = document.getElementById('srText');

  document.querySelectorAll('.sim-btn').forEach(b => b.classList.remove('active-sim'));
  event.target.classList.add('active-sim');

  blur.classList.remove('active');

  if (mode === 'bad') {
    form.className = 'demo-form bad-form';
    sr.textContent = 'Editável. Em branco. Editável. Em branco. Elemento clicável.';
  } else if (mode === 'good') {
    form.className = 'demo-form good-form';
    sr.textContent = 'Formulário de cadastro. Nome completo, editável. Como aparece no documento. E-mail, editável. Usaremos para confirmação. Tipo de deficiência, caixa combinada recolhida, selecione. Botão: enviar.';
  } else if (mode === 'blur') {
    form.className = 'demo-form bad-form';
    blur.classList.add('active');
    sr.textContent = '(Simulação visual de baixa visão — contraste 2.8:1 se torna ilegível)';
  }
}

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = (1 + Math.random() * 2) + 'px';
    p.style.height = p.style.width;
    container.appendChild(p);
  }
}

// ===== INIT =====
updateUI();
createParticles();
triggerSlideAnimations(0);

// ===== QUIZ ENGINE =====
const quizData = [
  {
    q: 'Qual é o erro de acessibilidade mais comum na web, presente em 83.9% dos sites?',
    opts: ['Imagens sem alt text', 'Baixo contraste de texto', 'Links sem href', 'Falta de tag <html lang>'],
    correct: 1,
    explain: 'Baixo contraste é o campeão absoluto — 7 anos consecutivos. (WebAIM Million 2026)'
  },
  {
    q: 'Ferramentas automatizadas como Lighthouse e axe detectam aproximadamente que porcentagem dos problemas reais?',
    opts: ['80–90%', '60–70%', '30–40%', '100%'],
    correct: 2,
    explain: 'O Gov UK (GDS) estima que automação cobre apenas 30–40%. O restante exige teste humano com leitores de tela.'
  },
  {
    q: 'Qual é o ratio mínimo de contraste exigido pelo WCAG 2.1 AA para texto normal?',
    opts: ['3:1', '4.5:1', '7:1', '2:1'],
    correct: 1,
    explain: 'WCAG 2.1 Critério 1.4.3 exige 4.5:1 para texto normal e 3:1 para texto grande (≥18pt ou ≥14pt bold).'
  },
  {
    q: 'Quantos brasileiros vivem com algum tipo de deficiência?',
    opts: ['5 milhões', '18.6 milhões', '45 milhões', '2 milhões'],
    correct: 1,
    explain: '18.6 milhões — 8.9% da população (IBGE Censo 2022). A deficiência visual é a mais prevalente.'
  }
];

let quizCurrent = 0;
let quizScore = 0;

function renderQuiz() {
  const data = quizData[quizCurrent];
  document.getElementById('quizQuestion').textContent = data.q;
  document.getElementById('quizCounter').textContent = `Pergunta ${quizCurrent + 1} de ${quizData.length}`;
  document.getElementById('quizProgressFill').style.width = ((quizCurrent + 1) / quizData.length * 100) + '%';
  document.getElementById('quizFeedback').textContent = '';

  const container = document.getElementById('quizOptions');
  container.innerHTML = '';
  data.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = opt;
    btn.onclick = () => answerQuiz(i);
    container.appendChild(btn);
  });
}

function answerQuiz(idx) {
  const data = quizData[quizCurrent];
  const opts = document.querySelectorAll('.quiz-opt');
  opts.forEach(o => o.classList.add('quiz-opt-locked'));

  if (idx === data.correct) {
    opts[idx].classList.add('correct');
    quizScore++;
  } else {
    opts[idx].classList.add('wrong');
    opts[data.correct].classList.add('correct');
  }

  document.getElementById('quizFeedback').textContent = data.explain;

  setTimeout(() => {
    quizCurrent++;
    if (quizCurrent < quizData.length) {
      renderQuiz();
    } else {
      showQuizScore();
    }
  }, 2500);
}

function showQuizScore() {
  document.getElementById('quizCard').style.display = 'none';
  const scoreEl = document.getElementById('quizScore');
  scoreEl.style.display = 'block';
  document.getElementById('quizScoreNum').textContent = quizScore;
  const msgs = [
    'Hora de rodar um Lighthouse...',
    'Tá no caminho! Continuem pesquisando.',
    'Bom demais! Quase expert.',
    'Parabéns — vocês estão prontos pra construir web acessível.'
  ];
  document.getElementById('quizScoreMsg').textContent = msgs[quizScore];
}

function restartQuiz() {
  quizCurrent = 0;
  quizScore = 0;
  document.getElementById('quizCard').style.display = 'block';
  document.getElementById('quizScore').style.display = 'none';
  renderQuiz();
}

// Init quiz on first visit
renderQuiz();

// ===== KEYBOARD TRAP DEMO =====
function openTrap() {
  const modal = document.getElementById('trapModal');
  modal.classList.add('open');
  modal.querySelector('.trap-btn-accept').focus();
  document.getElementById('trapResult').textContent = '';
}

function closeTrap(reason) {
  document.getElementById('trapModal').classList.remove('open');
  document.getElementById('trapTrigger').focus();
  if (reason === 'accepted') {
    document.getElementById('trapResult').innerHTML = '<span style="color:var(--green);">✓ Modal fechado. Mas os botões "Personalizar" e "Recusar" nunca funcionaram — eram &lt;div&gt;, não &lt;button&gt;.</span>';
  }
}

// ===== TYPEWRITER EFFECT FOR SCREEN READER SIM =====
function typewriterSR(text, speed) {
  const el = document.getElementById('srText');
  el.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(type, speed || 25);
    }
  }
  type();
}

// Override switchDemo to use typewriter
const origSwitchDemo = switchDemo;
window.switchDemo = function(mode) {
  const form = document.getElementById('demoForm');
  const blur = document.getElementById('blurOverlay');

  document.querySelectorAll('.sim-btn').forEach(b => b.classList.remove('active-sim'));
  event.target.classList.add('active-sim');

  blur.classList.remove('active');

  if (mode === 'bad') {
    form.className = 'demo-form bad-form';
    typewriterSR('Editável. Em branco. Editável. Em branco. Elemento clicável.', 30);
  } else if (mode === 'good') {
    form.className = 'demo-form good-form';
    typewriterSR('Formulário de cadastro. Nome completo, editável. Como aparece no documento. E-mail, editável. Usaremos para confirmação. Tipo de deficiência, caixa combinada recolhida, selecione. Botão: enviar.', 20);
  } else if (mode === 'blur') {
    form.className = 'demo-form bad-form';
    blur.classList.add('active');
    typewriterSR('(Simulação visual de baixa visão — contraste 2.8:1 se torna ilegível)', 25);
  }
};