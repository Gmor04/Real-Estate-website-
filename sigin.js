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

let signinemail = document.querySelector('.signinemail');
let signinpassword = document.querySelector('.signinpass');


// signin
async function signin() {
//    console.log('active');
    if (signinemail.value == '' || signinpassword.value == '' ) {
        // alert('Kindly fill in the neccessary')
        return swal("oppos!", "Kindly fill in the neccessary", "info");
    }

    await fetch(url + 'User')
    .then(e => e.json())
    .then(data => {
        let userData = data.find(j=> {
            return j.emailaddress === signinemail.value 
        })
        console.log(userData);
        if (!userData) {
            // alert('incorrect username and password')
            return swal("oppos!", "Incorrect Email Address and Password", "warning");
        }
        else{
            if (userData.password == signinpassword.value) {
                swal("Good job!", "Login successfull proceed to our home page", "success");
                location.href = 'Home.html'
                refresh()
                // alert('username logged in')
            }else{

            }
        }
    })


}

function refresh() {
    signinemail = ''
    signinpassword = ''

}