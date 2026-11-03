// Kairo — interacciones del sitio. Sin dependencias; la página funciona sin JS.
(() => {
  const WA_NUMBER = "51973196049";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  // Tema claro / oscuro: sigue al sistema hasta que el visitante elige uno
  const root = document.documentElement;
  const themeBtn = document.querySelector(".theme-toggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () => root.dataset.theme || (systemDark.matches ? "dark" : "light");
  const syncThemeBtn = () => {
    const dark = currentTheme() === "dark";
    root.dataset.theme = currentTheme();
    themeBtn.setAttribute("aria-label", dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    themeBtn.setAttribute("aria-pressed", String(dark));
  };
  if (themeBtn) {
    syncThemeBtn();
    themeBtn.addEventListener("click", () => {
      root.dataset.theme = currentTheme() === "dark" ? "light" : "dark";
      try { localStorage.setItem("kairo-theme", root.dataset.theme); } catch (e) {}
      syncThemeBtn();
    });
    systemDark.addEventListener("change", () => {
      let saved = null;
      try { saved = localStorage.getItem("kairo-theme"); } catch (e) {}
      if (!saved) { delete root.dataset.theme; syncThemeBtn(); }
    });
  }

  // Enlaces de WhatsApp con mensaje prellenado
  document.querySelectorAll("[data-wa]").forEach((link) => {
    link.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(link.dataset.wa)}`;
    link.target = "_blank";
    link.rel = "noopener";
  });

  // Header compacto al hacer scroll + barra de progreso de los pasos
  const header = document.querySelector(".header");
  const steps = document.querySelector(".steps");
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
    if (steps) {
      const r = steps.getBoundingClientRect();
      const p = Math.min(Math.max((window.innerHeight * 0.75 - r.top) / r.height, 0), 1);
      steps.style.setProperty("--progress", `${Math.round(p * 100)}%`);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Menú móvil
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("menu");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".sr-only").textContent = open ? "Cerrar menú" : "Abrir menú";
    nav.classList.toggle("is-open", open);
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // Aparición escalonada al entrar en pantalla
  const reveals = document.querySelectorAll(".reveal, .step");
  document.querySelectorAll(".cards, .plans, .steps, .why__list").forEach((group) => {
    [...group.children].forEach((el, i) => el.style.setProperty("--d", `${i * 90}ms`));
  });
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  // Enlace activo del menú según la sección visible
  const links = [...document.querySelectorAll('.nav ul a[href^="#"]')];
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((a) => { const s = document.querySelector(a.getAttribute("href")); if (s) spy.observe(s); });
  }

  // Luz que sigue al puntero en las tarjetas
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".card, .solution, .plan").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - r.left}px`);
        el.style.setProperty("--y", `${e.clientY - r.top}px`);
      });
    });
  }

  // Terminal que escribe cómo Kairo conecta el negocio
  const term = document.getElementById("term");
  if (term) {
    const lines = [
      ["$ ", "kairo connect --negocio"],
      ["", "→ ventas ........ ", "ok"],
      ["", "→ inventario .... ", "ok"],
      ["", "→ facturación ... ", "ok"],
      ["", "→ clientes ...... ", "ok"],
      ["", "✓ Sistema conectado. Todo fluye."],
    ];
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const render = (done, partial) => {
      const html = done.map(([p, t, ok]) =>
        `${p ? `<span class="p">${p}</span>` : ""}${esc(t)}${ok ? `<span class="ok">${ok}</span>` : ""}`).join("\n");
      term.innerHTML = html + (partial !== undefined ? (done.length ? "\n" : "") + partial : "") + '<span class="cur"></span>';
    };
    if (reduceMotion) {
      render(lines);
    } else {
      let li = 0;
      const typeLine = () => {
        if (li >= lines.length) { setTimeout(() => { li = 0; typeLine(); }, 4200); return; }
        const [p, t, ok] = lines[li];
        let ci = 0;
        const step = () => {
          ci++;
          const prompt = p ? `<span class="p">${p}</span>` : "";
          render(lines.slice(0, li), prompt + esc(t.slice(0, ci)));
          if (ci < t.length) setTimeout(step, li === 0 ? 55 : 22);
          else setTimeout(() => { li++; render(lines.slice(0, li)); setTimeout(typeLine, ok ? 260 : 500); }, ok ? 180 : 0);
        };
        step();
      };
      setTimeout(typeLine, 1600);
    }
  }

  // Formulario → WhatsApp con validación al perder el foco
  const form = document.getElementById("form-contacto");
  if (form) {
    const msgs = { nombre: "Ingrese su nombre.", negocio: "Indique el nombre o rubro de su negocio.", mensaje: "Cuéntenos brevemente qué necesita." };
    const check = (input) => {
      const ok = input.value.trim().length >= 2;
      const field = input.closest(".field");
      field.classList.toggle("is-invalid", !ok);
      input.setAttribute("aria-invalid", String(!ok));
      field.querySelector(".field__error").textContent = ok ? "" : msgs[input.name];
      return ok;
    };
    const inputs = [...form.querySelectorAll("input, textarea")];
    inputs.forEach((input) => {
      input.addEventListener("blur", () => check(input));
      input.addEventListener("input", () => { if (input.closest(".field").classList.contains("is-invalid")) check(input); });
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const invalid = inputs.filter((i) => !check(i));
      if (invalid.length) { invalid[0].focus(); return; }
      const d = Object.fromEntries(new FormData(form));
      const text = `Hola Kairo, soy ${d.nombre.trim()} (${d.negocio.trim()}).\n${d.mensaje.trim()}`;
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
