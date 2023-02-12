// Style 변경: Class

// Style 변경: Class > 첫 번째 Class
document.getElementsByClassName("className")[0].style.display = "none";



// Style 변경: Class > 모든 Class

var changeClass = document.getElementsByClassName("className");
for (let i = 0; i < changeClass.length; i++) {
  changeClass[i].style.display = "none";
}
