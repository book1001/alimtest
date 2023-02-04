// Filter
function filterSelection(c) {
  var x = document.getElementsByClassName("filterDiv");
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("show");
    x[i].parentElement.style.display = "none";

    document.getElementById("col2-0").style.display = "none";
    document.getElementById("col2-1").style.display = "block";
    document.getElementById("col2-2").style.display = "block";

    if (c == "all" || x[i].classList.contains(c)) {
      x[i].classList.add("show");
      x[i].parentElement.style.display = "block";

      document.getElementById("col2-0").style.display = "none";
      document.getElementById("col2-1").style.display = "block";
      document.getElementById("col2-2").style.display = "block";
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
  // TODO ???
  var x = window.matchMedia("screen and (max-width:450px),(max-height:450px)")
  responsive(x)
  x.addListener(responsive)

  function responsive(x) {
    if (x.matches) { // Mobile view
      // $grid.masonry('layout');
      var thumbnailView = document.getElementsByClassName("thumbnail-view")[0];
      var thumbnailViewItem = thumbnailView.getElementsByClassName("thumbnail-view-item");

      for(var i=0; i<thumbnailViewItem.length; i++) {
        var target = thumbnailViewItem[i].getElementsByClassName("filterDiv")[0];
        if(!target.classList.contains("show")) {
          thumbnailViewItem[i].style.display = "none";
        }
        else {
          thumbnailViewItem[i].style.display = "";
        }
      }
      // $grid.masonry('layout');

    } else { // Desktop view
      // $grid.masonry('layout');
      var thumbnailView = document.getElementsByClassName("thumbnail-view")[0];
      var thumbnailViewItem = thumbnailView.getElementsByClassName("thumbnail-view-item");
      for(var i=0; i<thumbnailViewItem.length; i++) {
        var target = thumbnailViewItem[i].getElementsByClassName("filterDiv")[0];
        if(!target.classList.contains("show")) {
          thumbnailViewItem[i].style.display = "";
        }
        else {
          thumbnailViewItem[i].style.display = "";
        }
      }
      // $grid.masonry('layout');
    }
  }

  console.log($('body').scrollTop());
  $('body').scrollTop(1);
  $('body').scrollTop(0);

  console.log($('body').scrollTop());
}
