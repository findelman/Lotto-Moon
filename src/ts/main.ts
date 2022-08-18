import generateTicketNumbers from "./components/create-ticket/generate-ticket-numbers";
import { ticketGenerate } from "./components/create-ticket/ticket-generate";
import { swiper } from "./components/swiper";
import { limitCheck } from "./components/ticket-logic/limit-active-number";
import progress from "./components/ticket-logic/progress-line";
import ticketAutofill from "./components/ticket-logic/ticket-auto-fill";
import {ticketOutNumber } from "./components/ticket-logic/ticket-out-number";

swiper.init();

let addTicketBtn = document.querySelector(".btn-generate") as HTMLElement;
let ticketOutWrapper = document.querySelector(
  ".tickets-out-wrapper"
) as HTMLElement;
let biletCount: number = 0;
let basketObj = {};
let ticketOut = {};
let filterTicket = document.querySelector(".filter-tickets") as HTMLElement;
let basketBtn = document.querySelector(".basket-btn") as HTMLElement;

let gameConfig = {
  ticketPrice: 200,
  limitNumber: 6,
  amountNumber: 46,
  gameName: "6/46",
};

const _gameConfig = (ticketPrice, limitNumber, amountNumber, gameName) => {
  gameConfig.ticketPrice = ticketPrice,
    gameConfig.limitNumber = limitNumber,
    gameConfig.amountNumber = amountNumber,
    gameConfig.gameName = gameName;
};

let clearTimeout;
let notificationBox = document.querySelector(".notification-box");
swiper.on("slideChangeTransitionStart", () => {
  let activeSlide = document.querySelector(
    ".swiper-slide-active"
  ) as HTMLElement;
  let [digitLimit,totalDigits] = activeSlide.dataset.game.split("/");
  _gameConfig(
    100,
    digitLimit,
    totalDigits,
    activeSlide.dataset.game
  );
  // console.log(gameConfig.gameName);
  notificationBox.classList.add("show-f");
  clearInterval(clearTimeout);
  clearTimeout = setTimeout(() => {
    notificationBox.classList.remove("show-f");
  }, 3000);
});

basketBtn.onclick = () => {
  console.log("123");
};
addTicketBtn.addEventListener("click", () => {
  ticketGenerate(
    ticketOutWrapper,
    ++biletCount,
    generateTicketNumbers(gameConfig.amountNumber),
    gameConfig.gameName
  );
  ticketClick();

  let ticket = document.querySelectorAll(".ticket");
  ticket[ticket.length - 1].scrollIntoView();
});



// Клики по цифрам внутри определенного билета
function ticketClick() {
  let ticket = document.querySelectorAll(".ticket");
  ticket.forEach((ticket: HTMLElement, index) => {
    let tikcetsNum = ticket.querySelectorAll<HTMLButtonElement>(".ticket-num");
    let ticketBtnAutoFill = ticket.querySelector(
      ".ticket-autofill"
    ) as HTMLButtonElement;
    let outTicketNumber = ticket.querySelector(
      ".out-ticket-number"
    ) as HTMLElement;
    let ticketRemove = ticket.querySelector(".ticket-remove") as HTMLElement;

    tikcetsNum.forEach((ticketsNumBtn) => {
      ticketsNumBtn.addEventListener("click", () => {
        ticketsNumBtn.classList.toggle("ticket-num--active");
        let numActive = ticket.querySelectorAll(".ticket-num--active").length;

        limitCheck(numActive, tikcetsNum, ticket, gameConfig);
        progress(ticket, numActive, gameConfig.limitNumber);
        ticketPriceAmount(ticket, index);
        ticketOutNumber(ticket, outTicketNumber,ticketOut);
      });
    });

    ticketAutofill(
      ticketBtnAutoFill,
      ticket,
      tikcetsNum,
      gameConfig.limitNumber,
      gameConfig.amountNumber
    );
    ticketRemoveF(ticketRemove, ticket, index);
  });
}

let basketText = document.querySelector(".basket-text") as HTMLElement;
let basketContent = document.querySelector(
  ".basket-hidden-content"
) as HTMLElement;
let basketPrice = document.querySelector(".basket-ticket-price") as HTMLElement;
// Счетчик суммы в баскете
const ticketPriceAmount = (ticket, index) => {
  let summ: number = 0;
  let ticketComplete = document.querySelectorAll(
    '.ticket[data-ticket-complete="true"]'
  ).length;

  if (ticket.dataset.ticketComplete === "true") {
    basketObj[index] = gameConfig.ticketPrice;
  } else {
    delete basketObj[index];
  }

  summ = 0;

  for (let key in basketObj) {
    summ += basketObj[key];
  }

  console.log(basketObj);

  basketPrice.textContent = `Сумма: ${summ.toString()}`;

  if (ticketComplete >= 1) {
    basketText.innerHTML = "Начнем же ?";
    basketContent.classList.add("show");
  } else {
    basketText.innerHTML = "Чтобы начать игру соберите хотя бы 1 билет";
    basketContent.classList.remove("show");
  }
};

// Удалить билет
const ticketRemoveF = (ticketRemove, ticket, index) => {
  let tickets = document.querySelectorAll<HTMLElement>(".ticket");
  ticketRemove.addEventListener("click", () => {
    ticket.remove();
    console.log(index, "index");
    delete basketObj[index];
    console.log(basketObj);
    ticketPriceAmount(ticket, index);
    tickets = document.querySelectorAll(".ticket");
    tickets.forEach((e, index) => {
      let count = e.querySelector(".ticket-count");
      count.innerHTML = ++index + " Билет";
      biletCount = index;
    });
    delete ticketOut[ticket.querySelector(".ticket-count").innerHTML];
  });
};

for (let i = 0; i < 3; i++) {
  ticketGenerate(
    ticketOutWrapper,
    ++biletCount,
    generateTicketNumbers(gameConfig.amountNumber),
    gameConfig.gameName
  );
  // невероятная оптимизация
  if (i === 2) {
    ticketClick();
  }
}

filterTicket.addEventListener("click", () => {
  ticketOutWrapper.classList.toggle("ticket-column");
});
