async function loadJson() {
  const data = await fetch("./work.json")
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
        const title = document.createElement("div");
        title.classList.add("main-images");
        title.innerHTML = value.join("");
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
          document.querySelector("#c-thumbnails").classList.add("active");
          document.querySelector("#c-projects").classList.add("active");

          const target = document.querySelector(
            "#" + project.Identifier
          );

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
  }

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