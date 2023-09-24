const mNav = document.getElementById("mobileNav");
const aboutSec = document.getElementById("aboutSec");

const projectCard = document.getElementsByClassName('project-card');
// ---------------------------------------
//change the themes to light and dark modes
let toggleSwitch = document.querySelector('.toggle-switch input');
toggleSwitch.addEventListener('click', theme)

let toggleSwitch2 = document.querySelector('.toggle-switch2 input');
toggleSwitch2.addEventListener('click', theme)

function theme(event){
    // console.log(event);
    if (!event.target.checked) {
        //for Light Mode Default----->
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
        for (let i = 0; i < projectCard.length; i++) {
            projectCard[i].style.background = "white"
            projectCard[i].style.color = "black"
        }
        document.getElementById('footer').style.background = "white"
        document.getElementById('footer').style.color = "black"
        document.querySelectorAll('.project-cart-demo  a').forEach(element => {
            element.style.color = 'black'
        });



    }
    else {

        //For Dark Mode  -------->

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
        for (let i = 0; i < projectCard.length; i++) {
            projectCard[i].style.background = "black"
            projectCard[i].style.color = "white"
        }
        document.getElementById('footer').style.background = "black"
        document.getElementById('footer').style.color = "white"
        document.querySelectorAll('.project-cart-demo  a').forEach(element => {
            element.style.color = 'white'
        });

    }
}

//navbar sections---->

//open the mobile nav button
function DisplayNavBar() {
    const handBergerIcon = document.getElementById('hand-burger-icon');
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.style.transform = "translate(0px)";
}
//close the mobile nav button
function closeNav() {
    const mobileNav = document.getElementById('mobileNav');
    // mobileNav.style.display = 'none'
    mobileNav.style.transform = "translate(-100%) ";
}
//scroll Functions
function scrollNow(x, y) {
    window.scrollTo(x, y);
}



// //scroll of img project--->
// let projectImg = document.querySelectorAll('.project-img');
// projectImg.forEach(img =>{
//    img.addEventListener('mouseenter',(event)=>{
//     console.log(event.target);
//     event.target.scrollTo(0,1000)
//    })
// })


// animation part starts -----> 
// nav bar animat 

//about section and page 1 animation is here : --->
gsap.from(".left-nav, .right-nav > div, #Themes , #label-dark", {
    y: -400,
    duration: 1,
    stagger: 0.2
})
gsap.from(".hero-text>div, .hero-text>p", {
    x: -1000,
    duration: 1,
    stagger: 0.2
})

gsap.from(".hero-img", {
    x: 1000,
    duration: 1,
    stagger: 0.2
})

gsap.from(".ParaTxtColorDark, .logos li", {
    y: 200,
    opacity:0,
    duration: 1,
    stagger: 0.2
})

gsap.from(".about-img", {
    x: -1000,
    duration: 1,
    scrollTrigger: {
        trigger: ".about-img"
    },
    stagger: 3
})

//time line animations is here : --->

gsap.from(".right-amc", {
    x: 1000,
    duration: 1,
    scrollTrigger: {
        trigger: ".right-amc"
    },
    stagger: 1
})
gsap.from(".left-amc", {
    x: -1000,
    duration: 1,
    scrollTrigger: {
        trigger: ".left-amc"
    },
    stagger: 1
})


