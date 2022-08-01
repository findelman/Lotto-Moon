// // Счетчик суммы в баскете
// const ticketPriceAmount = (ticket, index,basketObj,ticketPrice) => {
//     let summ: number = 0;
//     let ticketComplete = document.querySelectorAll(
//       '.ticket[data-ticket-complete="true"]'
//     ).length;
  
//     if (ticket.dataset.ticketComplete === "true") {
//       basketObj[index] = ticketPrice;
//       if (ticket.dataset.bigStavka !== "false") {
//         basketObj[index] = ticket.dataset.bigStavka * 9 * ticketPrice;
//       }
//     } else {
//       delete basketObj[index];
//     }
  
//     summ = 0;
  
//     for (let key in basketObj) {
//       summ += basketObj[key];
//     }
  
//     console.log(basketObj);
  
//     basketPrice.textContent = summ.toString();
  
//     if (ticketComplete >= 1) {
//       basketText.innerHTML = "Начнем же ?";
//       basketContent.classList.add("show");
//     } else {
//       basketText.innerHTML = "Чтобы начать игру соберите хотя бы 1 билет";
//       basketContent.classList.remove("show");
//     }
//   };

// export default ticketPriceAmount