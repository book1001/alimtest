// Filter: Add underline to the current button (Add active class)
var btnContainer = document.getElementById("filterUnderline");
var btns = btnContainer.getElementsByClassName("col1-btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");

    while(current.length != 0) {
      current[0].classList.remove("active");
    }
    for(var j = 0; j < btns.length; j++) {
      if(this.innerText == btns[j].innerText) {
        btns[j].classList.add("active");
      }
    }
  });
}



// Responsive layout: About

function openAbout() {
  var tabletStyle = window.matchMedia("(max-width: 800px)");
  if (tabletStyle.matches) { // ~ Tablet: 800px
    openAboutTablet()
  } else { // PC: 801px ~
    openAboutPC()
  }
}

function openAboutTablet() {
  document.getElementById("col2-0").style.display = "block";
  document.getElementById("col2-1").style.display = "none";
  document.getElementById("col2-2").style.display = "none";
  document.getElementById("col3").style.display = "none";
  document.getElementById("closeContents").style.display = "none";

  console.log($('body').scrollTop());
  $('body').scrollTop(1);
  $('body').scrollTop(0);
  console.log($('body').scrollTop());
}

function openAboutPC() {
  document.getElementById("col2-0").style.display = "block";
  document.getElementById("col2-1").style.display = "none";
  document.getElementById("col2-2").style.display = "none";

  console.log($('body').scrollTop());
  $('body').scrollTop(1);
  $('body').scrollTop(0);
  console.log($('body').scrollTop());
}



// Responsive layout: Thumbnail

function thumbnailSelection() {
  var tabletStyle = window.matchMedia("(max-width: 800px)");
  if (tabletStyle.matches) { // ~ Tablet: 800px
    thumbnailSelectionTablet()
  } else { // PC: 801px ~
    thumbnailSelectionPC()
  }
}

function thumbnailSelectionTablet() {
  document.getElementById("col2-0").style.display = "none";
  document.getElementById("col2-1").style.display = "none";
  document.getElementById("col2-2").style.display = "block";
  document.getElementById("col3").style.display = "none";
  document.getElementById("closeContents").style.display = "inline-block";

  console.log($('body').scrollTop());
  $('body').scrollTop(1);
  $('body').scrollTop(0);
  console.log($('body').scrollTop());
}

function thumbnailSelectionPC() {
  document.getElementById("col2-0").style.display = "none";
  document.getElementById("col2-1").style.display = "block";
  document.getElementById("col2-2").style.display = "block";

  console.log($('body').scrollTop());
  $('body').scrollTop(1);
  $('body').scrollTop(0);
  console.log($('body').scrollTop());
}



// Responsive layout: Shortcuts

function openShortcuts() {
  var tabletStyle = window.matchMedia("(max-width: 800px)");
  if (tabletStyle.matches) { // ~ Tablet: 800px
    openShortcutsTablet()
  } else { // PC: 801px ~
    openShortcutsPC()
  }
}

function openShortcutsTablet() {
  document.getElementById("col2-2").style.display = "none";
  document.getElementById("col3").style.display = "block";
  document.getElementById("closeContents").style.display = "none";
}

function openShortcutsPC() {
  document.getElementById("col2-2").style.display = "none";
  document.getElementById("col3").style.display = "block";
}



// About
// function openAbout() {
//   document.getElementById("col2-0").style.display = "block";
//   document.getElementById("col2-1").style.display = "none";
//   document.getElementById("col2-2").style.display = "none";
//
//   console.log($('body').scrollTop());
//   $('body').scrollTop(1);
//   $('body').scrollTop(0);
//   console.log($('body').scrollTop());
// }

// function thumbnailSelection() {
//   document.getElementById("col2-0").style.display = "none";
//   document.getElementById("col2-1").style.display = "block";
//   document.getElementById("col2-2").style.display = "block";
//   // document.getElementById("col2-1").style.display = "none";
//   // document.getElementById("col3").style.display = "none";
//
//   console.log($('body').scrollTop());
//   $('body').scrollTop(1);
//   $('body').scrollTop(0);
//   console.log($('body').scrollTop());
// }


// Shortcuts
// function openShortcuts() {
//   // document.getElementById("col2-0").style.display = "block";
//   // document.getElementById("col2-1").style.display = "none";
//   document.getElementById("col2-2").style.display = "none";
//
//   // console.log($('body').scrollTop());
//   // $('body').scrollTop(1);
//   // $('body').scrollTop(0);
//   // console.log($('body').scrollTop());
// }

//
// // About
// function openAbout() {
//   document.getElementById("col2-0").style.display = "block";
//   document.getElementById("col2-1").style.display = "none";
//   document.getElementById("col2-2").style.display = "none";
//
//   document.getElementById("col3").style.display = "none";
//
//   console.log($('body').scrollTop());
//   $('body').scrollTop(1);
//   $('body').scrollTop(0);
//   console.log($('body').scrollTop());
// }
//
// function thumbnailSelection() {
//   document.getElementById("col2-0").style.display = "none";
//   document.getElementById("col2-1").style.display = "none";
//   document.getElementById("col2-2").style.display = "block";
//   // document.getElementById("col2-1").style.display = "none";
//   document.getElementById("col3").style.display = "none";
//
//   console.log($('body').scrollTop());
//   $('body').scrollTop(1);
//   $('body').scrollTop(0);
//   console.log($('body').scrollTop());
// }
//
//
// // Shortcuts
// function openShortcuts() {
//   document.getElementById("col2-0").style.display = "none";
//   document.getElementById("col2-1").style.display = "none";
//   document.getElementById("col2-2").style.display = "none";
//   document.getElementById("col3").style.display = "block";
//
//   // console.log($('body').scrollTop());
//   // $('body').scrollTop(1);
//   // $('body').scrollTop(0);
//   // console.log($('body').scrollTop());
// }

// En Ko
function EnKo() {
  document.getElementById("Ko").style.display = "block";
  document.getElementById("En").style.display = "none";
}
