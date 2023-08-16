function mobileNavOpenCloseBtn() {
    const openNav = document.getElementById('openNav');
    const closeNav = document.getElementById('closeNav');
    const mobileNav = document.getElementsByClassName('mobileNav')[0]
    openNav.addEventListener('click', () => {
        mobileNav.style.transform = 'translate(0%)'
    })
    closeNav.addEventListener('click', () => {
        mobileNav.style.transform = 'translate(-100%)'
    })
}
mobileNavOpenCloseBtn();

document.addEventListener('scroll',()=>{
    console.log(window.scrollY);
    if(window.scrollY < 50){
        document.getElementsByClassName('navbar')[0].style.background = 'transparent'
    }
    else{
        document.getElementsByClassName('navbar')[0].style.background = 'black'
    }
})