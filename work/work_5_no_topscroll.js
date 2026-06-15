let projectsData = [];
let loadedIndexes = new Set();
let ticking = false;

// -------------------------
// INIT
// -------------------------
async function loadJson() {
  const data = await fetch("./work.json").then(res => res.json());
  projectsData = data.Projects;

  const projects = document.querySelector("#projects-main");
  const descriptionCol = document.querySelector("#projects-sub");
  const thumbnailCol = document.querySelector("#c-thumbnails");

  projects.innerHTML = "";
  descriptionCol.innerHTML = "";
  thumbnailCol.innerHTML = "";

  // -------------------------
  // MAIN + SUB 생성 (DOM 유지)
  // -------------------------
  data.Projects.forEach((project, index) => {
    const card = document.createElement("div");
    card.classList.add("main");
    card.dataset.index = index;
    card.id = project.Identifier;

    const desc = document.createElement("div");
    desc.classList.add("sub");
    desc.dataset.index = index;

    projects.appendChild(card);
    descriptionCol.appendChild(desc);

    // -------------------------
    // THUMBNAIL 생성
    // -------------------------
    const thumbWrap = document.createElement("div");

    const a = document.createElement("a");
    a.href = "#" + project.Identifier;

    a.addEventListener("click", (e) => {
      e.preventDefault();

      const targetIndex = index;

      // URL sync
      history.pushState(null, "", "#" + project.Identifier);

      scrollToIndex(targetIndex);
    });

    const img = document.createElement("img");
    img.src = "./img_thumbnail/" + project.Thumbnail;
    img.classList.add("thumbnail-img");

    a.appendChild(img);
    thumbWrap.appendChild(a);
    thumbnailCol.appendChild(thumbWrap);
  });
}

// -------------------------
// ACTIVE INDEX (CENTER BASED)
// -------------------------
function getActiveIndex() {
  const container = document.querySelector("#projects-main");
  const mains = document.querySelectorAll(".main");

  const containerRect = container.getBoundingClientRect();
  const center = containerRect.top + containerRect.height / 2;

  let activeIndex = 0;
  let minDist = Infinity;

  mains.forEach(main => {
    const rect = main.getBoundingClientRect();
    const mainCenter = rect.top + rect.height / 2;

    const dist = Math.abs(mainCenter - center);

    if (dist < minDist) {
      minDist = dist;
      activeIndex = Number(main.dataset.index);
    }
  });

  return activeIndex;
}

// -------------------------
// RENDER WINDOW (±2)
// -------------------------
function renderWindow(activeIndex) {
  const mains = document.querySelectorAll(".main");

  const start = Math.max(0, activeIndex - 2);
  const end = activeIndex + 2;

  mains.forEach(main => {
    const i = Number(main.dataset.index);

    if (i >= start && i <= end) {
      main.style.display = "block";
      loadProjectContent(i);
    } else {
      main.style.display = "none";
    }
  });
}
// function renderWindow(activeIndex) {
//   const mains = document.querySelectorAll(".main");

//   const start = Math.max(0, activeIndex - 2);
//   const end = activeIndex + 2;

//   mains.forEach(main => {
//     const i = Number(main.dataset.index);

//     if (i >= start && i <= end) {
//       showMain(main, i);
//     }
//   });
// }

// -------------------------
// SHOW (NO HIDE LOGIC REMOVED)
// -------------------------
function showMain(el, index) {
  el.style.display = "block";
  loadProjectContent(index);
}

// -------------------------
// SCROLL ENGINE
// -------------------------
function initScroll() {
  const container = document.querySelector("#projects-main");

  container.addEventListener("scroll", () => {
    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {
      const activeIndex = getActiveIndex();

      renderWindow(activeIndex);
      preloadAround(activeIndex);

      ticking = false;
    });
  }, { passive: true });
}

// -------------------------
// CLICK NAV (THUMBNAIL)
// -------------------------
function scrollToIndex(index) {
  const container = document.querySelector("#projects-main");
  const mains = document.querySelectorAll(".main");

  // -------------------------
  // 1. 이전 데이터도 전부 로드
  // -------------------------
  for (let i = 0; i <= index + 2; i++) {
    loadProjectContent(i);
  }

  // -------------------------
  // 2. layout window 설정 (±2 or index 기준)
  // -------------------------
  mains.forEach(main => {
    const i = Number(main.dataset.index);

    if (i < index) {
      main.style.display = "none";
    } else if (i <= index + 2) {
      main.style.display = "block";
    } else {
      main.style.display = "none";
    }
  });

  // -------------------------
  // 3. scroll 정확 보정
  // -------------------------
  requestAnimationFrame(() => {
    const target = document.querySelector(`.main[data-index="${index}"]`);

    if (!target) return;

    container.scrollTo({
      top: target.offsetTop,
      behavior: "auto"
    });
  });
}

// function scrollToIndex(index) {
//   const container = document.querySelector("#projects-main");
//   const mains = document.querySelectorAll(".main");

//   // -------------------------
//   // 1. 이전 / 이후 분리
//   // -------------------------
//   mains.forEach(main => {
//     const i = Number(main.dataset.index);

//     // 이전 main → 숨김 (필수 요구사항)
//     if (i < index) {
//       main.style.display = "none";
//     } 
//     else {
//       main.style.display = "block";
//       loadProjectContent(i);
//     }
//   });

//   // -------------------------
//   // 2. layout 재계산 후 scroll 보정
//   // -------------------------
//   requestAnimationFrame(() => {
//     const target = document.querySelector(`.main[data-index="${index}"]`);
//     if (!target) return;

//     // ⭐ 핵심: scrollIntoView 쓰지 말고 offset 기준 고정
//     container.scrollTo({
//       top: target.offsetTop,
//       behavior: "auto"
//     });
//   });
// }
// function scrollToIndex(index) {
//   const container = document.querySelector("#projects-main");
//   const mains = document.querySelectorAll(".main");

//   const start = index;       // 이전 제거
//   const end = index + 2;     // +2 유지

//   // -------------------------
//   // 1. layout 재구성 (핵심)
//   // -------------------------
//   mains.forEach(main => {
//     const i = Number(main.dataset.index);

//     if (i < start) {
//       main.style.display = "none";
//     } else {
//       main.style.display = "block";
//     }
//   });

//   // -------------------------
//   // 2. 콘텐츠 보장
//   // -------------------------
//   preloadAround(index);

//   // -------------------------
//   // 3. scroll 안정화 (중요)
//   // -------------------------
//   requestAnimationFrame(() => {
//     const target = document.querySelector(`.main[data-index="${index}"]`);

//     if (!target) return;

//     container.scrollTo({
//       top: target.offsetTop,
//       behavior: "auto" // 👈 smooth 쓰면 또 흔들림
//     });
//   });
// }

// function scrollToIndex(index) {
//   const container = document.querySelector("#projects-main");
//   const target = document.querySelector(`.main[data-index="${index}"]`);

//   if (!target) return;

//   requestAnimationFrame(() => {
//     target.scrollIntoView({
//       behavior: "smooth",
//       block: "start"
//     });
//   });

//   // 즉시 render 보장
//   renderWindow(index);
//   preloadAround(index);
// }

// -------------------------
// PRELOAD
// -------------------------
function preloadAround(index) {
  loadProjectContent(index);
  loadProjectContent(index + 1);
  loadProjectContent(index - 1);
}

// -------------------------
// CONTENT LOAD (ONCE)
// -------------------------
function loadProjectContent(index) {
  if (index < 0 || index >= projectsData.length) return;
  if (loadedIndexes.has(index)) return;

  loadedIndexes.add(index);

  const project = projectsData[index];

  const card = document.querySelector(`.main[data-index="${index}"]`);
  const desc = document.querySelector(`.sub[data-index="${index}"]`);

  if (!card) return;

  // TITLE
  if (project.Title) {
    const title = document.createElement("h2");
    title.classList.add("main-header");
    title.textContent = project.Title;
    card.appendChild(title);
  }

  // IMAGES
  if (project.Images) {
    const img = document.createElement("div");
    img.classList.add("main-images");
    img.innerHTML = project.Images.join("");
    card.appendChild(img);
  }

  // DESCRIPTION
  if (project.Description && desc) {
    desc.innerHTML = project.Description.join("");
  }
}

// -------------------------
// BOOT
// -------------------------
loadJson().then(() => {
  initScroll();

  requestAnimationFrame(() => {
    renderWindow(0);
    preloadAround(0);
  });
});