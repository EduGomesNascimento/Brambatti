/* Interações visuais e renderização dos depoimentos. */

const reviewsData = [
  {
    name: "César Britz",
    rating: 5,
    comment: "Excelente profissional, muito atencioso e gentil, com grande qualidade e perfeccionismo nos trabalhos."
  },
  {
    name: "Ana Maria Malvarez",
    rating: 5,
    comment: "Minha experiência foi simplesmente perfeita. Atendimento acolhedor, respeitoso e com extrema qualidade humana."
  },
  {
    name: "Júlia Couto",
    rating: 5,
    comment: "Ótimos profissionais e equipe com excelência. Higiene, cuidados e ambiente impecáveis. Sou paciente há mais de 10 anos."
  },
  {
    name: "Brenda Brambatti Mentz",
    rating: 5,
    comment: "Atendimento muito bom, profissionais e serviço de qualidade. Super atenciosos."
  },
  {
    name: "André Machado",
    rating: 5,
    comment: "Dr. Rafael é um profissional diferenciado, com calma e dedicação em cada procedimento e explicações claras."
  },
  {
    name: "Christofer Lutz",
    rating: 5,
    comment: "Profissionais excelentes, competentes, educados e éticos. Ambiente confortável e muito bem higienizado."
  },
  {
    name: "Laura Angelina",
    rating: 5,
    comment: "Sou paciente há anos e sempre fui muito bem atendida. Serviço de primeira qualidade."
  },
  {
    name: "Onira Bonifácio",
    rating: 5,
    comment: "Grande diferencial no atendimento, da recepção ao consultório, em um espaço amplo e bem estruturado."
  },
  {
    name: "Liane Maria de Freitas",
    rating: 5,
    comment: "Excelente atendimento de toda a equipe da clínica. Me sinto feliz em ser cliente há mais de 25 anos."
  },
  {
    name: "Jorge Dahmer",
    rating: 5,
    comment: "Equipe excelente e muito competente. Atendimento diferenciado e de alto nível."
  },
  {
    name: "Cárem Metz",
    rating: 5,
    comment: "Atendimento sensacional desde a recepção. Equipe especializada e muito atenciosa."
  },
  {
    name: "Lisa Fraga",
    rating: 5,
    comment: "Atendimento de qualidade, pontualidade e profissionais capacitados e competentes."
  },
  {
    name: "Liziane Müller",
    rating: 5,
    comment: "Hoje não tenho mais medo de ir ao dentista. Equipe paciente, atenciosa e extremamente competente."
  },
  {
    name: "Xena Guerreira",
    rating: 5,
    comment: "Ótimos profissionais, atendimento excelente e valores acessíveis para a qualidade do trabalho."
  },
  {
    name: "Ana Rita Zanatta",
    rating: 5,
    comment: "Melhor atendimento, sorriso renovado e autoestima lá em cima. Super recomendo."
  },
  {
    name: "Paulo Winter",
    rating: 5,
    comment: "Profissionais e auxiliares transmitem confiança e segurança e finalizam com trabalho perfeito."
  },
  {
    name: "Lisete Debacker",
    rating: 5,
    comment: "Atendimento sempre excelente, com experiência e segurança em todos os procedimentos."
  },
  {
    name: "Marcelo Schossler",
    rating: 5,
    comment: "Excelente atendimento e higiene. Profissionais qualificados, dedicados e atenciosos."
  },
  {
    name: "Gilberto Dorneles Ebert",
    rating: 5,
    comment: "Ótima experiência na clínica. Tratamento de excelência e equipe muito querida."
  },
  {
    name: "Felipe Strieder",
    rating: 5,
    comment: "Excelente atendimento e profissionais incríveis."
  }
];

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function stars(rating = 5) {
  const count = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  return `${"\u2605".repeat(count)}${"\u2606".repeat(5 - count)}`;
}

function initMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");

  if (!toggle || !nav) return;

  function closeMenu() {
    toggle.classList.remove("is-open");
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    const opening = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", opening);
    toggle.classList.toggle("is-open", opening);
    toggle.setAttribute("aria-expanded", String(opening));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 780) closeMenu();
  });
}

function initHeaderState() {
  const header = document.getElementById("site-header");
  const hero = document.getElementById("home");
  if (!header || !hero) return;

  const setHeader = () => {
    const threshold = hero.offsetHeight * 0.22;
    header.classList.toggle("is-solid", window.scrollY > threshold);
  };

  setHeader();
  window.addEventListener("scroll", setHeader, { passive: true });
  window.addEventListener("resize", setHeader);
}

function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  let rafId = null;
  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    bar.style.width = `${(ratio * 100).toFixed(2)}%`;
  };

  const onScroll = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      update();
      rafId = null;
    });
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
}

function initRevealAnimations() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  revealEls.forEach((el, idx) => {
    const delay = Math.min((idx % 8) * 65, 380);
    el.style.transitionDelay = `${delay}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.18 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

function initHeroParallax() {
  const stack = document.querySelector(".hero-photo-stack");
  if (!stack) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const pics = stack.querySelectorAll("img");
  if (!pics.length) return;

  let rafId = null;
  stack.addEventListener("mousemove", (event) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const bounds = stack.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      pics[0].style.transform = `translate3d(${x * 8}px, ${y * 10}px, 0) rotate(${x * 2.2}deg)`;
      if (pics[1]) {
        pics[1].style.transform = `translate3d(${x * -10}px, ${y * -8}px, 0) rotate(${x * -2.8}deg)`;
      }
    });
  });

  stack.addEventListener("mouseleave", () => {
    pics.forEach((img) => {
      img.style.transform = "";
    });
  });
}

function initTiltEffects() {
  const cards = document.querySelectorAll("[data-tilt]");
  if (!cards.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  cards.forEach((card) => {
    if (card.dataset.tiltReady === "true") return;
    card.dataset.tiltReady = "true";

    let rafId = null;

    const update = (event) => {
      const bounds = card.getBoundingClientRect();
      const rx = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8;
      const ry = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
      card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
    };

    card.addEventListener("mousemove", (event) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => update(event));
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || "";
    if (!Number.isFinite(target)) return;

    const duration = 1400;
    const start = performance.now();

    const frame = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) * (1 - progress);
      const value = Math.floor(target * eased);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initImageFallbacks() {
  const fallbackSrc = "assets/images/photo-fallback.svg";
  const images = document.querySelectorAll("img");
  if (!images.length) return;

  images.forEach((img) => {
    if (img.dataset.fallbackBound === "true") return;
    img.dataset.fallbackBound = "true";
    img.addEventListener("error", () => {
      if (img.dataset.fallbackApplied === "true") return;
      img.dataset.fallbackApplied = "true";
      img.src = fallbackSrc;
      img.classList.add("is-fallback");
    });
  });
}

function renderReviews(items) {
  const grid = document.getElementById("reviews-grid");
  if (!grid) return;

  const safeItems = Array.isArray(items) ? items.slice(0, 12) : [];
  grid.innerHTML = safeItems
    .map((item) => {
      const name = escapeHtml(item.name || "Paciente");
      const rating = Number(item.rating || 5);
      const comment = escapeHtml(item.comment || "");
      return `
        <article class="review-card reveal is-visible" data-tilt>
          <header>
            <h3>${name}</h3>
            <span class="rating" aria-label="Avaliação ${rating} de 5">${stars(rating)}</span>
          </header>
          <p>${comment}</p>
        </article>
      `;
    })
    .join("");
}

function loadReviews() {
  const status = document.getElementById("reviews-status");
  renderReviews(reviewsData);
  if (status) status.textContent = "Depoimentos reais de pacientes da Brambatti Odontologia.";
  initImageFallbacks();
}

function setFooterYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

function init() {
  initMenu();
  initHeaderState();
  initScrollProgress();
  initRevealAnimations();
  initHeroParallax();
  initTiltEffects();
  initCounters();
  initImageFallbacks();
  setFooterYear();
  loadReviews();
}

document.addEventListener("DOMContentLoaded", init);
