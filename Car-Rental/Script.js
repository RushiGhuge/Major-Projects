function scrollNow(x, y) {
    window.scrollTo(x, y);
}

let apiObj = [
    {
        carNamr: 'Audi A1 S-Line',
        img: 'https://car-rental-ten.vercel.app/static/media/audia1.d038cf70b700e34e607a.jpg',
        rentPerDay: 2400,
        Model: "Audi",
        Mark: 'A1',
        Year: 2012,
        Doors: "4/5",
        AC: 'Yes',
        Transmission: 'Manual',
        Fule: 'Petrol'
    },

    {
        carNamr: 'VW Golf 6',
        img: 'https://car-rental-ten.vercel.app/static/media/golf6.595c0bbfc7ce2e50aa05.jpg',
        rentPerDay: 2000,
        Model: "Golf 6",
        Mark: 'Volkswagen',
        Year: 2014,
        Doors: "4/5",
        AC: 'Yes',
        Transmission: 'Manual',
        Fule: 'Disel'
    },

    {
        carNamr: 'Toyota Camry',
        img: 'https://car-rental-ten.vercel.app/static/media/toyotacamry.3d493a56558c50b677cc.jpg',
        rentPerDay: 1500,
        Model: "Camry",
        Mark: 'Toyota',
        Year: 2006,
        Doors: "4/5",
        AC: 'Yes',
        Transmission: 'Automatic',
        Fule: 'Hybrid'
    },

    {
        carNamr: 'BMW 320 ModernLine',
        img: 'https://car-rental-ten.vercel.app/static/media/bmw320.84ab73b0c9133418f907.jpg',
        rentPerDay: 3000,
        Model: "320",
        Mark: 'BMW',
        Year: 2012,
        Doors: "4/5",
        AC: 'Yes',
        Transmission: 'Manual',
        Fule: 'Diesel'
    },

    {
        carNamr: 'Mercedes-Benz GLK',
        img: 'https://car-rental-ten.vercel.app/static/media/benz.0a6153731a2c1a68054a.jpg',
        rentPerDay: 3500,
        Model: "Benz GLK",
        Mark: 'Mercedes',
        Year: 2018,
        Doors: "4/5",
        AC: 'Yes',
        Transmission: 'Manual',
        Fule: 'Diesel'
    },

    {
        carNamr: 'VW Passat CC',
        img: 'https://car-rental-ten.vercel.app/static/media/passatcc.bd82bd1deac8c11e3c4d.jpg',
        rentPerDay: 1900,
        Model: "Passat CC",
        Mark: 'Volkswagen',
        Year: 2019,
        Doors: "4/5",
        AC: 'Yes',
        Transmission: 'Manual',
        Fule: 'LPG'
    }

]
let imgAndDetails = document.getElementsByClassName('imgAndDetails')[0]
let carnNameBox = document.getElementsByClassName('carnNameBox');
for (let i = 0; i < carnNameBox.length; i++) {
    carnNameBox[i].addEventListener('click', (event) => {
        console.log(event.target.innerText);
        for (let a of carnNameBox) {
            a.style.background = '#E9E9E9'
            a.style.color = 'black'
        }
        event.target.style.background = "#FF4D30"
        event.target.style.color = "white"
        for (let j = 0; j < apiObj.length; j++) {
            if (apiObj[j].carNamr == event.target.innerText) {

                document.querySelector('.imgCarContainer > img').src = apiObj[j].img;
                let carDets = document.getElementById('carDets');
                carDets.remove();

                let newCarDets = document.createElement('div');
                newCarDets.id = 'carDets';
                newCarDets.className = 'carDetails';
                newCarDets.innerHTML = ` <h2  class="carPrice">₹${apiObj[j].rentPerDay}<span>/rent per day</span></h1>
                <div class="row">
                    <div class="col crb">Model</div>
                    <div class="col">${apiObj[j].Model}</div>
                </div>
    
                <div class="row">
                    <div class="col crb">Mark</div>
                    <div class="col">${apiObj[j].Mark}</div>
                </div>
    
                <div class="row">
                    <div class="col crb">Years</div>
                    <div class="col">${apiObj[j].Year}</div>
                </div>
    
                <div class="row">
                    <div class="col crb">Doors</div>
                    <div class="col">${apiObj[j].Doors}</div>
                </div>
    
    
                <div class="row">
                    <div class="col crb">AC</div>
                    <div class="col">${apiObj[j].AC}</div>
                </div>
    
                <div class="row">
                    <div class="col crb">Transmission</div>
                    <div class="col">${apiObj[j].Transmission}</div>
                </div>
                <div class="row">
                <div class="col crb">Fule</div>
                <div class="col">${apiObj[j].Fule}</div>
                </div>
                <button class="btn-res">RESERVE NOW</button>`
                imgAndDetails.appendChild(newCarDets)
            }
        }

    })
}


// quation FAQ 

let q = document.querySelectorAll('.question');
// for (let j = 0; j < 3; j++) {
//     q[j].children[1].style.display = 'none'
// }

for (let i = 0; i < q.length; i++) {
    q[i].addEventListener('click', (event) => {
        let ans = q[i].childNodes[3];
   
        if (ans.style.maxHeight == '400px') {
            ans.style.maxHeight = '0'
        }
        else {
            ans.style.maxHeight = '400px';
        }

        // if(i == 0){
        //     q[1].children[1].style.display = 'none'
        //     q[2].children[1].style.display = 'none'
        // }
        // else if(i == 1){
        //     q[0].children[1].style.display = 'none'
        //     q[2].children[1].style.display = 'none'
        // }
        // else if(i == 2){
        //     q[1].children[1].style.display = 'none'
        //     q[0].children[1].style.display = 'none'
        // }

        // if (q[i].children[1].style.display == 'none') {
        //     q[i].children[1].style.display = 'block'
        //     q[i].children[1].style.opacity = '1'
        // }
        // else if (q[i].children[1].style.display == 'block') {
        //     q[i].children[1].style.display = 'none'
        //     q[i].children[1].style.opacity = '0'
        // }



    })
}

// var expandableElement = document.querySelector('.expandable3');
// q[0].addEventListener('click',()=>{
//     expandableElement.classList.toggle('open');
//     console.log('hii');
// })
// q[1].addEventListener('click',()=>{
//     expandableElement.classList.toggle('open');
//     console.log('hii');
// })
// q[2].addEventListener('click',()=>{
//     expandableElement.classList.toggle('open');
//     console.log('hii');
// })