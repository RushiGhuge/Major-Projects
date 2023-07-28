const themes = document.querySelectorAll("#Themes");
const lightDarkModeBtn = document.querySelector('#Themes option');
console.log(lightDarkModeBtn.innerHTML);

themes.forEach((theme) => {

    theme.addEventListener('click', () => {
        console.log(theme.value);
        if (theme.value === 'LIGHT') {
            //for Light Moode Default----->
            theme.style.color = "black"
            document.body.style.background = "#F9F9F9"
            document.getElementById("textColor").style.color = '#2d2e32'

            const paraText = document.querySelectorAll(".ParaTxtColorDark");
            for (let i = 0; i < paraText.length; i++) {
                paraText[i].style.color = '#838383'
            }
            const navbar = document.getElementById('navBar');
            navbar.style.background = 'white';
            navbar.style.color = 'black'
        }
        else if (theme.value === 'DARK') {

            //For Dark Mode  -------->
            theme.style.color = "white"

            document.body.style.background = "rgb(20, 20, 20)";
            document.getElementById("textColor").style.color = 'white'

            const paraText = document.querySelectorAll(".ParaTxtColorDark");
            for (let i = 0; i < paraText.length; i++) {
                paraText[i].style.color = 'rgb(221, 221, 221)'
            }
            const navbar = document.getElementById('navBar');
            navbar.style.background = 'black';
            navbar.style.color = 'white'


        }
    })

})

//navbar sections---->

function DisplayNavBar() {
    const handBergerIcon = document.getElementById('hand-burger-icon');
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.style.transform = "translate(0px) ";
}
function closeNav() {
    const mobileNav = document.getElementById('mobileNav');
    // mobileNav.style.display = 'none'
    mobileNav.style.transform = "translate(-1000px) ";
}

window.scrollTo(0, 500);