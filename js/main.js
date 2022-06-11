let btnGenerator = document.querySelector(".btn-generate");
let ticketOutWrapper = document.querySelector(".tickets-out-wrapper");
let basket = document.querySelector('.basket')
let amountNumber = 46;
let limitNumber = 6;
let biletCount = 0;
// let arrayTicketNumber = [];

btnGenerator.addEventListener("click", () => {
  ticketGenerate();
});

// генерация билета

const ticketGenerate = () => {
  ticketOutWrapper.innerHTML += `<div class="ticket"><h1 class="ticket-count">${++biletCount} Билет</h1><div class="out-ticket-number"></div><div class="ticket-prgoress-wrapper">
    <div class="ticket-progress"></div>
</div><div class="ticket-numlist"></div></div>`;
  let ticketNumList = document.querySelectorAll(".ticket-numlist");
  let ticket = document.querySelectorAll(".ticket");
  ticketNumList.forEach((elem) => {
    if (elem.innerHTML == "") {
      for (let i = 1; i <= amountNumber; i++) {
        elem.innerHTML += `<div class="ticket-num">${i}</div>`;
      }
    }
  });
  if(ticket.length === 3) {
    document.body.style.background = '#ffeb3b'
  }
  ticketClick(ticket);
};


function ticketClick(ticket, massiv) {

  ticket.forEach((el) => {
    let tikcetsNum = el.querySelectorAll(".ticket-num");

    let outTicketNumber = el.querySelector(".out-ticket-number");
    massiv = [];

    tikcetsNum.forEach((elem) => {

      elem.addEventListener("click", () => {
        elem.classList.toggle("active");
        let numActive = el.querySelectorAll(".active").length;
        if(numActive === limitNumber) {
            tikcetsNum.forEach((all)=>{  if(!all.classList.contains('active')) {
              all.setAttribute('disabled','true')
            }})        
        }
        else if (numActive !== limitNumber){
          tikcetsNum.forEach((all)=>{  {
            all.removeAttribute('disabled')
          }})   
        }
        progress(el, numActive);
        numArrayPush(elem, massiv);
        outNumber(massiv,outTicketNumber)
        console.log(outTicketNumber);
        // outTicketNumber.innerHTML = massiv;
      });

    });
  });
}

const outNumber = (massiv,outTicketNumber) => {

  outTicketNumber.innerHTML = ``
  massiv.sort((a,b) => a -b)
   for(let key of massiv) {
     outTicketNumber.innerHTML += `<div class="out-number">${key}</div>`
   }

}


//  Клики блики
// function ticketClick(ticket) {

//   ticket.forEach((el) => {
//     let tikcetsNumq = el.querySelectorAll(".ticket-num");

//     let outTicketNumber = el.querySelector(".out-ticket-number");
//   let arrayTicketNumber = [];

//     tikcetsNumq.forEach((elem) => {

//       elem.addEventListener("click", () => {
//         elem.classList.toggle("active");
//         let numActive = el.querySelectorAll(".active").length;

//         progress(el, numActive);
//         numArrayPush(elem, arrayTicketNumber);

//         console.log(arrayTicketNumber);
//         console.log(outTicketNumber);
//         outTicketNumber.innerHTML = arrayTicketNumber;
//       });
//     });
//   });
// }

ticketGenerate();
const progress = (el, numActive) => {
  let progressLine = el.querySelectorAll(".ticket-progress");
  let progressP = 100 / (limitNumber / numActive);
  progressLine.forEach((el) => {
    el.style.width = `${progressP}%`;
  });
};


function numArrayPush(elem, array) {
  let btnValue = elem.innerHTML;
  let index = array.indexOf(btnValue);
  if (elem.classList.contains("active")) {
    array.push(elem.innerHTML);
  } else {
    array.splice(index, 1);
  }
}
