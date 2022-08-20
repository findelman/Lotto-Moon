// генерация цифр в билете
export const generateTicketNumbers = (amountNumber) => {
    let ticketNumbers = ``;
    for (let i = 1; i <= amountNumber; i++) {
      ticketNumbers += `<button class="ticket-num">${i}</button>`;
    }
    return ticketNumbers;
  };

