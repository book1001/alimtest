var tabletStyle = window.matchMedia("(max-width: 800px)")
var menuNumber = document.getElementsByClassName("mobileNone");

function myFunction(tabletStyle) {
  if (tabletStyle.matches) { // ~ Tablet: 800px

    for (let i = 0; i < menuNumber.length; i++) {
      menuNumber[i].style.display = "none";
    }

  } else { // PC: 801px ~

   for (let i = 0; i < menuNumber.length; i++) {
     menuNumber[i].style.display = "inline-block";
   }
  }
}

myFunction(tabletStyle) // Call listener function at run time
tabletStyle.addListener(myFunction) // Attach listener function on state changes
