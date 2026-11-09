/**
 * Goose Policy Website — Theme Handler
 * Vanilla JavaScript light/dark theme toggle with localStorage persistence
 * and OS system preference fallback. Zero external dependencies.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'goose-theme';

  function getStoredTheme() {
    try {
      var val = localStorage.getItem(STORAGE_KEY);
      if (val === 'dark' || val === 'light') {
        return val;
      }
    } catch (e) {
      // Handle SecurityError or QuotaExceededError in private browsing
    }
    return null;
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // Handle private browsing storage restrictions
    }
  }

  function getSystemTheme() {
    try {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (e) {}
    return 'light';
  }

  function getCurrentTheme() {
    var stored = getStoredTheme();
    if (stored) {
      return stored;
    }
    var htmlTheme = document.documentElement.getAttribute('data-theme');
    if (htmlTheme === 'dark' || htmlTheme === 'light') {
      return htmlTheme;
    }
    return getSystemTheme();
  }

  function applyTheme(theme, save) {
    var validTheme = (theme === 'dark' || theme === 'light') ? theme : 'light';
    document.documentElement.setAttribute('data-theme', validTheme);
    if (save) {
      setStoredTheme(validTheme);
    }
    updateToggleButton(validTheme);
  }

  function updateToggleButton(theme) {
    var btn = document.getElementById('theme-toggle');
    if (!btn) {
      return;
    }
    var isDark = theme === 'dark';
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    var label = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || getCurrentTheme();
    var next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
  }

  function initToggle() {
    var current = getCurrentTheme();
    applyTheme(current, false);

    var btn = document.getElementById('theme-toggle');
    if (btn && !btn._themeToggleBound) {
      btn._themeToggleBound = true;
      btn.addEventListener('click', toggleTheme);
    }
  }

  // Listen to system preference changes when user has no stored theme preference
  try {
    if (window.matchMedia) {
      var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      var handler = function (e) {
        if (!getStoredTheme()) {
          applyTheme(e.matches ? 'dark' : 'light', false);
        }
      };
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handler);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handler);
      }
    }
  } catch (e) {}

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToggle);
  } else {
    initToggle();
  }
})();
