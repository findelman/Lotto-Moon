// генерация цифр в билете
const generateTicketNumbers = (amountNumber) => {
    let ticketNumbers = ``;
    for (let i = 1; i <= amountNumber; i++) {
      ticketNumbers += `<div class="ticket-num">${i}</div>`;
    }
    return ticketNumbers;
  };

  export default generateTicketNumbers;