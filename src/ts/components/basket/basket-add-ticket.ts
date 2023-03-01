import { basketCheckComplete } from "./basket-check-ticket-complete"
import { basketDrawSumm } from "./basket-draw-summ"

// Счетчик суммы в баскете
export const basketAddTicket = (basketObj, basketPrice) => {
  const tickets = document.querySelectorAll(".ticket")
  tickets.forEach((e: HTMLElement, index) => {
    basketObj.delete(index)
    if (e.dataset.ticketComplete === "true") {
      basketObj.set(index, parseInt(e.dataset.ticketPrice))
    }
    if (!e.dataset.ticketComplete) {
      basketObj.delete(index)
    }
  })

  console.log(basketObj)

  basketCheckComplete()
  basketDrawSumm(basketObj, basketPrice)
}
