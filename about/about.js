async function loadJson() {
  const data = await fetch("./about.json")
  .then(res => res.json());

  const sheets = document.querySelector("#sheets");
  sheets.innerHTML = "";
  
  const fragment = document.createDocumentFragment();
  Object.entries(data).forEach(([objectName, items]) => {

    const sheet = document.createElement("div");
    sheet.classList.add("sheet");

    const sheetName = document.createElement("h3");
    sheetName.classList.add("sheet-name");
    sheetName.textContent = objectName;
    
    sheet.appendChild(sheetName);

    // ------------------------------------------------
    const list = document.createElement("div");
    list.classList.add("list");

    items.forEach(item => {

      const listItem = document.createElement("div");
      listItem.classList.add("list-item");

      const info = document.createElement("div");
      info.classList.add("info");

      // Col1: Year ------------------------------------------------
      if (item.Year) {
        const year = document.createElement("div");
        year.classList.add("year");
        year.innerHTML = `${item.Year}`;
        listItem.appendChild(year);
      }

      // Col1: Semeter ------------------------------------------------
      if (item.Semeter) {
        const semester = document.createElement("div");
        semester.classList.add("semester");
        semester.innerHTML = `${item.Semeter}`;
        listItem.appendChild(semester);
      }

      // Col2: Title + a --------------------------------------------
      const subs = [];
      if (item.Location) subs.push(item.Location);

      const title = item.Title || "";
      if (title) {
        let titleSelected = title;
        if (subs.length > 0) {
          titleSelected += ` — ${subs.join(" | ")}`;
        }
        
        info.innerHTML = titleSelected;
      }

      // Col2: Website ------------------------------------------------
      if (item.Website) {
        const website = document.createElement("a");
        website.classList.add("website");

        const url = item.Website.startsWith("http")
          ? item.Website
          : `https://${item.Website}`;
        website.href = url;
        website.target = "_blank";
        website.textContent = item.Website;
        info.appendChild(website);
      }

      // Append Item -----------------------------------------
      listItem.appendChild(info);
      list.appendChild(listItem);
      
    });

    sheet.appendChild(list);
    // ------------------------------------------------

    fragment.appendChild(sheet);
  });

  sheets.appendChild(fragment);
}


loadJson();