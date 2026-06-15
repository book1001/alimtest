let projectsData = [];
const loadedIndexes = new Set();
let activeIndex = 0;
let isClickLocked = false;

async function loadJson() {
  const data = await fetch("./work.json")
    .then(res => res.json());

  projectsData = data.Projects;
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

          const index = projectIndex;
          const id = project.Identifier;

          history.pushState(null, "", "#" + id);

          const container = document.querySelector("#projects-main");
          const target = document.querySelector(`.main[data-index="${index}"]`);

          if (!target) return;

          // ⭐ data-index 기준 마지막 계산
          const mains = Array.from(document.querySelectorAll(".main"));
          const maxIndex = Math.max(...mains.map(el => Number(el.dataset.index)));
          const isLast = index === maxIndex;

          // ⭐ 1. 전부 숨김
          document.querySelectorAll(".main").forEach(el => {
            el.style.display = "none";
          });

          // ⭐ 2. 해당 것만 표시
          target.style.display = "block";
          target.style.height = "100vh";

          // ⭐ 3. sub도 같이 맞추고 싶으면
          document.querySelectorAll(".sub").forEach(el => {
            el.style.display = "none";
          });

          const sub = document.querySelector(`.sub[data-index="${index}"]`);
          if (sub) sub.style.display = "block";

          // ⭐ 4. scroll 이동 (필요 시)
          requestAnimationFrame(() => {
            container.scrollTo({
              top: target.offsetTop,
              behavior: "smooth"
            });
          });

          document.querySelectorAll(".main").forEach(el => {
            el.style.display = "block";
          });

          if (!isLast) {
            target.style.minHeight = "auto";
          }
          
        });
        
        // atag.addEventListener("click", (e) => {
        //   e.preventDefault();

        //   const index = projectIndex;

        //   isClickLocked = true; // ⭐ 중요

        //   history.pushState(null, "", "#" + project.Identifier);

        //   setActive(index);

        //   const container = document.querySelector("#projects-main");
        //   const target = document.querySelector(`.main[data-index="${index}"]`);

        //   requestAnimationFrame(() => {
        //     container.scrollTo({
        //       top: target.offsetTop,
        //       behavior: "smooth"
        //     });
        //   });
        // });



        // atag.addEventListener("click", (e) => {
        //   e.preventDefault();

        //   const index = projectIndex;

        //   history.pushState(null, "", "#" + project.Identifier);

        //   setActive(index);

        //   const container = document.querySelector("#projects-main");
        //   const target = document.querySelector(`.main[data-index="${index}"]`);

        //   if (!target) return;

        //   // ⭐ 핵심: container 기준 스크롤 이동
        //   requestAnimationFrame(() => {
        //     container.scrollTo({
        //       top: target.offsetTop,
        //       behavior: "smooth"
        //     });
        //   });
        // });

        // const atag = document.createElement("a");
        // atag.href = "#" + project.Identifier;

        // atag.addEventListener("click", (e) => {
        //   e.preventDefault();

        //   const index = projectIndex;

        //   history.pushState(null, "", "#" + project.Identifier);

        //   setActive(index);
        // });

        // atag.addEventListener("click", (e) => {
        //   e.preventDefault();

        //   const index = projectIndex;
        //   const id = project.Identifier;

        //   preloadAround(index);

        //   history.pushState(null, "", "#" + id);

        //   const container = document.querySelector("#projects-main");

        //   // layout settle
        //   requestAnimationFrame(() => {
        //     requestAnimationFrame(() => {
        //       const target = document.getElementById(id);

        //       target.scrollIntoView({
        //         behavior: "smooth",
        //         block: "start"
        //       });

        //       updateActiveSub();
        //     });
        //   });
        // });

        // atag.addEventListener("click", (e) => {
        //   e.preventDefault();

        //   const container = document.querySelector("#projects-main");
        //   const target = document.getElementById(project.Identifier);

        //   history.pushState(null, "", "#" + project.Identifier);

        //   if (!target) return;

        //   // ⭐ 핵심: scrollIntoView로 통일
        //   target.scrollIntoView({
        //     behavior: "smooth",
        //     block: "start"
        //   });

        //   updateActiveSub();
        // });

        // atag.addEventListener("click", (e) => {
        //   e.preventDefault();

        //   history.pushState(
        //     null,
        //     "",
        //     "#" + project.Identifier
        //   );

        //   const target = document.querySelector(
        //     "#" + project.Identifier
        //   );

        //   target.scrollIntoView({
        //     behavior: "smooth",
        //     block: "start"
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

  setActive(0);

  const container = document.querySelector("#projects-main");

  container.addEventListener("scroll", () => {
    lazyLoadVisibleProjects();

    // ⭐ 사용자가 직접 스크롤하면 click lock 해제
    isClickLocked = false;

    // ⭐ click lock 상태일 때만 scroll active 막음
    if (!isClickLocked) {
      updateActiveSub();
    }
  });

  // ✔️ scroll spy + lazy load (여기가 4번 자리)
  // container.addEventListener("scroll", () => {
  //   lazyLoadVisibleProjects();
  //   updateActiveSub();
  // });

  updateActiveSub();

  document.querySelector("#close-projects").addEventListener("click", () => {
      document.querySelector("#c-thumbnails").classList.remove("active");
      document.querySelector("#c-projects").classList.remove("active");
  });

  const hash = location.hash.replace("#", "");

  if (hash) {

    const target = projectsData.findIndex(
      p => p.Identifier === hash
    );

    if (target >= 0) {

      preloadAround(target);

      // layout 강제 계산
      const container = document.querySelector("#projects-main");
      container.offsetHeight;

      requestAnimationFrame(() => {
        const target = document.getElementById(project.Identifier);

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        updateActiveSub();
      });

      // requestAnimationFrame(() => {

      //   const el = document.getElementById(hash);

      //   projectsMain.scrollTo({
      //     top: el.offsetTop
      //   });

      //   updateActiveSub();
      // });
    }
  }

});




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
  const container = document.querySelector("#projects-main");
  const mains = document.querySelectorAll(".main");
  const subs = document.querySelectorAll(".sub");

  subs.forEach(sub => sub.classList.remove("active"));

  const containerRect = container.getBoundingClientRect();

  let activeIndex = 0;

  mains.forEach((main, i) => {
    const rect = main.getBoundingClientRect();

    // ⭐ container 기준 offset
    if (rect.top - containerRect.top <= 50) {
      activeIndex = i;
    }
  });

  const activeMain = mains[activeIndex];
  if (!activeMain) return;

  const targetSub = document.querySelector(
    `.sub[data-index="${activeMain.dataset.index}"]`
  );

  if (targetSub) {
    targetSub.classList.add("active");
  }
}

// function updateActiveSub() {
//   const container = document.querySelector("#projects-main");

//   const mains = Array.from(document.querySelectorAll(".main"))
//     .filter(el => el.style.display !== "none");

//   const subs = document.querySelectorAll(".sub");

//   subs.forEach(sub => sub.classList.remove("active"));

//   if (mains.length === 0) return;

//   const containerRect = container.getBoundingClientRect();

//   let activeIndex = 0;

//   mains.forEach((main, i) => {
//     const rect = main.getBoundingClientRect();

//     // ⭐ container 기준으로 판단
//     if (rect.top - containerRect.top <= 100) {
//       activeIndex = i;
//     }
//   });

//   const activeMain = mains[activeIndex];
//   if (!activeMain) return;

//   const targetIndex = activeMain.dataset.index;

//   const targetSub = document.querySelector(
//     `.sub[data-index="${targetIndex}"]`
//   );

//   if (targetSub) {
//     targetSub.classList.add("active");
//   }
// }

// function updateActiveSub() {

//   const mains = Array.from(document.querySelectorAll(".main"))
//     .filter(el => el.style.display !== "none");

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




function loadProjectContent(index) {

  if (
    index < 0 ||
    index >= projectsData.length ||
    loadedIndexes.has(index)
  ) {
    return;
  }

  loadedIndexes.add(index);

  const project = projectsData[index];

  const card = document.querySelector(
    `.main[data-index="${index}"]`
  );

  const desc = document.querySelector(
    `.sub[data-index="${index}"]`
  );


  // -------------------------
  // TITLE
  // -------------------------

  if (project.Title) {

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("main-header");

    const title = document.createElement("h2");
    title.classList.add("header-title");
    title.textContent = project.Title;

    titleContainer.appendChild(title);

    card.appendChild(titleContainer);
  }

  // -------------------------
  // IMAGES
  // -------------------------

  if (project.Images) {

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("main-images");

    imageContainer.innerHTML =
      project.Images.join("");

    card.appendChild(imageContainer);
  }

  // -------------------------
  // DESCRIPTION
  // -------------------------

  if (project.Description) {

    desc.innerHTML =
      project.Description.join("");
  }
}


function preloadAround(index) {

  if (
    index < 0 ||
    index >= projectsData.length
  ) return;

  loadProjectContent(index);

  // loadProjectContent(index - 1);
  // loadProjectContent(index);
  // loadProjectContent(index + 1);
}


function lazyLoadVisibleProjects() {
  const container = document.querySelector("#projects-main");
  const mains = document.querySelectorAll(".main");

  const containerRect = container.getBoundingClientRect();

  mains.forEach(main => {
    const rect = main.getBoundingClientRect();

    const isVisible =
      rect.bottom > containerRect.top - 1000 &&
      rect.top < containerRect.bottom + 1000;

    if (isVisible) {
      // ✔️ 보이게 만들기
      main.classList.add("active");

      preloadAround(Number(main.dataset.index));
    }
  });
}

// function lazyLoadVisibleProjects() {
//   const container = document.querySelector("#projects-main");
//   const containerRect = container.getBoundingClientRect();

//   document.querySelectorAll(".main").forEach(main => {
//     const rect = main.getBoundingClientRect();

//     if (
//       rect.bottom > containerRect.top - 800 &&
//       rect.top < containerRect.bottom + 800
//     ) {
//       preloadAround(Number(main.dataset.index));
//     }
//   });
// }

// function lazyLoadVisibleProjects() {

//   const mains = document.querySelectorAll(".main");

//   mains.forEach(main => {

//     const rect = main.getBoundingClientRect();

//     if (
//       rect.bottom > -1000 &&
//       rect.top < window.innerHeight + 1000
//     ) {

//       preloadAround(
//         Number(main.dataset.index)
//       );
//     }
//   });
  
// }

// function setActive(index) {
//   activeIndex = index;

//   document.querySelectorAll(".main").forEach((el, i) => {
//     el.classList.toggle("active", i === index);
//   });

//   document.querySelectorAll(".sub").forEach((el, i) => {
//     el.classList.toggle("active", i === index);
//   });

//   preloadAround(index);
// }


function setActive(index) {
  activeIndex = index;

  const mains = document.querySelectorAll(".main");

  // ✔️ main: 한번 active되면 유지 (추가만)
  const main = mains[index];
  if (main) {
    main.classList.add("active");
  }

  document.querySelectorAll(".sub").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });

  preloadAround(index);
}

// function setActive(index) {
//   activeIndex = index;

//   const main = document.querySelector(`.main[data-index="${index}"]`);
//   const sub = document.querySelector(`.sub[data-index="${index}"]`);

//   if (!main || !sub) return;

//   // ✔️ 클릭 모드에서는 ONLY 하나만 active
//   document.querySelectorAll(".main").forEach(el => {
//     el.classList.remove("active");
//   });

//   document.querySelectorAll(".sub").forEach(el => {
//     el.classList.remove("active");
//   });

//   main.classList.add("active");
//   sub.classList.add("active");
// }