import generateTicketNumbers from "./components/create-ticket/generate-ticket-numbers";
import ticketGenerate from "./components/create-ticket/ticket-generate";

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
console.log('123 321');
console.log('321 123');


btnGenerator.addEventListener("click", () => {
  ticketGenerate(
    ticketOutWrapper,
    biletCount,
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
        limitCheck(numActive, tikcetsNum, ticket);
        progress(ticket, numActive);
        numArrayPush(ticketsNumBtn, ticket[index]);
        outNumber(ticket[index], outTicketNumber);
        ticketPriceAmount(ticket, index);
      });
    });

    ticketAutofill(ticketBtnAutoFill, ticket, tikcetsNum);
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
  console.log(summ);

  basketPrice.textContent = summ.toString();

  if (ticketComplete >= 1) {
    basketText.innerHTML = "Начнем же ?";
    basketContent.classList.add("show");
  } else {
    basketText.innerHTML = "Чтобы начать игру соберите хотя бы 1 билет";
    basketContent.classList.remove("show");
  }
};

// Собрать билет
const ticketAutofill = (ticketBtnAutoFill, ticket, tikcetsNum) => {
  ticketBtnAutoFill.addEventListener("click", () => {
    let randomArr = [];
    ticket = [];
    tikcetsNum.forEach((ticketsNumBtn) => {
      if (ticketsNumBtn.classList.contains("active")) {
        ticketsNumBtn.classList.remove("active");
      }
    });
    for (let i = 0; i < limitNumber; i++) {
      let random = Math.round(Math.random() * (amountNumber - 1));
      let randomDuplicate = randomArr.includes(random);
      if (!randomDuplicate) {
        tikcetsNum[random].click();
      } else {
        while (randomDuplicate) {
          random = Math.round(Math.random() * (amountNumber - 1));
          randomDuplicate = randomArr.includes(random);
          if (!randomDuplicate) {
            tikcetsNum[random].click();
          }
        }
      }
    }
  });
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

// Проверка на заполненость
const limitCheck = (numActive, tikcetsNum, ticket) => {
  if (numActive === limitNumber && limitNumber === 10) {
    tikcetsNum.forEach((all) => {
      if (!all.classList.contains("active")) {
        all.setAttribute("disabled", "");
      }
    });
  }
  if (numActive === limitNumber) {
    ticket.setAttribute("data-ticket-complete", `true`);
  }
  if (numActive > limitNumber) {
    limitNumber = 10;
    ticket.setAttribute("data-big-stavka", "true");
  }
  if (numActive <= 6) {
    limitNumber = 6;
    ticket.setAttribute("data-big-stavka", "false");
  }
  if (numActive < 6) {
    ticket.setAttribute("data-ticket-complete", "false");
  }
  if (numActive > 6) {
    ticket.setAttribute("data-big-stavka", `${numActive - 6}`);
  }
  if (numActive !== limitNumber) {
    tikcetsNum.forEach((all) => {
      {
        all.removeAttribute("disabled");
      }
    });
  }
};

ticketGenerate(
  ticketOutWrapper,
  biletCount,
  generateTicketNumbers(amountNumber)
);

// Прогресс лайн
const progress = (el, numActive) => {
  let progressLine = el.querySelector(".ticket-progress");
  let progressP = 100 / (limitNumber / numActive);
  progressLine.style.width = `${progressP}%`;
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
for (let i = 0; i < 2; i++) {
  btnGenerator.click();
}

filterTicket.addEventListener("click", () => {
  ticketOutWrapper.classList.toggle("ticket-column");
});
