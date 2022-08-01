// генерация цифр в билете
const generateTicketNumbers = (amountNumber) => {
    let ticketNumbers = ``;
    for (let i = 1; i <= amountNumber; i++) {
      ticketNumbers += `<button class="ticket-num">${i}</button>`;
    }
    return ticketNumbers;
  };

  export default generateTicketNumbers;