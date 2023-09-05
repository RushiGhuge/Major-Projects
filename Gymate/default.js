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

function aboutNavOpenCloseBtn() {
  let openAboutNavBtn = document.getElementById("openAboutNavBtn");
  let navAboutSection = document.getElementsByClassName("nav-about-section")[0];
  let aboutFlag = true;

  openAboutNavBtn.addEventListener("click", () => {
    if (aboutFlag) {
      navAboutSection.style.transform = "translate(0%)";
      aboutFlag = false;
    } else {
      navAboutSection.style.transform = "translate(-100%)";
      aboutFlag = true;
    }
  });

  //close nav btn
  document.getElementById("closeAboutNav").addEventListener("click", () => {
    navAboutSection.style.transform = "translate(-100%)";
    aboutFlag = true;
  });
}
aboutNavOpenCloseBtn();
document.addEventListener("scroll", () => {
  if (window.scrollY < 50) {
    document.getElementsByClassName("navbar")[0].style.background =
      "transparent";
  } else {
    document.getElementsByClassName("navbar")[0].style.background = "black";
  }
});
