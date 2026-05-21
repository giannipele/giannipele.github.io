/**
 * Synthwave easter egg.
 *
 * The Konami code (Up Up Down Down Left Right Left Right B A) toggles a
 * full "vaporwave" mode on the site. The choice is persisted in
 * localStorage so the mode survives reloads.
 *
 * Also prints a small "whoami" banner to the developer console with a
 * hint about the easter egg.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "synthwave-vaporwave";
  const KONAMI = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  const html = document.documentElement;

  function applyVaporwave(on) {
    html.classList.toggle("vaporwave", on);
    if (on) {
      console.log(
        "%c[ vaporwave engaged ]",
        "color:#ff2a92;font-family:monospace;font-size:14px;text-shadow:0 0 6px #ff2a92,0 0 18px #00e5ff;",
      );
    } else {
      console.log(
        "%c[ vaporwave disengaged ]",
        "color:#9b8fc7;font-family:monospace;font-size:14px;",
      );
    }
  }

  try {
    if (localStorage.getItem(STORAGE_KEY) === "1") {
      applyVaporwave(true);
    }
  } catch (_) {
    /* localStorage may be unavailable in some contexts */
  }

  let pos = 0;
  document.addEventListener("keydown", function (event) {
    const expected = KONAMI[pos];
    const key = event.key;
    const matches =
      key === expected || (key && key.toLowerCase() === expected.toLowerCase());

    if (matches) {
      pos += 1;
      if (pos === KONAMI.length) {
        const newState = !html.classList.contains("vaporwave");
        applyVaporwave(newState);
        try {
          localStorage.setItem(STORAGE_KEY, newState ? "1" : "0");
        } catch (_) {
          /* ignore */
        }
        pos = 0;
      }
    } else {
      // Allow the very first key to restart the sequence if it matches.
      pos = key === KONAMI[0] ? 1 : 0;
    }
  });

  console.log(
    "%c~/$%c whoami\n%cgiovanni_pellegrini // AI scientist\n%c~/$%c hint:%c try ↑ ↑ ↓ ↓ ← → ← → B A",
    "color:#ff2a92;font-family:monospace;font-weight:bold;",
    "color:inherit;font-family:monospace;",
    "color:#00e5ff;font-family:monospace;",
    "color:#ff2a92;font-family:monospace;font-weight:bold;",
    "color:inherit;font-family:monospace;",
    "color:#9b8fc7;font-family:monospace;font-style:italic;",
  );
})();
