/* ============================================================
   RAFALSKY DICTIONARY — OPTIMIZED 35k MODE
   ============================================================ */

'use strict';

const FONTS = [
  { name: 'Playfair Display',   style: "'Playfair Display', serif",          italic: true  },
  { name: 'IM Fell English',    style: "'IM Fell English', serif",            italic: true  },
  { name: 'Cormorant Garamond', style: "'Cormorant Garamond', serif",         italic: true  },
  { name: 'Cinzel Decorative',  style: "'Cinzel Decorative', serif",          italic: false },
  { name: 'Marck Script',       style: "'Marck Script', cursive",             italic: false },
  { name: 'UnifrakturMaguntia', style: "'UnifrakturMaguntia', cursive",       italic: false },
];

const GOLDEN_SEED = [
  { w: "Харизма", d: "Особливий дар, виняткові якості особистості, що дозволяють вести за собою інших." },
  { w: "Ейфорія", d: "Стан піднесення, задоволення, який не завжди відповідає об’єктивним обставинам." },
  { w: "Генезис", d: "Походження, виникнення та процес закономірного розвитку будь-якого явища." },
  { w: "Дежавю", d: "Психологічний ефект, за якого людина відчуває, що вже була в аналогічній ситуації." },
  { w: "Емпатія", d: "Здатність розуміти емоційний стан іншої людини та співпереживати їй." },
  { w: "Парадокс", d: "Твердження або ситуація, що суперечить логіці або загальноприйнятим поглядам." },
  { w: "Синергія", d: "Ефект взаємодії кількох чинників, який перевищує суму результатів їхньої дії." },
  { w: "Метафора", d: "Перенесення назви з одного предмета на інший на основі їхньої схожості." },
  { w: "Катарсис", d: "Духовне очищення, яке людина відчуває після сильного переживання." },
  { w: "Ентропія", d: "Міра невпорядкованості або випадковості в будь-якій складній системі." },
];

const state = {
  words: [],
  history: [],
  indexLoaded: false,
  isBusy: false,
  interval: 10,
  timer: null
};

// Faster 50k source, we will slice it to 35k
const INDEX_URL = 'https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/uk/uk_50k.txt';

const DOM = {
  title:    document.getElementById('word-title'),
  def:      document.getElementById('word-definition'),
  origin:   document.getElementById('word-origin'),
  counter:  document.getElementById('word-counter'),
  card:     document.getElementById('word-card'),
  progress: document.getElementById('progress-bar'),
  stage:    document.getElementById('main-stage')
};

function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  for (let i = 0; i < 40; i++) {
    particles.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random()*1.1+0.1, vx: (Math.random()-0.5)*0.1, vy: (Math.random()-0.5)*0.1, alpha: Math.random()*0.4+0.1 });
  }
  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(200,169,110,${p.alpha})`; ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
}

async function fetchWikiDef(word) {
  try {
    const api = `https://uk.wiktionary.org/w/api.php?action=query&titles=${encodeURIComponent(word)}&prop=extracts&exintro=1&explaintext=1&format=json&origin=*`;
    const res = await fetch(api);
    const data = await res.json();
    const page = Object.values(data.query.pages)[0];
    if (page && page.extract) {
       let lines = page.extract.split('\n').filter(l => l.trim().length > 5);
       return lines[0] ? lines[0].slice(0, 420) : null;
    }
  } catch (e) {} return null;
}

async function nextSlide() {
  if (state.isBusy) return;
  state.isBusy = true;

  DOM.card.classList.add('is-loading');

  let wordData = null;
  
  if (!state.indexLoaded) {
    wordData = GOLDEN_SEED[Math.floor(Math.random() * GOLDEN_SEED.length)];
  } else {
    for (let i = 0; i < 15; i++) {
        let w = state.words[Math.floor(Math.random() * state.words.length)];
        if (state.history.includes(w)) continue;
        let d = await fetchWikiDef(w);
        if (d) {
            wordData = { w, d };
            state.history.push(w);
            break;
        }
    }
  }

  if (!wordData) wordData = GOLDEN_SEED[Math.floor(Math.random() * GOLDEN_SEED.length)];

  DOM.card.style.opacity = '0';
  DOM.card.style.transform = 'translateY(12px)';
  await new Promise(r => setTimeout(r, 400));

  const font = FONTS[Math.floor(Math.random() * FONTS.length)];
  DOM.title.style.fontFamily = font.style;
  DOM.title.textContent = wordData.w;
  DOM.def.textContent = wordData.d;
  DOM.origin.textContent = "— Словник Рафальського";
  DOM.counter.textContent = state.indexLoaded ? `Архів: ${state.words.length.toLocaleString()} значень` : 'Завантаження...';

  DOM.card.classList.remove('is-loading');
  DOM.card.style.opacity = '1';
  DOM.card.style.transform = 'translateY(0)';
  
  await new Promise(r => setTimeout(r, 400));
  state.isBusy = false;
  
  startTimer();
}

function startTimer() {
  clearTimeout(state.timer);
  DOM.progress.style.transition = 'none';
  DOM.progress.style.width = '0%';
  requestAnimationFrame(() => {
    DOM.progress.style.transition = `width ${state.interval}s linear`;
    DOM.progress.style.width = '100%';
    state.timer = setTimeout(() => nextSlide(), state.interval * 1000);
  });
}

function init() {
  initParticles();
  DOM.stage.onclick = () => nextSlide();
  document.onkeydown = (e) => { if (e.key === ' ' || e.key === 'ArrowRight') nextSlide(); };

  // First word instant
  const start = GOLDEN_SEED[Math.floor(Math.random() * GOLDEN_SEED.length)];
  DOM.title.textContent = start.w;
  DOM.def.textContent = start.d;
  startTimer();

  // Load 35k database
  fetch(INDEX_URL)
    .then(r => r.text())
    .then(txt => {
       state.words = txt.split('\n')
         .slice(0, 35000) // REMAINS MASSIVE BUT FAST
         .map(l => l.split(' ')[0].trim().toLowerCase())
         .filter(w => /^[а-щьюяєіїґ]+$/.test(w) && w.length > 4);
       state.indexLoaded = true;
    })
    .catch(() => { state.indexLoaded = false; });
}

document.addEventListener('DOMContentLoaded', init);
