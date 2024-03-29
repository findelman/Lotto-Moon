// Добавление активных цифрв в объект
export const ticketOutNumber = (ticket, ticketOut, index) => {
  const outTicketNumber = ticket.querySelector(".out-ticket-number") as HTMLElement
  
  ticketOut[index] = ticket.querySelectorAll(".ticket-num--active")

  outNumber(ticketOut[index], outTicketNumber)
}

// Отрисовка активных цифр
const outNumber = (array, outTicketNumber) => {
  outTicketNumber.innerHTML = ``
  for (let key of array) {
    outTicketNumber.innerHTML += `<div class="out-number">${key.innerHTML}</div>`
  }
}
