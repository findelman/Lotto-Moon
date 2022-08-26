import { basketCheckComplete } from "../basket/basket-check-ticket-complete"

// Удалить билет
export const ticketRemoveF = (ticketRemove, ticket, index,basketObj,basketPrice,ticketOut,basketDrawSumm) => {
  let tickets = document.querySelectorAll<HTMLElement>(".ticket")
  ticketRemove.addEventListener("click", () => {
    ticket.remove() 
    tickets = document.querySelectorAll(".ticket")
    tickets.forEach((e, index) => {
      let count = e.querySelector(".ticket-count")
      count.innerHTML = ++index + " Билет"
    })
    delete basketObj[index]
    delete ticketOut[index]
    basketDrawSumm(basketObj,basketPrice)
    basketCheckComplete()
  })
}