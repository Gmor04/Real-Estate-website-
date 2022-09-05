

let button = document.querySelector('.togglebtn')
let popup = document.querySelector('.popup-wrapper')
let close = document.querySelector('.popup-close')

button.addEventListener('click', () => {
    popup.style.display = 'block'

})
close.addEventListener('click', () => {
    popup.style.display = 'none'

})

popup.addEventListener('click', () => {
    popup.style.display = 'none'

})




let screene = document.querySelector('.mainn')
let url = "http://localhost:3000/"
let getstore = JSON.parse(localStorage.getItem('obj'))


function displaybuy(element, index) {
    screene.innerHTML += `
    <div class="mycard">
            <div class="img-div">
                <img src="${element.Image}" alt="" class="img">
            </div>
            <div class="details-div">
                <div class="title">${element.title}</div>
                <div class="des">${element.desc}</div>
                <div class="loc"><span><i class="fa-solid fa-location-pin"></i></span><span class="loc-det">${element.location}</span></div>
                <div class="price">#${element.price}</div>       
                <div class="btn-div"> <button class="btn-buy" onclick="buuy(${index})">BUY</button></div>            
            </div>
        </div>

`
}

function displayrent(element, index) {
    screene.innerHTML += `
    <div class="mycard">
            <div class="img-div">
                <img src="${element.Image}" alt="" class="img">
            </div>
            <div class="details-div">
                <div class="title">${element.title}</div>
                <div class="des">${element.desc}</div>
                <div class="loc"><span><i class="fa-solid fa-location-pin"></i></span><span class="loc-det">${element.location}</span></div>
                <div class="price">#${element.price}</div>       
                <div class="btn-div"> <button class="btn-buy" onclick="renta(${index})">RENT</button></div>            
            </div>
        </div>

`
}

function displaysell(element, index) {
    screene.innerHTML += `
    <div class="mycard">
            <div class="img-div">
                <img src="${element.Image}" alt="" class="img">
            </div>
            <div class="details-div">
                <div class="title">${element.title}</div>
                <div class="des">${element.desc}</div>
                <div class="loc"><span><i class="fa-solid fa-location-pin"></i></span><span class="loc-det">${element.location}</span></div>
                <div class="price">#${element.price}</div>       
                <div class="btn-div"> <button class="btn-buy" onclick="seller(${index})">BUY</button></div>            
            </div>
        </div>

`
}


// TO BUY HOUSE

async function buypro() {

    screene.innerHTML = ''
    sellpro()
    await fetch(url + 'Buy')
        .then(e => e.json())
        .then(data => {

            // console.log(data)

            for (let index = 0; index < data.length; index++) {
                const element = data[index];

                // console.log(data[index]);
                // console.log(index);
                displaybuy(element, index)
            }

        }).catch((err) => {
            console.log(err);
        })

        // sellpro()
}

buypro()


// TO RENT HOUSE

async function rentpro() {
    screene.innerHTML = ''
    scrollTo(0, 700)
    await fetch(url + 'Rent')
        .then(e => e.json())
        .then(data => {

            console.log(data)

            for (let index = 0; index < data.length; index++) {
                const element = data[index];

                // console.log(data[index]);

                displayrent(element, index)
            }

        })
        .catch((err) => {
            console.log(err);
        })

}


// TO SELL HOUSE 
async function sellpro() {
    screene.innerHTML = ''
    // console.log(getstore);
    for (let index = 0; index < getstore.length; index++) {
        const element = getstore[index];
        // console.log(element);
        displaysell(element, index)
    }

}
// sellpro()



//on clicking on buy

async function buuy(index) {
    console.log(index);

    await fetch(url + 'Buy')
        .then(e => e.json())
        .then(data => {
            console.log(data[index])

            let obj = {

                Image: data[index].Image,
                Image2: data[index].Image2,
                Image3: data[index].Image3,
                title: data[index].title,
                desc: data[index].desc,
                price: data[index].price,
                location: data[index].location,
                mode: data[index].mode,

            }

            fetch(url + 'moredetail/1', {
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                },
                method: 'PUT',
                body: JSON.stringify(obj),

            }).then(e => e.json())
                .then(data => {
                    window.location.href = 'prodetails.html'
                })
        }).catch((err) => {
            console.log(err);
        })


}



//on clicking on rent

async function renta(index) {
    console.log(index);

    await fetch(url + 'Rent')
        .then(e => e.json())
        .then(data => {
            console.log(data[index])


            let obj = {

                Image: data[index].Image,
                Image2: data[index].Image2,
                Image3: data[index].Image3,
                title: data[index].title,
                desc: data[index].desc,
                price: data[index].price,
                location: data[index].location,
                mode: data[index].mode,

            }

            fetch(url + 'moredetail/1', {
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                },
                method: 'PUT',
                body: JSON.stringify(obj),

            }).then(e => e.json())
                .then(data => {
                    window.location.href = 'prodetails.html'
                })
        }).catch((err) => {
            console.log(err);

        })


}



//on clicking on sell

async function seller(index) {
    console.log(index);
    console.log(getstore[index].location);


    let obj = {

        Image: getstore[index].Image,
        Image2: getstore[index].Image2,
        Image3: getstore[index].Image3,
        title: getstore[index].title,
        desc: getstore[index].desc,
        price: getstore[index].price,
        location: getstore[index].location,
        mode: 'PURCHASE',

    }

   await fetch(url + 'moredetail/1', {
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        method: 'PUT',
        body: JSON.stringify(obj),

    }).then(e => e.json())
        .then(data => {
            window.location.href = 'prodetails.html'
        }).catch ((err) => {
    console.log(err);

})



    
}

// my sell page
function mysellpage() {
    
    window.location.href = 'Sellpage.html'

}


// search for property

let searchinput = document.querySelector('#searchpro');

async function searchh() {

    if (searchinput.value == '') {
        alert('Enter the city name')
        return
    }
    screene.innerHTML = ''
  
    await fetch(url + 'Buy')
        .then(e => e.json())
        .then(data => {

            // console.log(data)

            let Availhouse = data.filter(function (e) {
                return e.location.includes(searchinput.value) 
              })
            //   console.log(Availhouse);
            for (let index = 0; index < Availhouse.length; index++) {
                const element = Availhouse[index];

                displaybuy(element, index)
            }

        }).catch((err) => {
            console.log(err);
        })

        fetch(url + 'Rent')
        .then(e => e.json())
        .then(data => {

            // console.log(data)

            let Availhousee = data.filter(function (e) {
                return e.location.includes(searchinput.value) 
              })
            //   console.log(Availhouse);
            for (let index = 0; index < Availhousee.length; index++) {
                const element = Availhousee[index];

                displayrent(element, index)
            }

        }).catch((err) => {
            console.log(err);
        })


        let Availhouseee = getstore.filter(function (b) {
            return b.location.includes(searchinput.value)   
        })
        for (let index = 0; index < Availhouseee.length; index++) {
            const element = Availhouseee[index];
            // console.log(element);
            displaysell(element, index)
        }
    
}


let bosx = document.querySelector('.logoutdiv')


bosx.style.visibility = 'hidden'
function profilee() {
    bosx.style.visibility = 'visible' 

}
function canncel() {
    location.href = 'Home.html'
    // bosx.style.visibility = 'hidden'
}

function logoutt() {
    location.href = 'index.html'
}