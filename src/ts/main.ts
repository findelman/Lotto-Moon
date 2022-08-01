import generateTicketNumbers from "./components/create-ticket/generate-ticket-numbers";
import ticketGenerate from "./components/create-ticket/ticket-generate";
import {limitCheck} from "./components/ticket-logyc/limit-active-number";
import progressLine from "./components/ticket-logyc/progress-line";
import ticketAutofill from "./components/ticket-logyc/ticket-auto-fill";
import {outNumber, numArrayPush} from "./components/ticket-logyc/ticket-out-number";

let btnGenerator = document.querySelector(".btn-generate") as HTMLElement;
let ticketOutWrapper = document.querySelector(
  ".tickets-out-wrapper"
) as HTMLElement;
let basket = document.querySelector(".basket") as HTMLElement;
let amountNumber: number = 46;
let limitNumber: number = 6;
let biletCount: number = 0;
let basketText = document.querySelector(".basket-text") as HTMLElement;
let basketContent = document.querySelector(
  ".basket-hidden-content"
) as HTMLElement;
let basketPrice = document.querySelector(".basket-ticket-price") as HTMLElement;
let basketObj = {};
let filterTicket = document.querySelector(".filter-tickets") as HTMLElement;
let ticketPrice: number = 200;
// let arrayTicketNumber = [];

let gameConfig = {
  ticketPrice: 200,
  limitNumber: 6,
  amountNumber: 46,  
}


btnGenerator.addEventListener("click", () => {
  ticketGenerate(
    ticketOutWrapper,
    ++biletCount,
    generateTicketNumbers(amountNumber)
  );
  ticketClick();
});

// Клики по цифрам внутри определенного билета
function ticketClick() {
  let ticket = document.querySelectorAll(".ticket");
  ticket.forEach((ticket, index) => {
    let tikcetsNum = ticket.querySelectorAll<HTMLButtonElement>(".ticket-num") ;
    let ticketBtnAutoFill = ticket.querySelector(".ticket-autofill") as HTMLButtonElement;
    let outTicketNumber = ticket.querySelector(".out-ticket-number") as HTMLElement;
    let ticketRemove = ticket.querySelector(".ticket-remove") as HTMLElement;
    ticket[index] = [];

    tikcetsNum.forEach((ticketsNumBtn) => {
      ticketsNumBtn.addEventListener("click", () => {
        ticketsNumBtn.classList.toggle("active");
        let numActive = ticket.querySelectorAll(".active").length;

        console.log(ticket[index]);
        limitCheck(numActive, tikcetsNum, ticket,limitNumber);
        progressLine(ticket, numActive, limitNumber);
        numArrayPush(ticketsNumBtn, ticket[index]);
        outNumber(ticket[index], outTicketNumber);
        ticketPriceAmount(ticket, index);
      });
    });

    ticketAutofill(ticketBtnAutoFill, ticket, tikcetsNum,limitNumber,amountNumber);
    ticketRemoveF(ticketRemove, ticket);
  });
}
// Счетчик суммы в баскете
const ticketPriceAmount = (ticket, index) => {
  let summ: number = 0;
  let ticketComplete = document.querySelectorAll(
    '.ticket[data-ticket-complete="true"]'
  ).length;

  if (ticket.dataset.ticketComplete === "true") {
    basketObj[index] = ticketPrice;
    basketObj[index + 'Числа'] = '123'

    if (ticket.dataset.bigStavka !== "false") {
      basketObj[index] = ticket.dataset.bigStavka * 9 * ticketPrice;
      basketObj[index + 'Числа'] = ticket.querySelectorAll('')
    }
  } else {
    delete basketObj[index];
  }

  summ = 0;

  for (let key in basketObj) {
    summ += basketObj[key];
  }

  console.log(basketObj);

  basketPrice.textContent = summ.toString();

  if (ticketComplete >= 1) {
    basketText.innerHTML = "Начнем же ?";
    basketContent.classList.add("show");
  } else {
    basketText.innerHTML = "Чтобы начать игру соберите хотя бы 1 билет";
    basketContent.classList.remove("show");
  }
};


// Удалить билет
const ticketRemoveF = (ticketRemove, ticket) => {
  let tickets = document.querySelectorAll(".ticket");

  ticketRemove.addEventListener("click", () => {
    ticket.remove();
    tickets.forEach((e, index) => {
      let count = e.querySelector(".ticket-count");
      count.innerHTML = index++ + " Билет";
      console.log();
      console.log(e);
    });
    let ticketq = document.querySelectorAll(".ticket");
    ticketq.forEach((tickets) => {
      let counter = tickets.querySelector(".ticket-count");
    });
  });
};


// window.onscroll = ()=> {
//   if(window.pageYOffset > 200) {
//     basket.style.cssText = `position: fixed; right: 0`
//   }}
for (let i = 0; i < 3; i++) {
  btnGenerator.click();
}

filterTicket.addEventListener("click", () => {
  ticketOutWrapper.classList.toggle("ticket-column");
});
