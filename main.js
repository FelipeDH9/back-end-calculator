const button1 = document.querySelector('.num1')
const buttons = document.querySelectorAll('.btn')
function teste(event) {
  console.log(event.textContent)
}

button1.addEventListener('click', teste)

function escKey(event) {
  console.log(event.key)
  // const isKeyEsc = event.key == 'Escape'
  // if (isKeyEsc) {
  //   // pressionar a tecla AC
  //   console.log('TECLA ESC!!!')
  // }
}

// document.addEventListener('keypress', escKey)

// buttons.forEach(teste2)

// function teste2() {
//   buttons.addEventListener('click', teste)
// }

console.log(buttons)
buttons.map(button => {
  button.addEventListener('click', console.log(button.textContent))
})
