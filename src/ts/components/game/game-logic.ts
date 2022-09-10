import { ticketOutBalls } from "./ticket-out-balls"
import { gameNumbers } from "./game-numbers"
import { winCount } from "./win-count"

let gameModalWrapper = document.querySelector(".game-modal-wrapper") as HTMLEmbedElement
let gameModal = document.querySelector(".game-modal") as HTMLEmbedElement
let gameModalOverlya = document.querySelector(".game-modal-overlay") as HTMLEmbedElement
let gameModalOut = document.querySelector(".game-modal__out")
let gameModalWinOut = document.querySelector(".game-modal__win-numbers") as HTMLElement
// Тут нужен полный рефакторинг
export const gameLogic = (ticketOut, gameConfig) => {
  gameModalOut.innerHTML = ``

  ticketOutBalls(ticketOut, gameModalOut)

  gameNumbers(gameModalWinOut, gameModal)

  gameModalOverlya.addEventListener("click", () => {
    gameModalWrapper.classList.remove("show")
  })

  winCount(gameConfig)

  gameModalWrapper.classList.add("show")
}
