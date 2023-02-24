import { basketAddTicket } from "./components/basket/basket-add-ticket"

import { generateTicketNumbers } from "./components/create-ticket/generate-ticket-numbers"
import { ticketGenerate } from "./components/create-ticket/ticket-generate"
import { gameLogic } from "./components/game/game-logic"
import { notificationBoxShow } from "./components/notification/notifitcation-box-show"
import { swiper } from "./components/swiper"
import { limitCheck } from "./components/ticket-logic/limit-active-number"
import { progressLine } from "./components/ticket-logic/progress-line"
import { ticketAutofill } from "./components/ticket-logic/ticket-auto-fill"
import { ticketOutNumber } from "./components/ticket-logic/ticket-out-number"
import { ticketRemoveF } from "./components/ticket-logic/ticket-remove"

swiper.init()

const notificationBox = notificationBoxShow()

const addTicketBtn = document.querySelector(".btn-generate") as HTMLElement
const ticketOutWrapper = document.querySelector(".tickets-out-wrapper") as HTMLElement
const filterTicket = document.querySelector(".filter-tickets") as HTMLElement
const ticketOut = {}
const newBasket = new Map()
const basketBtn = document.querySelector(".basket-btn") as HTMLElement
const basketPrice = document.querySelector(".basket-ticket-price") as HTMLElement

export const gameConfig = {
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

// Меняем конфигурацию при смене лотереи
swiper.on("slideChangeTransitionStart", () => {
  const activeSlide = document.querySelector(".swiper-slide-active") as HTMLElement
  let [digitLimit, totalDigits] = activeSlide.dataset.game.split("/")
  _gameConfig(activeSlide.dataset.price, digitLimit, totalDigits, activeSlide.dataset.game)

  notificationBox()
})

basketBtn.addEventListener("click", () => {
  gameLogic(ticketOut, gameConfig)
})

addTicketBtn.addEventListener("click", () => {
  ticketGenerate(
    ticketOutWrapper,
    generateTicketNumbers(amountNumber),
    gameName,
    limitNumber,
    ticketPrice
  )
  ticketClick()

  // свайп к последнему слайду
  let ticket = document.querySelectorAll(".ticket")
  ticket[ticket.length - 1].scrollIntoView()
})

// Клики по цифрам внутри определенного билета
function ticketClick() {
  const ticket = document.querySelectorAll(".ticket")
  ticket.forEach((ticket: HTMLElement, index) => {
    const tikcetsNum = ticket.querySelectorAll<HTMLButtonElement>(".ticket-num")

    tikcetsNum.forEach((ticketsNumBtn) => {
      ticketsNumBtn.addEventListener("click", () => {
        ticketsNumBtn.classList.toggle("ticket-num--active")
        const numActive = ticket.querySelectorAll(".ticket-num--active").length

        limitCheck(numActive, tikcetsNum, ticket)
        progressLine(ticket, numActive, parseInt(ticket.dataset.limitNumber))
        basketAddTicket(newBasket, basketPrice)
        ticketOutNumber(ticket, ticketOut, index)
      })
    })

    ticketAutofill(tikcetsNum, ticket)
    ticketRemoveF(ticket, index, ticketOut)
  })
}
const observerDeleteTicket = new MutationObserver((mutationRecords) => {
  basketAddTicket(newBasket, basketPrice)
  let summ: number = 0
  summ = 0
  newBasket.forEach((value) => {
    summ += value
  })

  basketPrice.textContent = `Сумма: ${summ.toString()}`
})

// Наблюдаем за удалением
observerDeleteTicket.observe(ticketOutWrapper, {
  childList: true,
})

for (let i = 0; i < 3; i++) {
  ticketGenerate(
    ticketOutWrapper,
    generateTicketNumbers(amountNumber),
    gameName,
    limitNumber,
    ticketPrice
  )
}
ticketClick()

filterTicket.addEventListener("click", () => {
  ticketOutWrapper.classList.toggle("ticket-column")
})
