function mobileNavOpenCloseBtn() {
  const openNav = document.getElementById("openNav");
  const closeNav = document.getElementById("closeNav");
  const mobileNav = document.getElementsByClassName("mobileNav")[0];
  openNav.addEventListener("click", () => {
    mobileNav.style.transform = "translate(0%)";
  });
  closeNav.addEventListener("click", () => {
    mobileNav.style.transform = "translate(-100%)";
  });
}
mobileNavOpenCloseBtn();

document.addEventListener("scroll", () => {
  console.log(window.scrollY);
  if (window.scrollY < 50) {
    document.getElementsByClassName("navbar")[0].style.background =
      "transparent";
  } else {
    document.getElementsByClassName("navbar")[0].style.background = "black";
  }
});

// calculate the BMI......................................
function getBmi() {
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;
  let BMI = weight / ((height / 100) * (height / 100));
  BMI = BMI * 100;
  BMI =  Math.floor(BMI)
  BMI = BMI / 100;
  console.log(BMI);
  // put it in the dom
  let bmiCal = (document.getElementById("bmiCal").innerText = BMI);
  let weightCal = document.getElementById("weightCal");

  if (BMI <= 18.5) {
    weightCal.innerText = "Underweight";
  } else if (BMI >= 18.5 && BMI <= 25) {
    weightCal.innerText = "Normal";
  } else if (BMI >= 25 && BMI <= 29) {
    weightCal.innerText = "Overweight";
  } else if (BMI >= 30 && BMI <= 35) {
    weightCal.innerText = "Obesity  I:";
  } else if (BMI >= 35 && BMI <= 40) {
    weightCal.innerText = "Obesity II";
  }
  else if(BMI > 40) {
    weightCal.innerText = "Obesity III";
  }
}
let calBtn = document.getElementById("calculate");
calBtn.addEventListener("click", getBmi);
