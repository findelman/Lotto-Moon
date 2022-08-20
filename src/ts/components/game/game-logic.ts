let gameModalWrapper = document.querySelector(".game-modal-wrapper") as HTMLEmbedElement
let gameModal = document.querySelector(".game-modal") as HTMLEmbedElement
let gameModalOverlya = document.querySelector(".game-modal-overlay") as HTMLEmbedElement
let gameModalOut = document.querySelector(".game-modal__out")
let gameModalWinOut = document.querySelector(".game-modal__win-numbers") as HTMLElement
// Тут нужен полный рефакторинг
export const gameLogic = (ticketOut,gameConfig) => {
  gameModalOut.innerHTML = ``
  for (let key in ticketOut) {
    gameModalOut.innerHTML += `<div class="game-item-wrapper">${
      parseInt(key) + 1
    } Билет<div class="game-item-balls flex">${outGameBalls(key)}</div></div>`
  }

  function outGameBalls(key) {
    let outBalls = ``
    for (let i = 0; i < ticketOut[key].length; i++) {
      outBalls += `<div class="out-number">${ticketOut[key][i].innerHTML}</div>`
    }
    return outBalls
  }
  let arr = []
  gameModalWinOut.innerHTML = ``
  for (let i = 0; i < 6; i++) {
    let random = Math.round(Math.random() * (46 + 1));
    let randomDuplicate = arr.includes(random);
    if (!randomDuplicate) {
      arr.push(random)
    } else {
      while (randomDuplicate) {
        random = Math.round(Math.random() * (46 + 1));
        randomDuplicate = arr.includes(random);
        if (!randomDuplicate) {
          arr.push(random)
        }
      }
    }
  }
  arr.sort((a, b) => a - b)
  for (let number of arr) {
    gameModalWinOut.innerHTML += `<div class="game-modal__win-numbers-item ">${number}</div>`
  }

  gameModalOverlya.addEventListener("click", () => {
    gameModalWrapper.classList.remove("show")
  })
  let outN = gameModal.querySelectorAll(".out-number")


for(let i = 0; i < arr.length; i++) {
    outN.forEach(e => {
        if(+e.innerHTML === arr[i] ){
            e.classList.add('win-num')
        }
    })
}
let gameCount = document.querySelectorAll('.game-item-wrapper')
gameCount.forEach(item => {
    let winNumber = item.querySelectorAll('.win-num').length
    console.log(winNumber)
    let checkWin = winNumber === 0 ? 'Ничего не выиграли' :  `Совпало ${winNumber} Выигрыш ${gameConfig.ticketPrice * winNumber}`
    item.innerHTML += checkWin
})
  gameModalWrapper.classList.add("show")
  console.log(ticketOut, arr)
}
