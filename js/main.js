/*
  Integracoes:
  - Configure os endpoints abaixo para producao.
  - O front esta preparado para fallback em mock quando a API nao esta disponivel.
*/
const BRAMBATTI_CONFIG = {
  googleReviewsEndpoint: "",
  instagramEndpoint: "",
  facebookEndpoint: ""
};

const mockReviews = [
  {
    name: "Cesar Britz",
    rating: 5,
    comment: "Excelente profissional, muito atencioso e gentil, com grande qualidade e perfeccionismo nos trabalhos."
  },
  {
    name: "Ana Maria Malvarez",
    rating: 5,
    comment: "Minha experiencia foi simplesmente perfeita. Atendimento acolhedor, respeitoso e com extrema qualidade humana."
  },
  {
    name: "Julia Couto",
    rating: 5,
    comment: "Otimos profissionais e equipe com excelencia. Higiene, cuidados e ambiente impecaveis. Sou paciente ha mais de 10 anos."
  },
  {
    name: "Brenda Brambatti Mentz",
    rating: 5,
    comment: "Atendimento muito bom, profissionais e servico de qualidade. Super atenciosos."
  },
  {
    name: "Andre Machado",
    rating: 5,
    comment: "Dr. Rafael e um profissional diferenciado, com calma e dedicacao em cada procedimento e explicacoes claras."
  },
  {
    name: "Christofer Lutz",
    rating: 5,
    comment: "Profissionais excelentes, competentes, educados e eticos. Ambiente confortavel e muito bem higienizado."
  },
  {
    name: "Laura Angelina",
    rating: 5,
    comment: "Sou paciente ha anos e sempre fui muito bem atendida. Servico de primeira qualidade."
  },
  {
    name: "Onira Bonifacio",
    rating: 5,
    comment: "Grande diferencial no atendimento, da recepcao ao consultorio, em um espaco amplo e bem estruturado."
  },
  {
    name: "Liane Maria de Freitas",
    rating: 5,
    comment: "Excelente atendimento de toda a equipe da clinica. Me sinto feliz em ser cliente ha mais de 25 anos."
  },
  {
    name: "Jorge Dahmer",
    rating: 5,
    comment: "Equipe excelente e muito competente. Atendimento diferenciado e de alto nivel."
  },
  {
    name: "Carem Metz",
    rating: 5,
    comment: "Atendimento sensacional desde a recepcao. Equipe especializada e muito atenciosa."
  },
  {
    name: "Lisa Fraga",
    rating: 5,
    comment: "Atendimento de qualidade, pontualidade e profissionais capacitados e competentes."
  },
  {
    name: "Liziane Muller",
    rating: 5,
    comment: "Hoje nao tenho mais medo de ir ao dentista. Equipe paciente, atenciosa e extremamente competente."
  },
  {
    name: "Xena Guerreira",
    rating: 5,
    comment: "Otimos profissionais, atendimento excelente e valores acessiveis para a qualidade do trabalho."
  },
  {
    name: "Ana Rita Zanatta",
    rating: 5,
    comment: "Melhor atendimento, sorriso renovado e autoestima la em cima. Super recomendo."
  },
  {
    name: "Paulo Winter",
    rating: 5,
    comment: "Profissionais e auxiliares transmitem confianca e seguranca e finalizam com trabalho perfeito."
  },
  {
    name: "Lisete Debacker",
    rating: 5,
    comment: "Atendimento sempre excelente, com experiencia e seguranca em todos os procedimentos."
  },
  {
    name: "Marcelo Schossler",
    rating: 5,
    comment: "Excelente atendimento e higiene. Profissionais qualificados, dedicados e atenciosos."
  },
  {
    name: "Gilberto Dorneles Ebert",
    rating: 5,
    comment: "Otima experiencia na clinica. Tratamento de excelencia e equipe muito querida."
  },
  {
    name: "Felipe Strieder",
    rating: 5,
    comment: "Excelente atendimento e profissionais incriveis."
  }
];

const mockInstagram = [
  {
    url: "https://www.instagram.com/reel/C3Yfr7FONtr/",
    type: "reel",
    title: "Sorriso que nao aparece? Veja o post!"
  },
  {
    url: "https://www.instagram.com/reel/CqYl3UiAIkm/",
    type: "reel",
    title: "Invisible Aligner e discreto, confortavel e pratico. Veja o post!"
  },
  {
    url: "https://www.instagram.com/reel/DFGidWnyYJF/",
    type: "reel",
    title: "Transformacao com naturalidade e resultado previsivel. Veja o post!"
  },
  {
    url: "https://www.instagram.com/reel/DFyTIp0uo4K/",
    type: "reel",
    title: "A transformacao que voce sempre quis, sem meses de espera. O segredo esta na resina."
  }
];

const mockFacebook = [
  {
    title: "Novidade na clinica",
    text: "Agenda aberta para avaliacao estetica personalizada com foco em naturalidade.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80",
    date: "Atualizado recentemente",
    url: "https://www.facebook.com/brambattiodontologia/"
  },
  {
    title: "Dica de cuidado diario",
    text: "Pequenos habitos fazem diferenca na saude bucal e na durabilidade dos tratamentos.",
    image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=800&q=80",
    date: "Post institucional",
    url: "https://www.facebook.com/brambattiodontologia/"
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

function getInstagramType(url = "") {
  return url.includes("/reel/") ? "reel" : "post";
}

function getInstagramCode(url = "") {
  const match = url.match(/instagram\.com\/(?:p|reel)\/([^/?#]+)/i);
  return match ? match[1] : "instagram";
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
            <span class="rating" aria-label="Avaliacao ${rating} de 5">${stars(rating)}</span>
          </header>
          <p>${comment}</p>
        </article>
      `;
    })
    .join("");
}

async function loadReviews() {
  const status = document.getElementById("reviews-status");
  const endpoint = BRAMBATTI_CONFIG.googleReviewsEndpoint?.trim();

  if (!endpoint) {
    renderReviews(mockReviews);
    initImageFallbacks();
    return;
  }

  try {
    const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const reviews = Array.isArray(data) ? data : data.reviews;

    if (!Array.isArray(reviews) || !reviews.length) throw new Error("Sem avaliacoes");

    renderReviews(reviews);
    if (status) status.textContent = "Avaliacoes carregadas com sucesso da integracao configurada.";
    initImageFallbacks();
  } catch (error) {
    renderReviews(mockReviews);
    if (status) status.textContent = "Falha na integracao de avaliacoes. Exibindo conteudo mock.";
    initImageFallbacks();
    console.warn("Erro ao carregar avaliacoes:", error);
  }
}

function renderInstagram(items) {
  const grid = document.getElementById("instagram-grid");
  if (!grid) return;

  const safeItems = Array.isArray(items) ? items.slice(0, 8) : [];
  grid.innerHTML = safeItems
    .map((item) => {
      const rawUrl = typeof item === "string" ? item : item.url || item.permalink || "";
      const type = (item.type || getInstagramType(rawUrl)).toLowerCase() === "reel" ? "reel" : "post";
      const shortCode = getInstagramCode(rawUrl);
      const url = escapeHtml(rawUrl || "https://www.instagram.com/brambatti_odontologia/");
      const safeCode = escapeHtml(shortCode);
      const title = escapeHtml(item.title || "Abrir conteudo no Instagram");
      const label = type === "reel" ? "Reel" : "Post";
      return `
        <a class="instagram-link-card reveal is-visible" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Abrir ${label} ${safeCode} no Instagram">
          <span class="instagram-type ${type}">${label}</span>
          <h4 class="instagram-code">${safeCode}</h4>
          <p class="instagram-link-meta">${title}</p>
        </a>
      `;
    })
    .join("");
}

async function loadInstagram() {
  const status = document.getElementById("instagram-status");
  const endpoint = BRAMBATTI_CONFIG.instagramEndpoint?.trim();

  if (!endpoint) {
    renderInstagram(mockInstagram);
    if (status) status.textContent = "Exibindo apenas posts/reels da Brambatti Odontologia por permalinks publicos.";
    initImageFallbacks();
    return;
  }

  try {
    const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const posts = Array.isArray(data) ? data : data.posts;
    if (!Array.isArray(posts) || !posts.length) throw new Error("Sem posts");

    renderInstagram(posts);
    if (status) status.textContent = "Feed do Instagram carregado da integracao configurada.";
    initImageFallbacks();
  } catch (error) {
    renderInstagram(mockInstagram);
    if (status) status.textContent = "Falha na integracao da API. Exibindo permalinks publicos.";
    initImageFallbacks();
    console.warn("Erro ao carregar Instagram:", error);
  }
}

function renderFacebook(items) {
  const feed = document.getElementById("facebook-feed");
  if (!feed) return;

  const safeItems = Array.isArray(items) ? items.slice(0, 3) : [];
  feed.innerHTML = safeItems
    .map((post) => {
      const title = escapeHtml(post.title || "Destaque");
      const text = escapeHtml(post.text || "");
      const image = escapeHtml(post.image || "");
      const url = escapeHtml(post.url || "https://www.facebook.com/brambattiodontologia/");
      const date = escapeHtml(post.date || "Atualizado");

      return `
        <a href="${url}" class="facebook-card reveal is-visible" target="_blank" rel="noopener noreferrer">
          <img src="${image}" alt="${title}" loading="lazy">
          <div class="content">
            <h4>${title}</h4>
            <p>${text}</p>
            <time>${date}</time>
          </div>
        </a>
      `;
    })
    .join("");
}

async function loadFacebook() {
  const status = document.getElementById("facebook-status");
  const endpoint = BRAMBATTI_CONFIG.facebookEndpoint?.trim();

  if (!endpoint) {
    renderFacebook(mockFacebook);
    initImageFallbacks();
    return;
  }

  try {
    const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const posts = Array.isArray(data) ? data : data.posts;
    if (!Array.isArray(posts) || !posts.length) throw new Error("Sem posts");

    renderFacebook(posts);
    if (status) status.textContent = "Conteudo do Facebook carregado da integracao configurada.";
    initImageFallbacks();
  } catch (error) {
    renderFacebook(mockFacebook);
    if (status) status.textContent = "Falha na integracao do Facebook. Exibindo conteudo mock.";
    initImageFallbacks();
    console.warn("Erro ao carregar Facebook:", error);
  }
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
  loadReviews().then(initTiltEffects);
  loadInstagram();
  loadFacebook();
}

document.addEventListener("DOMContentLoaded", init);
