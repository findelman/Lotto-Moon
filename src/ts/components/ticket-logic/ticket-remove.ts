import { basketCheckComplete } from "../basket/basket-check-ticket-complete"

// Удалить билет
export const ticketRemoveF = (ticketRemove, ticket, index,biletCount,basketObj,basketPrice,ticketOut,basketDrawSumm) => {
  let tickets = document.querySelectorAll<HTMLElement>(".ticket")
  ticketRemove.addEventListener("click", () => {
    let summ: number = 0
    // console.log(index, "index")
    ticket.remove() 
    tickets = document.querySelectorAll(".ticket")
    tickets.forEach((e, index) => {
      let count = e.querySelector(".ticket-count")
      count.innerHTML = ++index + " Билет"
      biletCount = index
    })
    delete basketObj[index]
    delete ticketOut[index]
    basketDrawSumm(basketObj,basketPrice)
    basketCheckComplete()
  })
}