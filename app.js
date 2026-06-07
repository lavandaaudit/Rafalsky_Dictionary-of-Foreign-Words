/* ============================================================
   RAFALSKY DICTIONARY — FLICKER-FREE HYBRID MODE
   ============================================================ */

'use strict';

const CALLIGRAPHIC_FONTS = [
  { name: 'Playfair Display',   style: "'Playfair Display', serif",          italic: true  },
  { name: 'IM Fell English',    style: "'IM Fell English', serif",            italic: true  },
  { name: 'Cormorant Garamond', style: "'Cormorant Garamond', serif",         italic: true  },
  { name: 'Cinzel Decorative',  style: "'Cinzel Decorative', serif",          italic: false },
  { name: 'UnifrakturMaguntia', style: "'UnifrakturMaguntia', cursive",       italic: false },
  { name: 'Marck Script',       style: "'Marck Script', cursive",             italic: false },
  { name: 'Alex Brush',         style: "'Alex Brush', cursive",               italic: false },
  { name: 'Dancing Script',     style: "'Dancing Script', cursive",           italic: false },
  { name: 'Almendra',           style: "'Almendra', serif",                   italic: true  },
  { name: 'Sorts Mill Goudy',   style: "'Sorts Mill Goudy', serif",           italic: true  },
  { name: 'Libre Baskerville',  style: "'Libre Baskerville', serif",          italic: true  },
  { name: 'Spectral',           style: "'Spectral', serif",                   italic: true  },
  { name: 'EB Garamond',        style: "'EB Garamond', serif",                italic: true  },
];

const BASE_WORDS = [
  { word: 'Аура', origin: 'грецьк.', def: 'Невидима оболонка, що нібито оточує людське тіло або інший живий об’єкт.' },
  { word: 'Харизма', origin: 'грецьк.', def: 'Особливий дар, виняткові якості особистості, що дозволяють вести за собою інших.' },
  { word: 'Ейфорія', origin: 'грецьк.', def: ' Стан піднесення, задоволення, який не відповідає об’єктивним обставинам.' },
  { word: 'Ностальгія', origin: 'грецьк.', def: 'Туга за батьківщиною, минулим або чимось далеким і недосяжним.' },
  { word: 'Емпатія', origin: 'грецьк.', def: 'Здатність розуміти емоції іншої людини та співпереживати їй.' },
  { word: 'Лабіринт', origin: 'грецьк.', def: 'Складна споруда або ситуація, з якої важко знайти вихід.' },
  { word: 'Утопія', origin: 'грецьк.', def: ' Ідеальне суспільство, яке неможливо втілити в реальності; нездійсненна мрія.' },
  { word: 'Метафора', origin: 'грецьк.', def: 'Перенесення назви з одного предмета на інший на основі їх схожості.' },
  { word: 'Енергія', origin: 'грецьк.', def: 'Здатність тіла виконувати роботу; внутрішня сила.' },
  { word: 'Шедевр', origin: 'франц.', def: 'Видатний твір мистецтва, вершина майстерності.' },
  { word: 'Абстракція', origin: 'латин.', def: 'Процес відволікання від конкретних властивостей предмета для виявлення суті.' },
  { word: 'Квант', origin: 'латин.', def: 'Мінімальна частка енергії, яку може поглинути або випромінити атом.' }
];

const state = {
  words: [...BASE_WORDS],
  currentIndex: 0,
  autoMode: false,
  autoInterval: null,
  autoDelay: 8,
  animType: 'fade',
  fixedFont: false,
  lastFontIndex: -1,
  isAnimating: false
};

const SEED_URL = 'https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/uk/uk_50k.txt';

const DOM = {
  wordTitle: document.getElementById('word-title'),
  wordDef: document.getElementById('word-definition'),
  wordOrigin: document.getElementById('word-origin'),
  wordCounter: document.getElementById('word-counter'),
  wordCard: document.getElementById('word-card'),
  progressBar: document.getElementById('progress-bar'),
  btnRandom: document.getElementById('btn-random'),
  btnAuto: document.getElementById('btn-auto'),
  btnSettings: document.getElementById('btn-settings'),
  settingsPanel: document.getElementById('settings-panel'),
  intervalRange: document.getElementById('interval-range'),
  intervalVal: document.getElementById('interval-val'),
  toggleFont: document.getElementById('toggle-fixed-font'),
};

function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  for (let i = 0; i < 45; i++) {
    particles.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2 + 0.2, vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15, alpha: Math.random() * 0.4 + 0.1 });
  }
  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,169,110,${p.alpha})`; ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
}

function pickFont() {
  if (state.fixedFont) return CALLIGRAPHIC_FONTS[0];
  let idx; do { idx = Math.floor(Math.random() * CALLIGRAPHIC_FONTS.length); } while (idx === state.lastFontIndex);
  state.lastFontIndex = idx; return CALLIGRAPHIC_FONTS[idx];
}

function renderWord(entry) {
  const font = pickFont();
  DOM.wordTitle.style.fontFamily = font.style;
  DOM.wordDef.style.fontFamily = font.italic ? font.style : "'EB Garamond', serif";
  DOM.wordTitle.textContent = entry.word;
  DOM.wordDef.textContent = entry.def || '...';
  DOM.wordOrigin.textContent = entry.origin ? '— ' + entry.origin : '— Архів';
  DOM.wordCounter.textContent = 'Словник іншомовних слів';
}

// ASYNC TRANSITION: waits for data before fading in
async function transition(fn) {
  if (state.isAnimating) return;
  state.isAnimating = true;

  DOM.wordCard.classList.add('anim-exit-fade');
  
  // Wait for both: the exit animation AND the data fetching
  const [data] = await Promise.all([
    fn(),
    new Promise(r => setTimeout(r, 300))
  ]);

  DOM.wordCard.classList.remove('anim-exit-fade');
  DOM.wordCard.classList.add('anim-enter-fade');
  
  DOM.wordCard.addEventListener('animationend', () => {
    DOM.wordCard.classList.remove('anim-enter-fade');
    state.isAnimating = false;
  }, { once: true });
}

async function fetchWiktionary(word) {
  try {
    const url = `https://uk.wiktionary.org/w/api.php?action=query&titles=${encodeURIComponent(word)}&prop=extracts&exintro=1&explaintext=1&format=json&origin=*`;
    const res = await fetch(url);
    const data = await res.json();
    const page = Object.values(data.query.pages)[0];
    if (page && page.extract) {
      let d = page.extract.split('\n').filter(l => l.length > 5)[0] || page.extract;
      return { word, def: d.slice(0, 400).trim() };
    }
  } catch (e) {} return null;
}

async function showWord(idx) {
  state.currentIndex = (idx + state.words.length) % state.words.length;
  const entry = state.words[state.currentIndex];
  
  if (typeof entry === 'string') {
    const data = await fetchWiktionary(entry);
    if (data) {
      state.words[state.currentIndex] = data;
      renderWord(data);
    } else {
      // Fallback: silently try another random word if current fails
      return showWord(Math.floor(Math.random() * state.words.length));
    }
  } else {
    renderWord(entry);
  }
  resetProgress();
}

function nextWord() { transition(() => showWord(state.currentIndex + 1)); }
function prevWord() { transition(() => showWord(state.currentIndex - 1)); }
function randomWord() { transition(() => showWord(Math.floor(Math.random() * state.words.length))); }

function resetProgress() {
  clearInterval(state.autoInterval);
  DOM.progressBar.style.transition = 'none'; DOM.progressBar.style.width = '0%';
  if (!state.autoMode) return;
  requestAnimationFrame(() => { requestAnimationFrame(() => {
    DOM.progressBar.style.transition = `width ${state.autoDelay}s linear`; DOM.progressBar.style.width = '100%';
    state.autoInterval = setTimeout(() => nextWord(), state.autoDelay * 1000);
  });});
}

function toggleAuto() { state.autoMode = !state.autoMode; DOM.btnAuto.classList.toggle('active', state.autoMode); resetProgress(); }

async function init() {
  initParticles();
  
  document.querySelector('.word-stage').onclick = (e) => {
    if (!e.target.closest('button') && !e.target.closest('.settings-panel')) nextWord();
  };

  DOM.btnRandom.onclick = (e) => { e.stopPropagation(); randomWord(); };
  DOM.btnAuto.onclick = (e) => { e.stopPropagation(); toggleAuto(); };
  DOM.btnSettings.onclick = (e) => { e.stopPropagation(); toggleSettings(); };

  DOM.intervalRange.oninput = () => { state.autoDelay = parseInt(DOM.intervalRange.value); DOM.intervalVal.textContent = state.autoDelay + 'с'; if (state.autoMode) resetProgress(); };
  DOM.toggleFont.onchange = () => { state.fixedFont = DOM.toggleFont.checked; };
  
  document.querySelectorAll('[data-size]').forEach(btn => btn.onclick = () => {
    document.querySelectorAll('[data-size]').forEach(b => b.classList.remove('active')); btn.classList.add('active');
    document.body.className = 'size-' + btn.dataset.size;
  });

  document.onkeydown = (e) => { if (e.key === 'ArrowRight' || e.key === ' ') nextWord(); if (e.key === 'ArrowLeft') prevWord(); };
  renderWord(state.words[0]);

  try {
    const res = await fetch(SEED_URL);
    const txt = await res.text();
    const extra = txt.split('\n')
      .map(l => l.split(' ')[0].trim())
      .filter(w => /^[а-щьюяєіїґ]+$/.test(w) && w.length > 5 && (
        w.endsWith('ція') || w.endsWith('логія') || w.endsWith('ізм') || 
        w.endsWith('тор') || w.endsWith('ер') || w.endsWith('граф')
      ));
    state.words = [...state.words, ...extra];
  } catch (e) {}
}

function toggleSettings() {
  if (DOM.settingsPanel.classList.contains('hidden')) {
    DOM.settingsPanel.classList.remove('hidden');
    requestAnimationFrame(() => DOM.settingsPanel.classList.add('visible'));
  } else {
    DOM.settingsPanel.classList.remove('visible');
    setTimeout(() => DOM.settingsPanel.classList.add('hidden'), 300);
  }
}
document.addEventListener('DOMContentLoaded', init);
