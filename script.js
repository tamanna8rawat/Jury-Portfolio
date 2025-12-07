/*
  Portfolio Interactions — Vanilla JS Only
  EDIT POINTS:
  - Update subjectDescriptions and subjectAssignments below to edit modal content.
  - Adjust animation timings and effects in functions if desired.
  - Sound effects are now played from the `pop-cartoon-328167.mp3` clip.
*/

// UI Sound Effects — play short audio clip `pop-cartoon-328167.mp3`
// This uses the existing AudioContext for low-latency buffer playback.
const SoundEffects = {
  ctx: null,
  buffer: null,

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  // Load the sample into an AudioBuffer (non-blocking)
  async loadSample() {
    try {
      this.init();
      if (this.buffer) return;
      const res = await fetch('pop-cartoon-328167.mp3');
      const arrayBuffer = await res.arrayBuffer();
      this.buffer = await this.ctx.decodeAudioData(arrayBuffer);
    } catch (err) {
      console.warn('SoundEffects: failed to load sample', err);
      this.buffer = null;
    }
  },

  // Generic sample player with slight pitch/volume control
  // Default volume increased for louder playback (0.0 - 1.0)
  _playSample({ playbackRate = 1, volume = 0.9, duration = 0.25 } = {}) {
    this.init();
    const now = this.ctx.currentTime;
    if (this.buffer) {
      const src = this.ctx.createBufferSource();
      src.buffer = this.buffer;
      src.playbackRate.value = playbackRate;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      src.connect(gain);
      gain.connect(this.ctx.destination);
      src.start(now);
      try { src.stop(now + duration + 0.05); } catch (e) { /* ignore */ }
    }
  },

  pop1() { this._playSample({ playbackRate: 1.05, volume: 1.0, duration: 0.12 }); },
  pop2() { this._playSample({ playbackRate: 1.2, volume: 1.0, duration: 0.14 }); },
  pop3() { this._playSample({ playbackRate: 0.85, volume: 0.98, duration: 0.16 }); },
  pop4() { this._playSample({ playbackRate: 0.95, volume: 0.95, duration: 0.10 }); },
  pop5() { this._playSample({ playbackRate: 1.3, volume: 1.0, duration: 0.14 }); },
  pop6() { this._playSample({ playbackRate: 1.1, volume: 0.98, duration: 0.08 }); },
  pop7() { this._playSample({ playbackRate: 0.9, volume: 0.95, duration: 0.12 }); },
  pop8() { this._playSample({ playbackRate: 1.4, volume: 1.0, duration: 0.18 }); }
};

// Start loading the sample immediately (best-effort). Users will hear nothing
// until the sample finishes loading; the functions are no-ops until then.
SoundEffects.loadSample();

// Smooth scroll for the hero button and nav links
(function enableSmoothScroll() {
  document.querySelectorAll('[data-scroll-to], .site-nav .nav-link').forEach((el) => {
    el.addEventListener('click', (e) => {
      SoundEffects.pop2(); // Bright click for nav
      const targetSel = el.getAttribute('data-scroll-to') || el.getAttribute('href');
      if (!targetSel || !targetSel.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(targetSel);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

// Subject data: descriptions
const subjectDescriptions = {
  visualisation: 'Study of visual language and representation through redesign projects.',
  elements: 'Understanding core design elements and principles via guided compositions.',
  materials: 'Exploration of materials, processes, and making techniques (T).',
  programming: 'Introduction to creative coding and interactive sketches.',
  interaction: 'Foundations of interaction through diaries, audits, and redesigns.',
  div1: 'Interface structures, paper and digital wireframing for apps.',
  dtm: 'Design thinking methods (T) focused on human-centered redesigns.'
};

// Assignment lists
const subjectAssignments = {
  visualisation: [
    { text: 'Currency Design', url: 'https://www.canva.com/design/DAG61cDAYHg/e3yR8ITyIjYqhXvqQx3oNw/view?utm_content=DAG61cDAYHg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0c00893cf7' },
    { text: 'Book Cover', url: 'https://www.canva.com/design/DAG61Roefok/FvSUlPpgufGMVr-ycBR0-Q/view?utm_content=DAG61Roefok&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hade3f925b9' }
  ],
  elements: [
    { text: 'Grayscale Project', url: 'https://www.canva.com/design/DAG61jIBEno/6jE8pt3aM-2IGKSy-LoT2g/watch?utm_content=DAG61jIBEno&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he63f54fc43' },
    { text: 'Product Redesign', url: 'https://www.canva.com/design/DAG60m9jmsA/YqfdW7OBjp1CarmCwGlvGg/view?utm_content=DAG60m9jmsA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h03aa927ad0' }
  ],
  materials: [
    { text: 'Plastic', url: 'https://www.canva.com/design/DAG6yo3D4-c/uM98yko5RMi6hDHqDHXn_w/view?utm_content=DAG6yo3D4-c&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h9a63527b0c' },
    { text: 'Wood', url: 'https://www.canva.com/design/DAG6w0LIbys/aI13KJ_FGcmjgxkSBN19hw/view?utm_content=DAG6w0LIbys&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h454bf9bab1' },
    { text: 'Metal', url: 'https://www.canva.com/design/DAG0_TJWtps/aRgfs1SpIO20xECHBP8Jfg/view?utm_content=DAG0_TJWtps&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h9a34c70a4e' }
  ],
  programming: [
    { text: "VS Code Project — Tamanna's Coffee House", url: 'https://tamanna8rawat.github.io/Tamanna-s-Coffee-House/' },
    { text: 'p5.js Sketches (OpenProcessing)', url: 'https://openprocessing.org/user/566556/#sketches' }
  ],
  interaction: [
    { text: 'Chess Interaction', url: 'https://www.canva.com/design/DAG6ugiZ9l8/p4E1vKNnT9vako6EyCIn_Q/view?utm_content=DAG6ugiZ9l8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h2a50ae219f' },
    { text: 'Research Paper', url: 'https://www.canva.com/design/DAG3xgrgl5k/xffQ5QI_IfCD_cFTQ_1INw/view?utm_content=DAG3xgrgl5k&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0091db167e' },
    { text: 'Interaction Audit', url: 'https://www.canva.com/design/DAG6pyE3E9U/pUGiotK-TGgg3nOPp9OBsQ/view?utm_content=DAG6pyE3E9U&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h05b642a37b' },
    { text: 'Interaction Diary', url: 'https://www.canva.com/design/DAG6QDqACAo/1lErsvwCYGzUWpegTjOOeg/view?utm_content=DAG6QDqACAo&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h8b7fd7facf' }
  ],
  div1: [
    { text: 'Paper Wireframe', url: 'https://www.canva.com/design/DAG60ZKK0fk/k56LJqNofC_QBBD-i0ZLSg/view?utm_content=DAG60ZKK0fk&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h63565f11da' },
    { text: 'Figma Redesign', url: 'https://www.figma.com/proto/cXkIjSXPxeBEBl8x0Lxawb/Untitled?node-id=0-1&t=yFwQ6wdfH7xgdSa5-1' }
  ],
  dtm: [
    { text: 'Product Redesign', url: 'https://www.canva.com/design/DAG60m9jmsA/YqfdW7OBjp1CarmCwGlvGg/view?utm_content=DAG60m9jmsA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h03aa927ad0' },
    { text: 'Wallet Redesign', url: 'https://www.canva.com/design/DAG606X180k/oC2AudjDCAtayY9X-IACDQ/view?utm_content=DAG606X180k&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5c40cf04c8' }
  ]
};

// Modal open/close logic
const modal = document.getElementById('assignmentModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalList = document.getElementById('modalList');

function openModalForSubject(subjectKey, subjectTitleText) {
  modalTitle.textContent = subjectTitleText;
  modalDesc.textContent = subjectDescriptions[subjectKey] || 'Subject description placeholder.';

  // Build assignments list
  modalList.innerHTML = '';
  const list = subjectAssignments[subjectKey] || [];
  list.forEach((item) => {
    const li = document.createElement('li');
    if (typeof item === 'object' && item.url) {
      const button = document.createElement('button');
      button.textContent = item.text;
      button.className = 'assignment-btn';
      button.addEventListener('click', () => {
        SoundEffects.pop5(); // playful chirp when opening assignment
        window.open(item.url, '_blank');
      });
      li.appendChild(button);
    } else {
      li.textContent = item;
    }
    modalList.appendChild(li);
  });

  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Open modal from cards
(function wireCardButtons() {
  document.querySelectorAll('.card').forEach((card) => {
    const key = card.getAttribute('data-subject');
    const title = card.querySelector('.card-title')?.textContent || 'Subject';

    card.querySelector('[data-open-modal]')?.addEventListener('click', () => {
      SoundEffects.pop1(); // soft pop for modal open
      openModalForSubject(key, title);
    });
  });
})();

// Close modal interactions
(function wireModalClose() {
  document.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', () => {
      SoundEffects.pop4(); // bleep for modal close
      closeModal();
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      SoundEffects.pop4();
      closeModal();
    }
  });
})();

// Emoji subtle movement on hover
(function animateEmojiOnHover() {
  document.querySelectorAll('.card').forEach((card) => {
    const emoji = card.querySelector('.card-emoji');
    if (!emoji) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      emoji.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
    });
    card.addEventListener('mouseleave', () => {
      emoji.style.transform = '';
    });
  });
})();

// Light entrance animation triggered after load
window.addEventListener('load', () => {
  document.querySelectorAll('.card').forEach((card, i) => {
    card.style.animationDelay = `${120 + i * 80}ms`;
  });
});
