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



let url = "http://localhost:3000/"



let firstname = document.querySelector('.fname');
let lastname = document.querySelector('.lname');
let email = document.querySelector('.emaddr');
let password = document.querySelector('.passw');
let phoneno = document.querySelector('.phoneno');
let emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// let phonenopattern = /^\d{10}$/;
let verifiedemail;
// let verifiedphoneno;
let obj;



//sign up
async function Regis() {

    if (firstname.value == '' || lastname.value == '' || email.value == '' || password.value == '' || phoneno.value == '') {

        return swal("oppos!", "Kindly fill in the neccessary", "info");
    }

    if (emailpattern.test(email.value)) {
        verifiedemail = email.value
        //  console.log(verifiedemail);

        obj = {

            firstname: firstname.value,
            lastname: lastname.value,
            emailaddress: verifiedemail,
            password: password.value,
            phone: phoneno.value

        }
       

    } else {
        // refresh()
        return swal("You have entered an invalid email address!", "warning");

    }


    // let obj = {

    //     firstname: firstname.value,
    //     lastname: lastname.value,
    //     // emailaddress: email.value,
    //     emailaddress: verifiedemail,
    //     password: password.value,
    //     phone: phoneno.value

    // }


    await fetch(url + 'User')
        .then(e => e.json())
        .then(data => {
            let userData = data.find(f => {
                return f.emailaddress === email.value || f.phone == phoneno.value

            })
            if (userData) {
                // alert('Email Address Already Exist')
                swal("oppos!", "Already existing Account", "error");
                refresh()
                return
            } else {

                //POST
                fetch(url + 'User', {
                    headers: {
                        "content-type": "application/json; charset=UTF-8"
                    },
                    method: 'POST',
                    body: JSON.stringify(obj),

                }).then(e => e.json())
                    .then(data => { })
                    .catch((err) => {
                        console.log(err);
                    })

                //  alert('Registration successfull proceed to our home page')
                swal("Good job!", "Registration successfull proceed to our home page", "success");
                refresh()
                // location.replace('Home.html')
                 window.location.href = 'Home.html'
            }

        }).catch((err) => {
            console.log(err);
        })




}
//To clear the input field

function refresh() {
    firstname.value = ''
    lastname.value = ''
    email.value = ''
    password.value = ''
    phoneno.value = ''
}
