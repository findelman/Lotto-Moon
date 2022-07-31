// const ticketClick = () => {
//     let ticket = document.querySelectorAll(".ticket");
//     ticket.forEach((ticket, index) => {
//       let tikcetsNum = ticket.querySelectorAll(".ticket-num");
//       let ticketBtnAutoFill = ticket.querySelector(".ticket-autofill");
//       let outTicketNumber = ticket.querySelector(".out-ticket-number");
//       let ticketRemove = ticket.querySelector(".ticket-remove");
//       ticket[index] = [];
  
//       tikcetsNum.forEach((ticketsNumBtn) => {
//         ticketsNumBtn.addEventListener("click", () => {
//           ticketsNumBtn.classList.toggle("active");
//           let numActive = ticket.querySelectorAll(".active").length;
  
//           console.log(ticket[index]);
//           limitCheck(numActive, tikcetsNum, ticket);
//           progress(ticket, numActive);
//           numArrayPush(ticketsNumBtn, ticket[index]);
//           outNumber(ticket[index], outTicketNumber);
//           ticketPriceAmount(ticket, index);
//         });
//       });
  
//       ticketAutofill(ticketBtnAutoFill, ticket, tikcetsNum);
//       ticketRemoveF(ticketRemove, ticket);
//     });
//   }

// export default ticketClick