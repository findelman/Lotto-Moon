import { basketCheckComplete } from "./basket-check-ticket-complete"

// Счетчик суммы в баскете
export const basketAddTicket = (
  ticket,
  index,
  basketObj,
  basketDrawSumm,  
  basketPrice
) => {
  if (ticket.dataset.ticketComplete === "true") {
    basketObj[index] = parseInt(ticket.dataset.ticketPrice)
  } else {
    delete basketObj[index]
  }
  basketCheckComplete()
  basketDrawSumm(basketObj, basketPrice)
}
