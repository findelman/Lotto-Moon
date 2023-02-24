import { ticketOutBalls } from "./ticket-out-balls"
import { gameNumbers } from "./game-numbers"
import { winCount } from "./win-count"

const gameModalWrapper = document.querySelector(".game-modal-wrapper") as HTMLEmbedElement

const gameModalOverlya = document.querySelector(".game-modal-overlay") as HTMLEmbedElement

export const gameLogic = (ticketOut, gameConfig) => {
  ticketOutBalls(ticketOut)
  gameNumbers()
  winCount(gameConfig)

  gameModalWrapper.classList.add("show")
}

gameModalOverlya.addEventListener("click", () => {
  gameModalWrapper.classList.remove("show")
})
