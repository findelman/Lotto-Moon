const gameModal = document.querySelector(".game-modal") as HTMLEmbedElement
const gameModalWinOut = document.querySelector(".game-modal__win-numbers") as HTMLElement

export const gameNumbers = () => {
  const arr = []

  gameModalWinOut.innerHTML = ``
  winNumbersGenerate(arr)

  for (let number of arr) {
    gameModalWinOut.innerHTML += `<div class="game-modal__win-numbers-item ">${number}</div>`
  }
  gameNumbersRender(gameModal, arr)
}

function winNumbersGenerate(arr) {
  while (arr.length < 6) {
    const random = Math.round(Math.random() * 46 + 1)
    if (!arr.includes(random)) {
      arr.push(random)
    }
    arr.sort((a, b) => a - b)
  }
}

function gameNumbersRender(gameModal, arr) {
  const gameNumbers = gameModal.querySelectorAll(".game-number")

  for (let i = 0; i < arr.length; i++) {
    gameNumbers.forEach((e) => {
      if (+e.innerHTML === arr[i]) {
        e.classList.add("win-num")
      }
    })
  }
}
