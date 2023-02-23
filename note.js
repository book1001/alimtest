// Style 변경: Class

// Style 변경: Class > 첫 번째 Class
document.getElementsByClassName("className")[0].style.display = "none";



// Style 변경: Class > 모든 Class
var changeClass = document.getElementsByClassName("className");
for (let i = 0; i < changeClass.length; i++) {
  changeClass[i].style.display = "none";
}



// <button onclick="buttonOnclick()">시 동작
function buttonOnclick() {
  // <button onclick="buttonOnclick()">시 동작
}



// Responsive 레이아웃: <button onclick="buttonOnclick()">시 동작
function buttonOnclick() {
  var tabletStyle = window.matchMedia("(max-width: 800px)");
  if (tabletStyle.matches) { // ~ Tablet: 800px
    buttonOnclickTablet()
  } else { // PC: 801px ~
    buttonOnclickPC()
  }
}

function buttonOnclickTablet() {
  // ~ Tablet: 800px에서 동작
}

function buttonOnclickPC() {
  // PC: 801px ~에서 동작
}
