import { basketDrawSumm } from "../basket/basket-draw-summ"

// Удалить билет
export const ticketRemoveF = (ticket, index, ticketOut, basketObj, basketPrice) => {
  let tickets = document.querySelectorAll<HTMLElement>(".ticket")
  const ticketRemove = ticket.querySelector(".ticket-remove") as HTMLElement
  ticketRemove.addEventListener("click", () => {
    ticket.remove()

    tickets = document.querySelectorAll(".ticket")
    tickets.forEach((e, index) => {
      let count = e.querySelector(".ticket-count")
      count.innerHTML = ++index + " Билет"
    })

    delete ticketOut[index]
    console.log(index, ticketOut)
    basketObj.delete(index)
    basketDrawSumm(basketObj, basketPrice)
  })
}
