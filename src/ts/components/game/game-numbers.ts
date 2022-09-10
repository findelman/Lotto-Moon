export const gameNumbers = (gameModalWinOut, gameModal) => {
  let arr = []

  gameModalWinOut.innerHTML = ``
  winNumbersGenerate(arr)

  for (let number of arr) {
    gameModalWinOut.innerHTML += `<div class="game-modal__win-numbers-item ">${number}</div>`
  }
  gameNumbersRender(gameModal, arr)
}

function winNumbersGenerate(arr) {
  for (let i = 0; i < 6; i++) {
    let random = Math.round(Math.random() * (46 + 1))
    let randomDuplicate = arr.includes(random)
    if (!randomDuplicate) {
      arr.push(random)
    } else {
      while (randomDuplicate) {
        random = Math.round(Math.random() * (46 + 1))
        randomDuplicate = arr.includes(random)
        if (!randomDuplicate) {
          arr.push(random)
        }
      }
    }
    arr.sort((a, b) => a - b)
  }
}

function gameNumbersRender(gameModal, arr) {
  let gameNumbers = gameModal.querySelectorAll(".game-number")

  for (let i = 0; i < arr.length; i++) {
    gameNumbers.forEach((e) => {
      if (+e.innerHTML === arr[i]) {
        e.classList.add("win-num")
      }
    })
  }
}
