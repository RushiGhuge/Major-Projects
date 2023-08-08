const themes = document.querySelectorAll("#Themes");
const lightDarkModeBtn = document.querySelector('#Themes option');
console.log(lightDarkModeBtn.innerHTML);
const mNav = document.getElementById("mobileNav");
const aboutSec = document.getElementById("aboutSec");

const projectCard = document.getElementsByClassName('project-card');
// ---------------------------------------
//change the themes to light and dark modes
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
            mNav.style.background = "white"
            mNav.style.color = "black"
            aboutSec.style.background = "white";
            aboutSec.style.color = "#767676";
            document.getElementById('head-ab').style.color = '#2D2E32'
            document.getElementById('para-ab').style.color = '#767676'
            document.getElementById('aboutme').style.color = 'rgb(0, 102, 255)'
            document.getElementById('ProHead').style.color = "black"

            for(let i = 0;i<projectCard.length;i++){
                projectCard[i].style.background = "white"
                projectCard[i].style.color = "black"
            }
           document.getElementById('footer').style.background = "white"
           document.getElementById('footer').style.color = "black"

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
            mNav.style.background = "rgb(20, 20, 20)"
            mNav.style.color = "white"
            aboutSec.style.background = "black";
            aboutSec.style.color = "red";
            document.getElementById('head-ab').style.color = 'white'
            document.getElementById('para-ab').style.color = 'white'
            document.getElementById('aboutme').style.color = 'white'
            document.getElementById('aboutme').style.color = 'rgb(0, 96, 175)'
            document.getElementById('ProHead').style.color = "white"

            // console.log(projectCard);
            for(let i = 0;i<projectCard.length;i++){
                projectCard[i].style.background = "black"
                projectCard[i].style.color = "white"
            }
            document.getElementById('footer').style.background = "black"
            document.getElementById('footer').style.color = "white"
 
        }
    })

})

//navbar sections---->

//open the mobile nav button
function DisplayNavBar() {
    const handBergerIcon = document.getElementById('hand-burger-icon');
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.style.transform = "translate(0px) ";
}
//close the mobile nav button
function closeNav() {
    const mobileNav = document.getElementById('mobileNav');
    // mobileNav.style.display = 'none'
    mobileNav.style.transform = "translate(-1000px) ";
}
//scroll Functions
function scrollNow(x, y) {
    window.scrollTo(x, y);
}

window.addEventListener('scroll',()=>{
    console.log(window.scrollY);
    if(window.scrollY >= 730){
        document.getElementsByClassName('timeLine-container')[0].style.display = 'block'
    }
    if(window.scrollY >= 2300){
        
    }
})


