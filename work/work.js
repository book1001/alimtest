let projectStore = [];

// -------------------------
// IMAGE OBSERVER
// -------------------------
const mainImageObserver = new IntersectionObserver((entries, observer) => {

  entries.forEach(entry => {

    if (!entry.isIntersecting) return;

    const img = entry.target;

    if (img.src) {
      observer.unobserve(img);
      return;
    }

    const src = img.dataset.src;
    if (!src) return;

    img.src = src;
    img.classList.add("loaded");

    observer.unobserve(img);
  });

}, {
  root: document.querySelector("#projects-main"),
  rootMargin: "400px"
});

// const mainImageObserver = new IntersectionObserver((entries, observer) => {

//   entries.forEach(entry => {

//     if (!entry.isIntersecting) return;

//     const img = entry.target;

//     img.src = img.dataset.src;

//     img.onload = () => {
//       img.classList.add("loaded");
//     };

//     img.removeAttribute("data-src");
//     observer.unobserve(img);
//   });

// }, {
//   root: document.querySelector("#projects-main"),
//   // rootMargin: "150px",
//   // threshold: 0.1
//   rootMargin: "400px"
// });


// -------------------------
// LOAD JSON
// -------------------------
async function loadJson() {

  const data = await fetch("./work.json")
    .then(res => res.json());

  projectStore = data.Projects;

  // -------------------------
  // FILTER
  // -------------------------
  const filter = document.querySelector("#c-filter");
  filter.innerHTML = "";

  const showAllBtn = document.createElement("button");
  showAllBtn.textContent = "Show All";
  showAllBtn.onclick = () => filterSender("all");
  filter.appendChild(showAllBtn);

  Object.entries(data.Filter).forEach(([objectName, items]) => {

    const list = document.createElement("div");

    if (objectName === "Category") list.classList.add("filter-category");
    if (objectName === "Year") list.classList.add("filter-year");

    items.forEach(item => {
      const btn = document.createElement("button");
      btn.textContent = item;
      btn.onclick = () => filterSender(item);
      list.appendChild(btn);
    });

    filter.appendChild(list);
  });

  // -------------------------
  // MAIN + THUMBNAIL
  // -------------------------
  const projects = document.querySelector("#projects-main");
  const thumbnailCol = document.querySelector("#c-thumbnails");

  projects.innerHTML = "";
  thumbnailCol.innerHTML = "";

  projectStore.forEach((project, projectIndex) => {

    const card = document.createElement("div");

    const categories = project.Category
      .split(",")
      .map(c => c.trim().replace(/\s+/g, "_"));

    const years = project.Year
      .split(",")
      .map(y => y.trim());

    card.classList.add(
      "main",
      "filterReceiver",
      ...categories,
      ...years
    );

    card.dataset.index = projectIndex;
    card.id = project.Identifier.replace("#", "");

    // -------------------------
    // TITLE
    // -------------------------
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("main-header");

    const title = document.createElement("h2");
    title.classList.add("header-title");
    title.textContent = project.Title;

    titleContainer.appendChild(title);
    card.appendChild(titleContainer);

    // -------------------------
    // IMAGES (LAZY)
    // -------------------------
    const imagesWrap = document.createElement("div");
    imagesWrap.classList.add("main-images");

    // HTML 구조 그대로 유지
    imagesWrap.innerHTML = project.Images
      ? project.Images.join("")
      : "";

    // append 먼저
    card.appendChild(imagesWrap);


    const imgs = imagesWrap.querySelectorAll("img");

    imgs.forEach(img => {

      const src = img.getAttribute("src");

      if (!src) return;

      // 즉시 로딩 방지
      img.removeAttribute("src");
      img.dataset.src = src;

      // observer 등록
      mainImageObserver.observe(img);
    });

    // const imagesWrap = document.createElement("div");
    // imagesWrap.classList.add("main-images");

    // if (project.Images && project.Images.length > 0) {

    //   project.Images.forEach(htmlString => {

    //     const wrapper = document.createElement("div");

    //     const img = document.createElement("img");
    //     img.classList.add("lazy-main-img");

    //     img.dataset.src = extractSrc(htmlString);

    //     img.src = ""; // 핵심: 즉시 로딩 방지

    //     mainImageObserver.observe(img);

    //     wrapper.appendChild(img);
    //     imagesWrap.appendChild(wrapper);
    //   });
    // }

    // card.appendChild(imagesWrap);
    projects.appendChild(card);

    // -------------------------
    // THUMBNAIL
    // -------------------------
    const thumbWrap = document.createElement("div");

    thumbWrap.classList.add(
      "thumbnail",
      "filterReceiver",
      ...categories,
      ...years
    );

    const atag = document.createElement("a");
    atag.href = "#" + project.Identifier;

    const img = document.createElement("img");
    img.classList.add("thumbnail-img");
    img.src = "./img_thumbnail/" + project.Thumbnail;

    atag.appendChild(img);
    thumbWrap.appendChild(atag);
    thumbnailCol.appendChild(thumbWrap);

    // -------------------------
    // CLICK
    // -------------------------

    atag.addEventListener("click", (e) => {

      e.preventDefault();

      const id = project.Identifier;
      const target = document.querySelector("#" + id);

      window.location.hash = id;

      // 1. 이미지 즉시 로딩 (layout freeze)
      forceLoadImages(target);

      // 2. UI open
      document.querySelector("#c-thumbnails").classList.add("active");
      document.querySelector("#c-projects").classList.add("active");

      // 3. scroll ONLY (DOM 변화 없이)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        });
      });

      // 4. sub는 scroll 이후
      setTimeout(() => {
        renderSub(projectIndex);
      }, 300);
    });

    
    // atag.addEventListener("click", (e) => {

    //   e.preventDefault();

    //   const id = project.Identifier;
    //   const target = document.querySelector("#" + id);

    //   window.location.hash = id;

    //   // 1. 이미지 먼저 고정
    //   forceLoadImages(target);

    //   // 2. UI open
    //   document.querySelector("#c-thumbnails").classList.add("active");
    //   document.querySelector("#c-projects").classList.add("active");

    //   // 3. layout 안정화 후 scroll
    //   requestAnimationFrame(() => {
    //     requestAnimationFrame(() => {
    //       target.scrollIntoView({
    //         behavior: "smooth",
    //         block: "start"
    //       });
    //     });
    //   });

    //   // 4. sub render 약간 delay
    //   setTimeout(() => {
    //     renderSub(projectIndex);
    //   }, 100);
    // });

    // atag.addEventListener("click", (e) => {

    //   e.preventDefault();

    //   const id = project.Identifier;

    //   const target = document.querySelector("#" + id);

    //   // 🔥 1. URL hash 업데이트 (중요)
    //   window.location.hash = id;

    //   // 🔥 2. 이미지 즉시 로딩 (핵심 해결)
    //   forceLoadImages(target);

    //   // UI open
    //   document.querySelector("#c-thumbnails").classList.add("active");
    //   document.querySelector("#c-projects").classList.add("active");

    //   // scroll (안정 버전)
    //   target.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start"
    //   });

    //   renderSub(projectIndex);
    // });



    // atag.addEventListener("click", (e) => {

    //   e.preventDefault();

    //   document.querySelector("#c-thumbnails")
    //     .classList.add("active");

    //   document.querySelector("#c-projects")
    //     .classList.add("active");

    //   const target = document.querySelector(
    //     "#" + project.Identifier.replace("#", "")
    //   );

    //   document.querySelector("#projects-main").scrollTo({
    //     top: target.offsetTop,
    //     behavior: "smooth"
    //   });

    //   renderSub(projectIndex);
    // });

  });

  // -------------------------
  // INIT
  // -------------------------
  const container = document.querySelector("#projects-main");

  container.addEventListener("scroll", updateActiveSub);
  updateActiveSub();

  document.querySelector("#close-projects")
    .addEventListener("click", () => {

      document.querySelector("#c-thumbnails")
        .classList.remove("active");

      document.querySelector("#c-projects")
        .classList.remove("active");

    });
}

// loadJson();

loadJson().then(() => {

  const projectsMain = document.querySelector("#projects-main");
  projectsMain.addEventListener("scroll", updateActiveSub);
  updateActiveSub();

  document.querySelector("#close-projects").addEventListener("click", () => {
      document.querySelector("#c-thumbnails").classList.remove("active");
      document.querySelector("#c-projects").classList.remove("active");
  });

});


function extractSrc(htmlString) {
  const match = htmlString.match(/src=["'](.*?)["']/);
  return match ? match[1] : "";
}

function forceLoadImages(target) {

  const imgs = target.querySelectorAll("img");

  imgs.forEach(img => {

    const src = img.dataset.src || img.src;
    if (!src) return;

    // ❗ scroll 안정화 핵심
    img.style.minHeight = img.height ? img.height + "px" : "300px";

    img.src = src;
    img.removeAttribute("data-src");
  });
}

// function forceLoadImages(target) {

//   target.querySelectorAll("img").forEach(img => {

//     const src = img.dataset.src || img.src;
//     if (!src) return;

//     img.src = src;
//     img.removeAttribute("data-src");

//     // 🔥 중요: height 흔들림 방지
//     img.style.minHeight = "300px";
//   });
// }

// function forceLoadImages(target) {

//   target.querySelectorAll("img").forEach(img => {

//     mainImageObserver.unobserve(img); // ⭐ 핵심

//     const src = img.dataset.src;

//     if (!src) return;

//     img.src = src;
//     img.classList.add("loaded");
//   });
// }

// function forceLoadImages(target) {

//   target.querySelectorAll("img").forEach(img => {

//     mainImageObserver.unobserve(img); // ⭐ 핵심

//     const src = img.dataset.src;

//     if (!src) return;

//     img.src = src;
//     img.classList.add("loaded");
//   });
// }

// function forceLoadImages(target) {

//   target.querySelectorAll("img").forEach(img => {

//     const src = img.dataset.src || img.getAttribute("src");

//     if (!src) return;

//     img.src = src;
//     img.removeAttribute("data-src");

//     img.onload = () => img.classList.add("loaded");
//   });
// }

// function forceLoadImages(target) {

//   const imgs = target.querySelectorAll("img[data-src]");

//   imgs.forEach(img => {

//     img.src = img.dataset.src;
//     img.removeAttribute("data-src");

//     img.onload = () => {
//       img.classList.add("loaded");
//     };
//   });
// }


function renderSub(index) {

  const container = document.querySelector("#projects-sub");
  container.innerHTML = "";

  const project = projectStore[index];

  const desc = document.createElement("div");
  desc.classList.add("sub", "active");
  desc.dataset.index = index;

  desc.innerHTML = project.Description
    ? project.Description.join("")
    : "";

  container.appendChild(desc);
}


// function filterSender(filterName) {

//   const receivers = document.querySelectorAll(".filterReceiver");

//   // Show All
//   if (filterName === "all") {

//     receivers.forEach(receiver => {
//       receiver.style.display = "";
//     });

//     return;
//   }

//   receivers.forEach(receiver => {

//     if (receiver.classList.contains(filterName)) {
//       receiver.style.display = "";
//     } else {
//       receiver.style.display = "none";
//     }

//   });

// }

function filterSender(filterName) {

  const receivers = document.querySelectorAll(".filterReceiver");

  receivers.forEach(receiver => {

    if (
      filterName === "all" ||
      receiver.classList.contains(filterName)
    ) {
      receiver.style.display = "";
    } else {
      receiver.style.display = "none";
    }

  });

  updateActiveSub();
}


function updateActiveSub() {

  const mains = document.querySelectorAll(
    ".main:not([style*='display: none'])"
  );

  if (mains.length === 0) return;

  let activeIndex = 0;

  mains.forEach((main, index) => {

    if (main.getBoundingClientRect().top <= 100) {
      activeIndex = index;
    }

  });

  renderSub(activeIndex);
}

// function updateActiveSub() {

//   const mains = document.querySelectorAll(
//     ".main:not([style*='display: none'])"
//   );

//   const subs = document.querySelectorAll(".sub");

//   // 전부 숨김
//   subs.forEach(sub => {
//     sub.classList.remove("active");
//   });

//   if (mains.length === 0) return;

//   let activeIndex = 0;

//   mains.forEach((main, index) => {

//     const rect = main.getBoundingClientRect();

//     if (rect.top <= 100) {
//       activeIndex = index;
//     }

//   });

//   const activeMain = mains[activeIndex];

//   const targetIndex = activeMain.dataset.index;

//   const targetSub = document.querySelector(
//     `.sub[data-index="${targetIndex}"]`
//   );

//   if (targetSub) {
//     targetSub.classList.add("active");
//   }

// }




