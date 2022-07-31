import generateTicketNumbers from "./components/create-ticket/generate-ticket-numbers";
import ticketGenerate from "./components/create-ticket/ticket-generate";
import limitCheck from "./components/ticket-logyc/limit-active-number";
import progress from "./components/ticket-logyc/progress-line";
import ticketAutofill from "./components/ticket-logyc/ticket-auto-fill";

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
console.log('123');


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
    let tikcetsNum = ticket.querySelectorAll(".ticket-num");
    let ticketBtnAutoFill = ticket.querySelector(".ticket-autofill");
    let outTicketNumber = ticket.querySelector(".out-ticket-number");
    let ticketRemove = ticket.querySelector(".ticket-remove");
    ticket[index] = [];

    tikcetsNum.forEach((ticketsNumBtn) => {
      ticketsNumBtn.addEventListener("click", () => {
        ticketsNumBtn.classList.toggle("active");
        let numActive = ticket.querySelectorAll(".active").length;

        console.log(ticket[index]);
        limitCheck(numActive, tikcetsNum, ticket,limitNumber);
        progress(ticket, numActive, limitNumber);
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
    if (ticket.dataset.bigStavka !== "false") {
      basketObj[index] = ticket.dataset.bigStavka * 9 * ticketPrice;
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

// Отрисовка активных цифр
const outNumber = (array, outTicketNumber) => {
  outTicketNumber.innerHTML = ``;
  array.sort((a, b) => a - b);
  for (let key of array) {
    outTicketNumber.innerHTML += `<div class="out-number">${key}</div>`;
  }
};





// добовляем активные цифры в массив
function numArrayPush(elem, array) {
  if (elem.classList.contains("active")) {
    array.push(elem.innerHTML);
  } else {
    array.splice(array.indexOf(elem.innerHTML), 1);
  }
}

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
