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


// Masonry
var $grid = $('.thumbnail-view').masonry({
  itemSelector: '.thumbnail-view-item',
  horizontalOrder: true,
  columnWidth: '.thumbnail-view-sizer',
  percentPosition: true,
});
// layout Masonry after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry('layout');
});

$(window).on( 'load', function() {
  $grid.masonry('layout');
});


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
  document.getElementById("col3").style.display = "block";
  document.getElementById("closeContents").style.display = "none";

  console.log($('body').scrollTop());
  $('body').scrollTop(1);
  $('body').scrollTop(0);
  console.log($('body').scrollTop());
}



// Responsive layout: Details

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
  document.getElementById("col3").style.display = "block";
  document.getElementById("closeContents").style.display = "none";

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
  document.getElementById("closeContents").style.display = "none";
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


// var isTablet = false;
// var isPC = false;
// function openAbout() {
//   var tabletStyle = window.matchMedia("(max-width: 800px)");
//   if (tabletStyle.matches) { // ~ Tablet: 800px
//     if(!isTablet) {
//       openAboutTablet();
//       isTablet = true;
//       isPC = false;
//     }
//   } else { // PC: 801px ~
//     if(!isPC) {
//       openAboutPC();
//       isTablet = false;
//       isPC = true;
//     }
//   }
// }


// var isTablet = false;
// var isPC = false;
// function openAbout() {
//   var tabletStyle = window.matchMedia("(max-width: 800px)");
//   if (tabletStyle.matches) { // ~ Tablet: 800px
//     if(!isTablet) {
//       openAboutTablet();
//       isTablet = true;
//       isPC = false;
//     }
//   } else { // PC: 801px ~
//     if(!isPC) {
//       openAboutPC();
//       isTablet = false;
//       isPC = true;
//     }
//   }
// }
//
// window.onresize = function(event) {
//   openAbout();
//   openAboutTablet();
//   openAboutPC();
// };

// window.onresize = function(event) {
//   openAbout();
//   thumbnailSelection();
//   openShortcuts();
// };



// Refresh window (When users change window size PC to tablet)
// window.onresize = function(event) {
//   openAbout();
//   thumbnailSelection();
//   openShortcuts();
//   filterSelection('all');
//   // filterSelection('books');
//   // filterSelection('typography');
//   // filterSelection('branding');
//   // filterSelection('illustration');
//   // filterSelection('digital');
//   // filterSelection('google');
//   // filterSelection('scripts');
//   // filterSelection('2015');
//   // filterSelection('2016');
//   // filterSelection('2017');
//   // filterSelection('2018');
//   // filterSelection('2019');
//   // filterSelection('2020');
//   // filterSelection('2021');
//   // filterSelection('2022');
//   // filterSelection('2023');
// };

// window.onresize = function(event) {
//   if(document.getElementById("col2-0").style.display == "block") {
//     openAbout();
//   }
//   else {
//     thumbnailSelection();
//     openShortcuts();
//     filterSelection('all');
//     filterSelection('books');
//     filterSelection('typography');
//     filterSelection('branding');
//     filterSelection('illustration');
//     filterSelection('digital');
//     filterSelection('google');
//     filterSelection('scripts');
//     filterSelection('2015');
//     filterSelection('2016');
//     filterSelection('2017');
//     filterSelection('2018');
//     filterSelection('2019');
//     filterSelection('2020');
//     filterSelection('2021');
//     filterSelection('2022');
//     filterSelection('2023');
//   }
// };

// window.onresize = function(event) {
//   openAbout();
//   thumbnailSelection();
//   openShortcuts();
//   filterSelection('all');
// };

// var lastC = 'all';
// var isTablet = false;
// var isPC = false;
// function filterSelection(c) {
//   var tabletStyle = window.matchMedia("(max-width: 800px)");
//   if (tabletStyle.matches) { // ~ Tablet: 800px
//     if(!isTablet) {
//       filterSelectionTablet(c);
//       isTablet = true;
//       isPC = false;
//     }
//   } else { // PC: 801px ~
//     if(!isPC) {
//       filterSelectionPC(c);
//       isTablet = false;
//       isPC = true;
//     }
//     lastC = c;
//   }
// }



// var isTablet = false;
// var isPC = false;
// function openAbout() {
//   var tabletStyle = window.matchMedia("(max-width: 800px)");
//   if (tabletStyle.matches) { // ~ Tablet: 800px
//     if(!isTablet) {
//       openAboutTablet();
//       isTablet = true;
//       isPC = false;
//     }
//   } else { // PC: 801px ~
//     if(!isPC) {
//       openAboutPC();
//       isTablet = false;
//       isPC = true;
//     }
//   }
// }

function openShortcutsResize() {
  var tabletStyle = window.matchMedia("(max-width: 800px)");
  if (tabletStyle.matches) { // ~ Tablet: 800px
    openShortcutsResizeTablet()
  } else { // PC: 801px ~
    openShortcutsResizePC()
  }
}
function openShortcutsResizeTablet() {
  // document.getElementById("col2-2").style.display = "none";
  document.getElementById("col2-1").style.display = "none";
  document.getElementById("col2-2").style.display = "block";
  document.getElementById("col3").style.display = "none";
  document.getElementById("closeContents").style.display = "block";
}

function openShortcutsResizePC() {
  // document.getElementById("col2-2").style.display = "none";
  document.getElementById("col2-1").style.display = "block";
  document.getElementById("col2-2").style.display = "block";
  document.getElementById("col3").style.display = "block";
  document.getElementById("closeContents").style.display = "none";
}




window.onresize = function(event) {
  if(document.getElementById("col2-0").style.display == "block") {
    openAbout();
  } else {
    // thumbnailSelection();
    // openShortcuts();
    // filterSelection(lastC);
  }
};

window.onresize = function(event) {
  if(document.getElementById("col2-2").style.display == "block") {
    openShortcutsResize();
    // document.getElementById("closeContents").style.display == "block"
  } else {
    openShortcutsResize();
    thumbnailSelection();
    // openShortcuts();
    // filterSelection(lastC);
  }
};


//
// window.onresize = function(event) {
//   thumbnailSelection();
//   openShortcuts();
//   filterSelection(lastC);
// };
