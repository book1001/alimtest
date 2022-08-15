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



// About
function openAbout() {
  document.getElementById("col2-0").style.display = "block";
  document.getElementById("col2-1").style.display = "none";
  document.getElementById("col2-2").style.display = "none";
}


// En Ko
function EnKo() {
  document.getElementById("Ko").style.display = "block";
  document.getElementById("En").style.display = "none";
}
