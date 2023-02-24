var tabletStyle = window.matchMedia("(max-width: 800px)")
var menuNumber = document.getElementsByClassName("mobileNone");


function myFunction(tabletStyle) {
  if (tabletStyle.matches) { // ~ Tablet: 800px

    for (let i = 0; i < menuNumber.length; i++) {
      menuNumber[i].style.display = "none";
    }
    if(document.getElementById("col3").style.display == "block") {
      document.getElementById("col2-2").style.display = "none";
      document.getElementById("col3").style.display = "block";
      document.getElementById("closeContents").style.display = "none";
    } else {

    }

  } else { // PC: 801px ~
   for (let i = 0; i < menuNumber.length; i++) {
     menuNumber[i].style.display = "inline-block";
   }
   document.getElementById("col2-1").style.display = "";
   document.getElementById("col2-2").style.display = "";
   document.getElementById("col3").style.display = "";
   document.getElementById("closeContents").style.display = "none";
   // $('body').scrollTop(1);
   // $('body').scrollTop(0);
  }
}

myFunction(tabletStyle) // Call listener function at run time
tabletStyle.addListener(myFunction) // Attach listener function on state changes
