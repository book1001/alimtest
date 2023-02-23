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




// Responsive layout: filterSelection


function filterSelection(c) {
  var tabletStyle = window.matchMedia("(max-width: 800px)");
  if (tabletStyle.matches) { //~Tablet: 800px
    filterSelectionTablet(c)
  } else { // PC: 801px~
    filterSelectionPC(c)
  }
}

// var lastC = 'all'; // Choose last selected filter when users change window size
// function filterSelection(c) {
//   var tabletStyle = window.matchMedia("(max-width: 800px)");
//   if (tabletStyle.matches) { //~Tablet: 800px
//     filterSelectionTablet(c)
//   } else { // PC: 801px~
//     filterSelectionPC(c)
//   }
//   lastC = c;
// }

// var isTablet = false;
// var isPC = false;
// var lastC = 'all';
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

function filterSelectionTablet(c) {
  var x = document.getElementsByClassName("filterDiv");
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("show");
    x[i].parentElement.style.display = "none";

    document.getElementById("col2-0").style.display = "none";
    document.getElementById("col2-1").style.display = "none";
    document.getElementById("col2-2").style.display = "none";
    document.getElementById("col3").style.display = "block";
    document.getElementById("col4").style.display = "block";
    document.getElementById("closeContents").style.display = "none";
    $grid.masonry('layout');

    if (c == "all" || x[i].classList.contains(c)) {
      x[i].classList.add("show");
      x[i].parentElement.style.display = "block";

      document.getElementById("col2-0").style.display = "none";
      document.getElementById("col2-1").style.display = "none";
      document.getElementById("col2-2").style.display = "none";
      document.getElementById("col3").style.display = "block";
      document.getElementById("col4").style.display = "block";
      document.getElementById("closeContents").style.display = "none";
      $grid.masonry('layout');
    }
  }

  var descFilter = document.getElementsByClassName("desc-filter");
  var isActive=false;
  for (var i = 0; i < descFilter.length; i++) {
    descFilter[i].classList.remove("active");
    descFilter[i].style.display = "none";

    if(c == "all" || descFilter[i].classList.contains(c)) {
      descFilter[i].style.display = "block";

      if (!isActive) {
        descFilter[i].classList.add("active");

        isActive = true;
      }
    }
  }

  // console.log($('body').scrollTop());
  $('body').scrollTop(1);
  $('body').scrollTop(0);
  // console.log($('body').scrollTop());
}


function filterSelectionPC(c) {
  var x = document.getElementsByClassName("filterDiv");
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("show");
    x[i].parentElement.style.display = "none";

    document.getElementById("col2-0").style.display = "none";
    document.getElementById("col2-1").style.display = "block";
    document.getElementById("col2-2").style.display = "block";
    document.getElementById("col3").style.display = "block";
    document.getElementById("closeContents").style.display = "none";
    $grid.masonry('layout');

    if (c == "all" || x[i].classList.contains(c)) {
      x[i].classList.add("show");
      x[i].parentElement.style.display = "block";

      document.getElementById("col2-0").style.display = "none";
      document.getElementById("col2-1").style.display = "block";
      document.getElementById("col2-2").style.display = "block";
      document.getElementById("col3").style.display = "block";
      document.getElementById("closeContents").style.display = "none";
      $grid.masonry('layout');
    }
  }

  var descFilter = document.getElementsByClassName("desc-filter");
  var isActive=false;
  for (var i = 0; i < descFilter.length; i++) {
    descFilter[i].classList.remove("active");
    descFilter[i].style.display = "none";

    if(c == "all" || descFilter[i].classList.contains(c)) {
      descFilter[i].style.display = "block";

      if (!isActive) {
        descFilter[i].classList.add("active");

        isActive = true;
      }
    }
  }

  // console.log($('body').scrollTop());
  $('body').scrollTop(1);
  $('body').scrollTop(0);
  // console.log($('body').scrollTop());
}
