const iconMap = {
  expert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l8 4v6c0 4-3.4 7.4-8 8-4.6-.6-8-4-8-8V7l8-4z"/><path d="M9 12l2 2 4-5"/></svg>`,
  certificate: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12v16l-6-3-6 3V4z"/><path d="M9 8h6M9 12h6"/></svg>`,
  hybrid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>`
};

const courses = [
  {
    slug: "fire-life-safety",
    level: "Red Helmet Engineering",
    title: "Fire & Life Safety",
    instructor: "Professional Fire Protection Consultants",
    description: "Learn how to apply NFPA 101 and IBC requirements across occupancy classification, egress design, fire department access, fire ratings, and hazardous materials.",
    price: "Request price",
    hours: "30 Hours",
    mode: "Online / In-person",
    date: "June 16, 2026",
    learn: ["Determine occupancy and use group classifications", "Design safe means of egress and evacuation paths", "Evaluate active and passive fire protection requirements"]
  },
  {
    slug: "fire-protection-systems",
    level: "Red Helmet Engineering",
    title: "Fire Protection Systems",
    instructor: "Fire Suppression Systems Specialists",
    description: "A practical design course covering fire extinguishers, sprinklers, standpipes, fire pumps, water tanks, and underground piping through core NFPA standards.",
    price: "Request price",
    hours: "30 Hours",
    mode: "Online / In-person",
    date: "June 23, 2026",
    learn: ["Select proper suppression systems by building type", "Apply NFPA 10, 13, 14, 20, 22, and 24", "Assess existing system changes and water supply impact"]
  },
  {
    slug: "smoke-control-system",
    level: "Red Helmet Engineering",
    title: "Smoke Control System Design",
    instructor: "Smoke Control Engineers",
    description: "Design systems that manage smoke movement, protect escape routes, support firefighting operations, and align with NFPA 92 and engineering handbook guidance.",
    price: "Request price",
    hours: "14 Hours",
    mode: "Live Online",
    date: "July 07, 2026",
    learn: ["Choose exhaust, dilution, or pressurization strategies", "Calculate exhaust rates, make-up air, and fan sizing", "Analyze fire size, temperature, and architectural effects"]
  },
  {
    slug: "cfd-smoke-modeling",
    level: "Advanced Simulation",
    title: "CFD Analysis for Smoke Control",
    instructor: "FDS and PyroSim Training Team",
    description: "Hands-on CFD training for complex spaces such as atriums and car parks using FDS and PyroSim to validate performance-based smoke control designs.",
    price: "Request price",
    hours: "14 Hours",
    mode: "Live Online",
    date: "July 14, 2026",
    learn: ["Understand zone models versus detailed CFD models", "Set up fire simulations in PyroSim with FDS", "Interpret visibility, temperature, and flow-rate outputs"]
  },
  {
    slug: "nfpa-life-safety-code",
    level: "NFPA Instructor-Led",
    title: "NFPA 101 Life Safety Code Essentials",
    instructor: "NFPA-approved Instructor",
    description: "Official instructor-led training option for applying Life Safety Code essentials across building and life safety scenarios.",
    price: "Request price",
    hours: "21 Hours",
    mode: "Live Online",
    date: "August 04, 2026",
    learn: ["Navigate core NFPA 101 requirements", "Apply life safety provisions to real projects", "Earn an NFPA training certificate where applicable"]
  },
  {
    slug: "nfpa-fire-alarm",
    level: "NFPA Instructor-Led",
    title: "NFPA 72 Fire Alarm & Signaling",
    instructor: "NFPA-approved Instructor",
    description: "Instructor-led training for fire alarm and signaling systems, including code interpretation and practical system compliance concepts.",
    price: "Request price",
    hours: "21 Hours",
    mode: "Live Online",
    date: "August 18, 2026",
    learn: ["Understand NFPA 72 system requirements", "Improve alarm and signaling design decisions", "Prepare for professional code application"]
  }
];

const app = document.querySelector("#app");
const modal = document.querySelector("#preview-modal");
const cursorGlow = document.querySelector(".cursor-glow");
let selectedCourse = courses[0];

function route() {
  const path = window.location.pathname;
  if (path.startsWith("/course/")) {
    selectedCourse = courses.find((course) => `/course/${course.slug}` === path) || courses[0];
    renderCourse(selectedCourse);
    return;
  }
  if (path.startsWith("/checkout/")) {
    selectedCourse = courses.find((course) => `/checkout/${course.slug}` === path) || selectedCourse;
    renderCheckout(selectedCourse);
    return;
  }
  if (path === "/success") {
    renderSuccess();
    return;
  }
  renderHome();
  if (window.location.hash) {
    requestAnimationFrame(() => {
      document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "smooth" });
    });
  }
}

function navigate(path) {
  history.pushState({}, "", path);
  route();
  if (!path.includes("#")) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function cloneTemplate(id) {
  const template = document.querySelector(id);
  app.replaceChildren(template.content.cloneNode(true));
}

function renderHome() {
  cloneTemplate("#home-template");
  renderIcons();
  renderCourses();
  renderSchedule();
  activatePage();
}

function renderCourses() {
  const grid = document.querySelector("#course-grid");
  courses.forEach((course, index) => {
    const card = document.createElement("article");
    card.className = "course-card reveal";
    card.style.transitionDelay = `${index * 70}ms`;
    card.innerHTML = `
      <a class="course-link" href="/course/${course.slug}" data-route aria-label="Open ${course.title}">
        <div class="course-media">
          <span>${course.level}</span>
          <img src="/assets/red-helmet-flame.png" alt="" />
        </div>
        <div class="course-body">
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <div class="course-facts">
            <span>${course.hours}</span>
            <span>${course.mode}</span>
            <span>${course.date}</span>
          </div>
          <div class="course-footer">
            <strong>${course.price}</strong>
            <span class="button secondary">Details</span>
          </div>
        </div>
      </a>
    `;
    card.addEventListener("pointermove", tiltCard);
    card.addEventListener("pointerleave", resetTilt);
    grid.appendChild(card);
  });
}

function renderSchedule() {
  const list = document.querySelector("#schedule-list");
  courses.slice(0, 5).forEach((course) => {
    const row = document.createElement("div");
    row.className = "table-row";
    row.setAttribute("role", "row");
    row.innerHTML = `
      <strong>${course.title}</strong>
      <span>${course.date}</span>
      <span>${course.mode}</span>
      <span>${course.hours.replace(" Hours", "h")}</span>
      <a class="status-pill" href="/course/${course.slug}" data-route>Book</a>
    `;
    list.appendChild(row);
  });
}

function renderCourse(course) {
  cloneTemplate("#course-template");
  document.querySelector("[data-course-level]").textContent = course.level;
  document.querySelector("[data-course-title]").textContent = course.title;
  document.querySelector("[data-course-instructor]").textContent = course.instructor;
  document.querySelector("[data-course-description]").textContent = course.description;
  document.querySelector("[data-course-price]").textContent = course.price;
  document.querySelector("[data-course-hours]").textContent = course.hours;
  document.querySelector("[data-course-mode]").textContent = course.mode;
  document.querySelector("[data-course-date]").textContent = course.date;
  const list = document.querySelector("[data-course-learn]");
  course.learn.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "reveal";
    li.style.transitionDelay = `${index * 90}ms`;
    li.textContent = item;
    list.appendChild(li);
  });
  document.querySelector("[data-book]").addEventListener("click", () => navigate(`/checkout/${course.slug}`));
  activatePage();
}

function renderCheckout(course) {
  cloneTemplate("#checkout-template");
  renderIcons();
  document.querySelector("[data-checkout-title]").textContent = course.title;
  document.querySelector("[data-checkout-price]").textContent = course.price;
  document.querySelector("[data-checkout-meta]").textContent = `${course.date} · ${course.mode} · ${course.hours}`;
  document.querySelector("#checkout-form").addEventListener("submit", (event) => {
    event.preventDefault();
    navigate("/success");
  });
  activatePage();
}

function renderSuccess() {
  cloneTemplate("#success-template");
  activatePage();
}

function activatePage() {
  bindRoutes();
  bindPreview();
  revealOnScroll();
}

function bindRoutes() {
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const url = new URL(link.href);
      if (url.origin === window.location.origin) {
        event.preventDefault();
        navigate(url.pathname + url.hash);
      }
    });
  });
}

function bindPreview() {
  document.querySelectorAll("[data-open-preview]").forEach((button) => {
    button.addEventListener("click", () => {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
    });
  });
}

function renderIcons() {
  document.querySelectorAll("[data-icon]").forEach((icon) => {
    icon.innerHTML = iconMap[icon.dataset.icon] || "";
  });
}

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function tiltCard(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  event.currentTarget.style.transform = `rotateX(${y * -5}deg) rotateY(${x * 7}deg) translateY(-6px)`;
}

function resetTilt(event) {
  event.currentTarget.style.transform = "";
}

document.addEventListener("pointermove", (event) => {
  cursorGlow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate3d(-50%, -50%, 0)`;
});

document.querySelectorAll("[data-close-preview]").forEach((element) => {
  element.addEventListener("click", () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  });
});

window.addEventListener("popstate", route);
route();

function startEmbers() {
  const canvas = document.querySelector("#ember-canvas");
  const ctx = canvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let particles = [];

  function resize() {
    width = canvas.width = Math.floor(window.innerWidth * Math.min(window.devicePixelRatio, 1.5));
    height = canvas.height = Math.floor(window.innerHeight * Math.min(window.devicePixelRatio, 1.5));
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const count = window.innerWidth < 760 ? 36 : 72;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 3,
      speed: 0.18 + Math.random() * 0.48,
      drift: -0.3 + Math.random() * 0.6,
      alpha: 0.16 + Math.random() * 0.34
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((particle) => {
      const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.r * 7);
      gradient.addColorStop(0, `rgba(255,112,67,${particle.alpha})`);
      gradient.addColorStop(0.45, `rgba(229,57,53,${particle.alpha * 0.45})`);
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.r * 7, 0, Math.PI * 2);
      ctx.fill();
      particle.y -= particle.speed;
      particle.x += particle.drift;
      if (particle.y < -30) {
        particle.y = height + 30;
        particle.x = Math.random() * width;
      }
    });
    if (!reducedMotion) requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}

startEmbers();
