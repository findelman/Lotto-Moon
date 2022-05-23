let btnGenerator = document.querySelector(".btn-generate");
let ticketWrapper = document.querySelector(".tickets-wrapper");
let limit = 46;
let ticket = document.querySelectorAll(".ticket");
let numActive = document.querySelectorAll(".active").length;
// let ticketNumList = document.querySelectorAll('.ticket-numlist');
let numCount = 6;
let biletCount = 1;
let outTicketNumber = document.querySelector(".out-ticket-number");
let arrayTicketNumber = [];

btnGenerator.addEventListener("click", () => {
  // biletCount++;

  ticketWrapper.innerHTML += `<div class="out-ticket-number"></div><div class="ticket"><h1 class="ticket-count">${
    biletCount + 1
  } Билет</h1><div class="ticket-prgoress-wrapper">
    <div class="ticket-progress"></div>
</div><div class="ticket-numlist"></div></div>`;

  let ticketNumList = document.querySelectorAll(".ticket-numlist");
  let ticket = document.querySelectorAll(".ticket");

  ticketNumList.forEach((elem) => {
    if (elem.innerHTML == "") {
      for (let i = 1; i <= limit; i++) {
        elem.innerHTML += `<div class="ticket-num">${i}</div>`;
      }
    }
  });

  // let tikcetsNum = document.querySelectorAll(".ticket-num");

  ticket.forEach((el) => {
    // let arrayTicketNumber = [];
    // let outTicketNumberq = el.querySelectorAll(".out-ticket-number");
    let tikcetsNumq = el.querySelectorAll(".ticket-num");
    tikcetsNumq.forEach((elem) => {
      elem.addEventListener("click", () => {
        elem.classList.toggle("active");

        numArrayPush(elem, arrayTicketNumber);  

        console.log(arrayTicketNumber);
        let numActive = el.querySelectorAll(".active").length;
        progress(el, numActive);
        // console.log(numActive);
console.log(outTicketNumber)
        outTicketNumber.innerHTML = arrayTicketNumber;
      });
    });
  });
});
window.onscroll = () => {
  // console.log(window.pageYOffset)
};

const progress = (el, numActive) => {
  let progressLine = el.querySelectorAll(".ticket-progress");
  let progressP = 100 / (numCount / numActive);
  progressLine.forEach((el) => {
    el.style.width = `${progressP}%`;
  });
};

const numArrayPush = (elem, array) => {
  let btnValue = elem.innerHTML;
  const index = array.indexOf(btnValue);
  if (elem.classList.contains("active")) {
    arrayTicketNumber.push(elem.innerHTML);
  } else {
    arrayTicketNumber.splice(index, 1);
  }
  console.log(index + " значение");
  console.log(arrayTicketNumber.indexOf());
};
