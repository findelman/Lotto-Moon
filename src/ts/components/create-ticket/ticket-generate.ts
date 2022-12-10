// генерация билета
export const ticketGenerate = (
  ticketOutWrapper: HTMLElement,
  generateTicketNumbers,
  gameName: string,
  limitNumber: number,
  ticketPrice: number
) => {
  ticketOutWrapper.innerHTML += `<div class="ticket" data-limit-number="${limitNumber}" data-ticket-price="${ticketPrice}"><div class="ticket-remove"></div><h1 class="ticket-count">${
    document.querySelectorAll(".ticket").length + 1
  } Билет</h1><div class="out-ticket-number"></div><div class="ticket-prgoress-wrapper">
    <div class="ticket-progress"></div>
</div><div class="ticket-numlist">${generateTicketNumbers}</div> <button class="ticket-autofill default-btn">Собрать билет</button><div class="ticket-gameN">${gameName}</div></div>`
}
