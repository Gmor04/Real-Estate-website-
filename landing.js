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