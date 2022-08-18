// Добавление активных цифрв в объект
export const ticketOutNumber = (ticket, outTicketNumber,ticketOut) => {
  let ticketCount = ticket.querySelector(".ticket-count").innerHTML;
  ticketOut[ticketCount] = ticket.querySelectorAll(".ticket-num--active");
  outNumber(ticketOut[ticketCount], outTicketNumber);
};


// Отрисовка активных цифр
const outNumber = (array, outTicketNumber) => {
  outTicketNumber.innerHTML = ``;
  for (let key of array) {
    outTicketNumber.innerHTML += `<div class="out-number">${key.innerHTML}</div>`;
  }
};

