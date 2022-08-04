import { basketSelectors } from "./components/basket/basket-selectors";
import generateTicketNumbers from "./components/create-ticket/generate-ticket-numbers";
import ticketGenerate from "./components/create-ticket/ticket-generate";
import { swiper } from "./components/swiper";
import { limitCheck } from "./components/ticket-logic/limit-active-number";
import progress from "./components/ticket-logic/progress-line";
import ticketAutofill from "./components/ticket-logic/ticket-auto-fill";
import {
  outNumber,
  numArrayPush,
} from "./components/ticket-logic/ticket-out-number";


swiper

let addTicketBtn = document.querySelector(".btn-generate") as HTMLElement;
let ticketOutWrapper = document.querySelector(
  ".tickets-out-wrapper"
) as HTMLElement;
let biletCount: number = 0;
let basketObj = {};
let filterTicket = document.querySelector(".filter-tickets") as HTMLElement;
let basketBtn = document.querySelector('.basket-btn') as HTMLElement;

let gameConfig = {
  ticketPrice: 200,
  limitNumber: 6,
  amountNumber: 46,
  gameName: '6/46',
};


const _gameConfig = (ticketPrice,limitNumber,amountNumber,gameName)=> {
  gameConfig.ticketPrice = ticketPrice,
  gameConfig.limitNumber = limitNumber,
  gameConfig.amountNumber = amountNumber,
  gameConfig.gameName = gameName;
}
let clearTimeout
let notificationBox = document.querySelector('.notification-box')
swiper.on('slideChangeTransitionStart', () => {
  
  let activeSlide = document.querySelector('.swiper-slide-active') as HTMLElement
  let splitData = activeSlide.dataset.game.split('/')
  _gameConfig(100,splitData[0],splitData[splitData.length - 1], splitData.join('/'))
  console.log(gameConfig.gameName)
  notificationBox.classList.add('show-f')
clearInterval(clearTimeout)

   clearTimeout = setTimeout(() => {
    notificationBox.classList.remove('show-f')
  }, 3000);

  console.log(splitData)
})

basketBtn.onclick = () => {
  console.log('123')
}
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
  ticket.forEach((ticket, index) => {
    let tikcetsNum = ticket.querySelectorAll<HTMLButtonElement>(".ticket-num");
    let ticketBtnAutoFill = ticket.querySelector(".ticket-autofill") as HTMLButtonElement;
    let outTicketNumber = ticket.querySelector(".out-ticket-number") as HTMLElement;
    let ticketRemove = ticket.querySelector(".ticket-remove") as HTMLElement;
    ticket["array"] = [];

    tikcetsNum.forEach((ticketsNumBtn) => {
      ticketsNumBtn.addEventListener("click", () => {
        ticketsNumBtn.classList.toggle("ticket-num--active");
        let numActive = ticket.querySelectorAll(".ticket-num--active").length;

        console.log(ticket[index]);
        limitCheck(numActive, tikcetsNum, ticket, gameConfig);
        progress(ticket, numActive, gameConfig.limitNumber);
        numArrayPush(ticketsNumBtn, ticket["array"]);
        outNumber(ticket["array"], outTicketNumber);
        ticketPriceAmount(ticket, index);
      });
    });

    ticketAutofill(
      ticketBtnAutoFill,
      ticket,
      tikcetsNum,
      gameConfig.limitNumber,
      gameConfig.amountNumber
    );
    ticketRemoveF(ticketRemove, ticket,index);
  });
}

basketSelectors();
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
const ticketRemoveF = (ticketRemove, ticket,index) => {
  let tickets = document.querySelectorAll<HTMLElement>(".ticket");
  ticketRemove.addEventListener("click", () => {
    ticket.remove();
    console.log(index,'index')
    delete basketObj[index]
    console.log(basketObj);
    ticketPriceAmount(ticket, index)
    tickets = document.querySelectorAll(".ticket");
    tickets.forEach((e, index) => {
      let count = e.querySelector(".ticket-count");
      count.innerHTML = ++index + " Билет";
      biletCount = index
    });
    console.log(tickets.length);
    // if (tickets.length === 1) {
    //   console.log("last");
    //   tickets[0].querySelector<HTMLElement>(".ticket-remove").style.display =
    //     "none";
    // } else {
    //   tickets[0].querySelector<HTMLElement>(".ticket-remove").style.display =
    //     "block";
    //   console.log("321");
    // }
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
