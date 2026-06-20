async function loadJson() {
  const data = await fetch("./work/work.json")
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
  const thumbnailCol = document.querySelector("#c-thumbnails");
  thumbnailCol.innerHTML = "";


  data.Projects.forEach((project, projectIndex) => {

    // A~E 단일값들 출력
    Object.entries(project).forEach(([objectName, value]) => {

      if (!value || value.toString().trim() === "") return;

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
        atag.href = "./work/#" + project.Identifier;

        const img = document.createElement("img");
        img.classList.add("thumbnail-img");
        img.src = "./work/img_thumbnail/" + value;

        atag.appendChild(img);
        categoryList.appendChild(atag);
        thumbnailCol.appendChild(categoryList);
      }

    });

  });
}

// loadJson();

loadJson().then(() => {

  // 🔥 필터 복원
  const savedFilter = localStorage.getItem("activeFilter");

  if (savedFilter && savedFilter !== "all") {
    filterSender("all");
  }

});

// loadJson().then(() => {

//   // 🔥 필터 복원
//   const savedFilter = localStorage.getItem("activeFilter");

//   if (savedFilter && savedFilter !== "all") {
//     filterSender(savedFilter);
//   }
  
// });



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
