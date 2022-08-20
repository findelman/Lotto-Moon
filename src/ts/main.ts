import { basketAddTicket } from "./components/basket/basket-add-ticket"
import { basketDrawSumm } from "./components/basket/basket-draw-summ"
import { generateTicketNumbers } from "./components/create-ticket/generate-ticket-numbers"
import { ticketGenerate } from "./components/create-ticket/ticket-generate"
import { gameLogic } from "./components/game/game-logic"
import { swiper } from "./components/swiper"
import { limitCheck } from "./components/ticket-logic/limit-active-number"
import { progress } from "./components/ticket-logic/progress-line"
import { ticketAutofill } from "./components/ticket-logic/ticket-auto-fill"
import { ticketOutNumber } from "./components/ticket-logic/ticket-out-number"
import { ticketRemoveF } from "./components/ticket-logic/ticket-remove"

swiper.init()

let addTicketBtn = document.querySelector(".btn-generate") as HTMLElement
let ticketOutWrapper = document.querySelector(".tickets-out-wrapper") as HTMLElement
let biletCount: number = 0
let filterTicket = document.querySelector(".filter-tickets") as HTMLElement
let ticketOut = {}
let basketObj: { index?: string; ticketPrice?: number } = {}
let basketBtn = document.querySelector(".basket-btn") as HTMLElement
let basketPrice = document.querySelector(".basket-ticket-price") as HTMLElement

let gameConfig = {
  ticketPrice: 200,
  limitNumber: 6,
  amountNumber: 46,
  gameName: "6/46",
}
let { ticketPrice, limitNumber, amountNumber, gameName } = gameConfig
const _gameConfig = (_ticketPrice, _limitNumber, _amountNumber, _gameName) => {
  ;(ticketPrice = _ticketPrice),
    (limitNumber = _limitNumber),
    (amountNumber = _amountNumber),
    (gameName = _gameName)
}

let clearTimeout
let notificationBox = document.querySelector(".notification-box")
swiper.on("slideChangeTransitionStart", () => {
  let activeSlide = document.querySelector(".swiper-slide-active") as HTMLElement
  let [digitLimit, totalDigits] = activeSlide.dataset.game.split("/")
  _gameConfig(100, digitLimit, totalDigits, activeSlide.dataset.game)

  notificationBox.classList.add("show-f")
  clearInterval(clearTimeout)
  clearTimeout = setTimeout(() => {
    notificationBox.classList.remove("show-f")
  }, 3000)
})

basketBtn.addEventListener("click", () => {
  gameLogic(ticketOut)
})

addTicketBtn.addEventListener("click", () => {
  ticketGenerate(
    ticketOutWrapper,
    ++biletCount,
    generateTicketNumbers(amountNumber),
    gameName,
    limitNumber,
    ticketPrice
  )
  ticketClick()

  let ticket = document.querySelectorAll(".ticket")
  ticket[ticket.length - 1].scrollIntoView()
})

// Клики по цифрам внутри определенного билета
function ticketClick() {
  let ticket = document.querySelectorAll(".ticket")
  ticket.forEach((ticket: HTMLElement, index) => {
    let tikcetsNum = ticket.querySelectorAll<HTMLButtonElement>(".ticket-num")
    let ticketBtnAutoFill = ticket.querySelector(".ticket-autofill") as HTMLButtonElement
    let outTicketNumber = ticket.querySelector(".out-ticket-number") as HTMLElement
    let ticketRemove = ticket.querySelector(".ticket-remove") as HTMLElement

    tikcetsNum.forEach((ticketsNumBtn) => {
      ticketsNumBtn.addEventListener("click", () => {
        ticketsNumBtn.classList.toggle("ticket-num--active")
        let numActive = ticket.querySelectorAll(".ticket-num--active").length

        limitCheck(numActive, tikcetsNum, ticket)
        progress(ticket, numActive, parseInt(ticket.dataset.limitNumber))
        basketAddTicket(ticket, index, basketObj, basketDrawSumm, gameConfig, basketPrice)
        ticketOutNumber(ticket, outTicketNumber, ticketOut, index)
        // console.log(ticketOut)
      })
    })

    ticketAutofill(
      ticketBtnAutoFill,
      tikcetsNum,
      parseInt(ticket.dataset.limitNumber),
      tikcetsNum.length
    )
    ticketRemoveF(
      ticketRemove,
      ticket,
      index,
      biletCount,
      basketObj,
      basketPrice,
      ticketOut,
      basketDrawSumm
    )
  })
}

for (let i = 0; i < 3; i++) {
  ticketGenerate(
    ticketOutWrapper,
    ++biletCount,
    generateTicketNumbers(amountNumber),
    gameName,
    limitNumber,
    ticketPrice
  )
  // невероятная оптимизация
  if (i === 2) {
    ticketClick()
  }
}

filterTicket.addEventListener("click", () => {
  ticketOutWrapper.classList.toggle("ticket-column")
})
