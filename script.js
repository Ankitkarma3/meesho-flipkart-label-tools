/**
 * Shipping Label Tools — Vanilla JavaScript (ES6+)
 * Lightweight, accessible, zero dependencies.
 * All core content remains 100% functional even if JavaScript is disabled.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initLabelCalculator();
  initChecklist();
  initFaqFilter();
});

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu-container');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
    navMenu.classList.toggle('is-open', !isExpanded);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
      toggleBtn.focus();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('is-open')) {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    }
  });
}

/**
 * Label Dimension & Resolution Calculator Helper
 * Calculates optimal aspect ratio and pixels based on target printing format
 */
function initLabelCalculator() {
  const presetSelect = document.getElementById('calc-preset');
  const ratioResult = document.getElementById('calc-ratio');
  const resolutionResult = document.getElementById('calc-resolution');
  const noteResult = document.getElementById('calc-note');

  if (!presetSelect || !ratioResult || !resolutionResult || !noteResult) return;

  const presets = {
    'thermal-4x6': {
      ratio: '2:3 (1:1.5 portrait)',
      res: '812 × 1218 px (at 203 DPI) / 1200 × 1800 px (at 300 DPI)',
      note: 'Industry standard for Meesho & Flipkart thermal printers (TVS, Zebra, Xprinter). Crop to remove blank invoice margins.'
    },
    'thermal-3x5': {
      ratio: '3:5 (1:1.67 portrait)',
      res: '609 × 1015 px (at 203 DPI)',
      note: 'Used on compact thermal roll printers. Ensure barcode height remains at least 25mm for hand scanners.'
    },
    'a4-half': {
      ratio: '1:1.41 (A5 / Half A4)',
      res: '1748 × 2480 px (at 300 DPI)',
      note: 'Ideal when printing on standard A4 paper folded in half or 2-label sticker sheets.'
    },
    'a4-quarter': {
      ratio: '1:1.41 (A6 / Quarter A4)',
      res: '1240 × 1748 px (at 300 DPI)',
      note: 'Perfect for 4-up pre-cut self-adhesive A4 label sheets on laser or inkjet printers.'
    }
  };

  presetSelect.addEventListener('change', () => {
    const selected = presets[presetSelect.value];
    if (selected) {
      ratioResult.textContent = selected.ratio;
      resolutionResult.textContent = selected.res;
      noteResult.textContent = selected.note;
    }
  });
}

/**
 * Seller Shipping Checklist Handler
 */
function initChecklist() {
  const checkboxes = document.querySelectorAll('.checklist-checkbox');
  if (!checkboxes.length) return;

  checkboxes.forEach((cb, index) => {
    const storageKey = `label_chk_${index}`;
    const saved = localStorage.getItem(storageKey);
    if (saved === 'true') {
      cb.checked = true;
      cb.closest('.checklist-item')?.classList.add('checked');
    }

    cb.addEventListener('change', () => {
      const parent = cb.closest('.checklist-item');
      if (cb.checked) {
        parent?.classList.add('checked');
        try { localStorage.setItem(storageKey, 'true'); } catch (e) {}
      } else {
        parent?.classList.remove('checked');
        try { localStorage.removeItem(storageKey); } catch (e) {}
      }
    });
  });
}

/**
 * FAQ Filter Utility
 */
function initFaqFilter() {
  const searchInput = document.getElementById('faq-search-input');
  if (!searchInput) return;

  const faqItems = document.querySelectorAll('.faq-item');
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();

    faqItems.forEach((item) => {
      const qText = item.querySelector('.faq-question')?.textContent.toLowerCase() || '';
      const aText = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';

      if (!term || qText.includes(term) || aText.includes(term)) {
        item.style.display = 'block';
        if (term) {
          item.setAttribute('open', '');
        }
      } else {
        item.style.display = 'none';
        item.removeAttribute('open');
      }
    });
  });
}
