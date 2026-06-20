let projectImageObserver = null;

async function loadJson() {
  const data = await fetch("./work_kh.json")
    .then(res => res.json());

  // -------------------------
  // FILTER 렌더링
  // -------------------------
  const filter = document.querySelector("#c-filter");
  filter.innerHTML = "";

  // -------------------------
  // Show All
  // -------------------------
  const showAllBtn = document.createElement("button");
  showAllBtn.textContent = "Show All";
  showAllBtn.onclick = () => filterSender("all");

  filter.appendChild(showAllBtn);


  Object.entries(data.Filter).forEach(([objectName, items]) => {

    const list = document.createElement("div");
    if (objectName === "Category") {
      list.classList.add("filter-category");
    }
    if (objectName === "Year") {
      list.classList.add("filter-year");
    }
    
    // 🔥 Year일 때만 reverse
    const sortedItems = (objectName === "Year")
      ? [...items].reverse()
      : items;

    sortedItems.forEach(item => {

      const filterBtn = document.createElement("button");
      filterBtn.textContent = item;
      filterBtn.setAttribute("onclick", `filterSender('${item}')`);
      list.appendChild(filterBtn);
    });

    filter.appendChild(list);
  });

  // -------------------------
  // PROJECTS 렌더링
  // -------------------------
  const projects = document.querySelector("#projects-main");
  projects.innerHTML = "";

  const descriptionCol = document.querySelector("#projects-sub");
  descriptionCol.innerHTML = "";

  const thumbnailCol = document.querySelector("#c-thumbnails");
  thumbnailCol.innerHTML = "";


  data.Projects.forEach((project, projectIndex) => {

    const card = document.createElement("div");

    const categories = project.Category
      .split(",")
      .map(category =>
        category.trim().replace(/\s+/g, "_")
      );

    const years = project.Year
      .split(",")
      .map(year =>
        `${year.trim()}`
        // `Y${year.trim()}`
      );

    card.classList.add(
      "main",
      "filterReceiver",
      ...categories,
      ...years
    );
    card.dataset.index = projectIndex;
    card.id = project.Identifier;



    // A~E 단일값들 출력
    Object.entries(project).forEach(([objectName, value]) => {

      if (!value || value.toString().trim() === "") return;

      // -------------------------
      // TITLE
      // -------------------------
      if (objectName === "Title") {
        const titleContainer = document.createElement("div");
        titleContainer.classList.add("main-header");
        const title = document.createElement("h2");
        title.classList.add("header-title");
        title.textContent = value;
        titleContainer.appendChild(title);
        card.appendChild(titleContainer);
      }

      // -------------------------
      // Images
      // -------------------------
      if (objectName === "Images") {
        const title = document.createElement("div");
        title.classList.add("main-images");
        title.innerHTML = prepareLazyImages(value.join(""));
        card.appendChild(title);
      }

      // // -------------------------
      // // Bg
      // // -------------------------
      // if (objectName === "Bg") {
      //   card.style.backgroundColor = value;
      // }

      // // -------------------------
      // // Bg
      // // -------------------------
      // if (objectName === "Color") {
      //   card.style.color = value;
      // }


      // -------------------------
      // DESCRIPTION (HTML 허용)
      // -------------------------
      if (objectName === "Description") {

        const categories = project.Category
          .split(",")
          .map(category =>
            category.trim().replace(/\s+/g, "_")
          );

        const years = project.Year
          .split(",")
          .map(year =>
            `${year.trim()}`
            // `Y${year.trim()}`
          );

        const desc = document.createElement("div");
        desc.classList.add(
          "sub",
          "filterReceiver",
          ...categories,
          ...years
        );
        desc.dataset.index = projectIndex;
        desc.innerHTML = prepareLazyImages(value.join(""));
        // desc.style.color = project.Color;

        descriptionCol.appendChild(desc);
      }

      // -------------------------
      // Thumbnail
      // -------------------------
      if (objectName === "Thumbnail") {

        const categoryList = document.createElement("div");

        const categories = project.Category
          .split(",")
          .map(category =>
            category.trim().replace(/\s+/g, "_")
          );

        const years = project.Year
          .split(",")
          .map(year =>
            `${year.trim()}`
            // `Y${year.trim()}`
          );

        categoryList.classList.add(
          "thumbnail",
          "filterReceiver",
          ...categories,
          ...years
        );
      

        const atag = document.createElement("a");
        atag.href = "#" + project.Identifier;

        atag.addEventListener("click", (e) => {
          e.preventDefault();

          const url = new URL(window.location);

          const currentFilter = localStorage.getItem("activeFilter") || "all";

          let hash = "";

          // filter가 있을 때만 추가
          if (currentFilter && currentFilter !== "all") {
            hash += `filter=${currentFilter}&`;
          }
          // id는 항상 마지막
          // hash += `id=${project.Identifier}`;
          hash += `${project.Identifier}`;
          url.hash = hash;

          history.pushState(null, "", url);

          document.querySelector("#c-thumbnails").classList.add("active");
          document.querySelector("#c-projects").classList.add("active");

          const target = document.querySelector("#" + project.Identifier);

          loadImagesIn(target);

          const container = document.querySelector("#projects-main");

          container.scrollTo({
            top: target.offsetTop,
            behavior: "smooth"
          });

          updateActiveSub();
        });


        const img = document.createElement("img");
        img.classList.add("thumbnail-img");
        img.src = "./img_thumbnail/" + value;

        atag.appendChild(img);
        categoryList.appendChild(atag);
        thumbnailCol.appendChild(categoryList);
      }

    });

    projects.appendChild(card);
  });

  initProjectImageObserver();
}

// loadJson();



loadJson().then(() => {

  const projectsMain = document.querySelector("#projects-main");
  projectsMain.addEventListener("scroll", updateActiveSub);

  updateActiveSub();

  const savedFilter = localStorage.getItem("activeFilter");

  if (savedFilter && savedFilter !== "all") {
    filterSender(savedFilter);
  }

  goToHash();
  window.addEventListener("hashchange", goToHash);

});


function prepareLazyImages(html) {

  return html.replace(
    /<img\b([^>]*?)\s+src=(["'])(.*?)\2/gi,
    (match, attrs, quote, src) => {
      if (/\sdata-src=/i.test(attrs)) return match;
      return `<img${attrs} data-src=${quote}${src}${quote}`;
    }
  );
}

function initProjectImageObserver() {

  const container = document.querySelector("#projects-main");

  if (!window.IntersectionObserver) {
    document.querySelectorAll(".main-images").forEach(loadImagesIn);
    return;
  }

  if (projectImageObserver) {
    projectImageObserver.disconnect();
  }

  projectImageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      loadImagesIn(entry.target);
      projectImageObserver.unobserve(entry.target);
    });
  }, {
    root: container,
    rootMargin: "800px 0px"
  });

  document.querySelectorAll(".main").forEach((project, index) => {
    projectImageObserver.observe(project);

    if (index < 2) {
      loadImagesIn(project);
      projectImageObserver.unobserve(project);
    }
  });
}

function loadImagesIn(container) {

  if (!container) return;

  container.querySelectorAll("img[data-src]").forEach(img => {
    img.src = img.dataset.src;
    img.removeAttribute("data-src");
  });
}


function filterSender(filterName) {

  localStorage.setItem("activeFilter", filterName);

  const url = new URL(window.location);

  // 🔥 현재 id 유지
  const { id } = parseHashParams();

  // 필터 없음 + id만 있음
  if (filterName === "all") {

    if (id) {
      url.hash = id;          // #FrozenIslandLive
    } else {
      url.hash = "";
    }

  } else {

    const params = new URLSearchParams();

    params.set("filter", filterName);

    if (id) {
      params.set("id", id);
    }

    url.hash = params.toString();
  }

  history.replaceState(null, "", url);

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



function parseHashParams() {
  const hash = window.location.hash.replace("#", "");

  // #BarcodeBand 지원
  if (
    hash &&
    !hash.includes("=") &&
    !hash.includes("&")
  ) {
    return {
      filter: null,
      id: hash
    };
  }

  const params = new URLSearchParams(hash);

  return {
    filter: params.get("filter"),
    id: params.get("id")
  };
}


function updateActiveSub() {

  const mains = document.querySelectorAll(
    ".main:not([style*='display: none'])"
  );

  const subs = document.querySelectorAll(".sub");

  // 전부 숨김
  subs.forEach(sub => {
    sub.classList.remove("active");
  });

  if (mains.length === 0) return;

  let activeIndex = 0;

  mains.forEach((main, index) => {

    const rect = main.getBoundingClientRect();

    if (rect.top <= 100) {
      activeIndex = index;
    }

  });

  const activeMain = mains[activeIndex];

  const targetIndex = activeMain.dataset.index;

  const targetSub = document.querySelector(
    `.sub[data-index="${targetIndex}"]`
  );

  if (targetSub) {
    targetSub.classList.add("active");
    loadImagesIn(targetSub);
  }

}


function goToHash() {
  const { filter, id } = parseHashParams();

  const activeFilter =
    filter || localStorage.getItem("activeFilter") || "all";

  filterSender(activeFilter);

  if (!id) return;

  const target = document.getElementById(id);
  if (!target) return;

  document.querySelector("#c-thumbnails").classList.add("active");
  document.querySelector("#c-projects").classList.add("active");

  loadImagesIn(target);

  requestAnimationFrame(() => {
    document.querySelector("#projects-main")
      .scrollTo({
        top: target.offsetTop,
        behavior: "auto"
      });
  });

  updateActiveSub();
}
