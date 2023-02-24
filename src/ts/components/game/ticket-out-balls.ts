const gameModalOut = document.querySelector(".game-modal__out")

export const ticketOutBalls = (ticketOut) => {
  gameModalOut.innerHTML = ``

  for (let key in ticketOut) {
    gameModalOut.innerHTML += `<div class="game-item-wrapper"><h3>${
      parseInt(key) + 1
    } Билет</h3><div class="game-item-balls flex">${outGameBalls(key)}</div></div>`
  }

  function outGameBalls(key) {
    let gameNumbers = ``
    for (let i = 0; i < ticketOut[key].length; i++) {
      gameNumbers += `<div class="game-number">${ticketOut[key][i].innerHTML}</div>`
    }
    return gameNumbers
  }
}
