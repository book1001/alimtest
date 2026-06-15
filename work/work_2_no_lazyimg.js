let projectStore = [];

// -------------------------
// IMAGE OBSERVER
// -------------------------
// const mainImageObserver = new IntersectionObserver((entries, observer) => {

//   entries.forEach(entry => {

//     if (!entry.isIntersecting) return;

//     const img = entry.target;

//     if (img.src) {
//       observer.unobserve(img);
//       return;
//     }

//     const src = img.dataset.src;
//     if (!src) return;

//     img.src = src;
//     img.classList.add("loaded");

//     observer.unobserve(img);
//   });

// }, {
//   root: document.querySelector("#projects-main"),
//   rootMargin: "400px"
// });


async function loadJson() {
  const data = await fetch("./work.json")
    .then(res => res.json());

  projectStore = data.Projects;
  
  
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
    
    items.forEach(item => {

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
          // mainImageObserver.observe(img);
        });
        projects.appendChild(card);

        // const title = document.createElement("div");
        // title.classList.add("main-images");
        // title.innerHTML = value.join("");
        // card.appendChild(title);
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
        desc.innerHTML = value.join("");
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

        const id = project.Identifier;
        const target = document.querySelector("#" + id);

        window.location.hash = id;

        // 1. 이미지 즉시 로딩 (layout freeze)
        forceLoadImages(target);

        // 2. UI open
        document.querySelector("#c-thumbnails").classList.add("active");
        document.querySelector("#c-projects").classList.add("active");

        // 3. scroll ONLY (DOM 변화 없이)
        document.querySelector("#projects-main").scrollTo({
          top: target.offsetTop,
          behavior: "smooth"
        });
        // requestAnimationFrame(() => {
        //   requestAnimationFrame(() => {

        //     target.scrollIntoView({
        //       behavior: "smooth",
        //       block: "start"
        //     });

        //   });
        // });


      });
      
        // atag.addEventListener("click", (e) => {
        //   e.preventDefault();
        //   document.querySelector("#c-thumbnails").classList.add("active");
        //   document.querySelector("#c-projects").classList.add("active");

        //   const target = document.querySelector(
        //     "#" + project.Identifier
        //   );

        //   const container = document.querySelector("#projects-main");
        //   container.scrollTo({
        //     top: target.offsetTop,
        //     behavior: "smooth"
        //   });

        //   updateActiveSub();

        // });

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


function preloadAroundIndex(activeIndex, range = 2) {

  const allCards = document.querySelectorAll(".main");

  allCards.forEach(card => {

    const idx = Number(card.dataset.index);

    if (Math.abs(idx - activeIndex) <= range) {

      const imgs = card.querySelectorAll("img[data-src]");

      imgs.forEach(img => {

        const src = img.dataset.src;
        if (!src) return;

        img.src = src;
        img.classList.add("loaded");

        img.removeAttribute("data-src");
      });

    }

  });
}


function forceLoadImages(target) {

  target.querySelectorAll("img").forEach(img => {

    // mainImageObserver.unobserve(img); // ⭐ 핵심

    const src = img.dataset.src;

    if (!src) return;

    img.src = src;
    img.classList.add("loaded");
  });
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

    const rect = main.getBoundingClientRect();

    if (rect.top <= 100) {
      activeIndex = index;
    }

  });

  const activeMain = mains[activeIndex];
  const targetIndex = Number(activeMain.dataset.index);

  const targetSub = document.querySelector(
    `.sub[data-index="${targetIndex}"]`
  );

  document.querySelectorAll(".sub").forEach(sub => {
    sub.classList.remove("active");
  });

  if (targetSub) {
    targetSub.classList.add("active");
  }

  // 🔥 핵심 추가: 앞뒤 이미지 preload
  preloadAroundIndex(targetIndex, 2);
}






// function updateActiveSub() {

//   const headers = document.querySelectorAll(".main-header");
//   const subs = document.querySelectorAll(".sub");

//   let activeIndex = 0;

//   headers.forEach((header, index) => {

//     const rect = header.getBoundingClientRect();

//     if (rect.top <= 100) {
//       activeIndex = index;
//     }

//   });

//   subs.forEach((sub, index) => {

//     if (index === activeIndex) {
//       sub.classList.add("active");
//     } else {
//       sub.classList.remove("active");
//     }

//   });

// }
