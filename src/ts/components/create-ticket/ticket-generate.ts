
// генерация билета
const  ticketGenerate = (ticketOutWrapper: HTMLElement,biletCount: number,generateTicketNumbers) => {
  ticketOutWrapper.innerHTML += `<div class="ticket"><div class="ticket-remove"></div><h1 class="ticket-count">${biletCount} Билет</h1><div class="out-ticket-number"></div><div class="ticket-prgoress-wrapper">
    <div class="ticket-progress"></div>
</div><div class="ticket-numlist">${generateTicketNumbers}</div> <button class="ticket-autofill default-btn">Собрать билет</button></div>`;
  };


  export default ticketGenerate