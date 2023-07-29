// fetch the information from server...
let serverData;
async function fetchInfo() {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
    let respons = await fetch(url);
    let data = await respons.json();
    console.log(data);
    createGrid(data)
    // createList(data);
    serverData = data;
}
fetchInfo() ;

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

const list = document.getElementById('list')
const grid = document.getElementById('grid')

list.addEventListener('click', () => {
    grid.style.borderBottom = 'none'
    list.style.borderBottom = '2px solid white'
    removeGrid();
    removeList();
    createList(serverData)
})
grid.addEventListener('click', () => {
    list.style.borderBottom = 'none'
    grid.style.borderBottom = '2px solid white'
    removeList();
    removeGrid();
    createGrid(serverData);
})

function removeGrid(){
    let gridC = document.getElementById('gridContainer');
    if(gridC === null){
        return
    }
    else {
        gridC.remove();
    }
}
function removeList(){
    let tbody = document.getElementById('tbody');
    if(tbody === null){
        console.log("hi");
        return
    }
    else {
        tbody.remove();


    }
}
removeList();

function createGrid(arr) {
    const gridContainer = document.createElement('div')
    gridContainer.className = 'grid-container'
    gridContainer.id = 'gridContainer'
    for (let i = 0; i < arr.length; i++) {
        let GgreenRed = 'green';
        let GborderRed = 'green'
        if(arr[i].price_change_percentage_24h < 0){
            GgreenRed = 'red';
            GborderRed = 'redBorder'
        }
        else{
            GgreenRed = 'green'
        }

        let grid = document.createElement('div');
        grid.className = 'grid';
        grid.innerHTML = `
        <div class="grid-row">
            <img src="${arr[i].image}" alt="logo">
            <div>
                <h3>${arr[i].symbol}</h3>
                <p class="gray">${arr[i].name}</p>
            </div>
        </div>
        
        <div class="grid-col">
            <div class="persentage ${GgreenRed} ${GborderRed} ">${arr[i].price_change_percentage_24h}</div>
            <div class="value ${GgreenRed}">${"$" + arr[i].current_price}</div>
            <div class="total-val gray bold">Total Valume: ${arr[i].total_volume}</div>
            <div class="market-cap gray bold">Market Cap: ${arr[i].market_cap}</div>
        </div>`
        gridContainer.appendChild(grid)
    }
    document.body.appendChild(gridContainer)
}

function createList(arr) {
    const tBody = document.createElement('tbody')
    tBody.id = 'tbody'
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        let greenRed = 'green';
        let borderRed = 'green'
        if(arr[i].price_change_percentage_24h < 0){
            greenRed = 'red';
            borderRed = 'redBorder'
        }
        else{
            greenRed = 'green'
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="icon-container">
        <img  src="${arr[i].image}" alt="">
        <div class="list-col">
            <p class="bold">${arr[i].symbol}</p>
            <p class="gray">${arr[i].name}</p>
        </div>
    </td>
    <td ><span class="per ${greenRed} ${borderRed}">${arr[i].price_change_percentage_24h}%</span></td>
    <td id="val" class="value ${greenRed} ">$${arr[i].current_price}</td>
    <td class="">${arr[i].total_volume}</td>
    <td class="">$${arr[i].market_cap}</td>`
    tBody.appendChild(tr);
    }
    const table =document.getElementsByTagName('table')[0];
    table.appendChild(tBody);
}