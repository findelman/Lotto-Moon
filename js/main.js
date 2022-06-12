let btnGenerator = document.querySelector(".btn-generate");
let ticketOutWrapper = document.querySelector(".tickets-out-wrapper");
let basket = document.querySelector(".basket");
let amountNumber = 46;
let limitNumber = 6;
let biletCount = 0;
let basketText = document.querySelector(".basket-text");
let basketContent = document.querySelector('.basket-hidden-content')
let basketPrice = document.querySelector('.basket-ticket-price')
let ticketPrice = 200

// let arrayTicketNumber = [];

btnGenerator.addEventListener("click", () => {
  ticketGenerate();
});

// генерация билета
const ticketGenerate = () => {
  ticketOutWrapper.innerHTML += `<div class="ticket"><h1 class="ticket-count">${++biletCount} Билет</h1><div class="out-ticket-number"></div><div class="ticket-prgoress-wrapper">
    <div class="ticket-progress"></div>
</div><div class="ticket-numlist"></div> <button class="ticket-autofill">Собрать билет</button></div>`;
  let ticketNumList = document.querySelectorAll(".ticket-numlist");
  let ticket = document.querySelectorAll(".ticket");
  // let ticketBtn = document.querySelectorAll('.ticket-autofill')
  ticketNumList.forEach((elem) => {
    if (elem.innerHTML == "") {
      for (let i = 1; i <= amountNumber; i++) {
        elem.innerHTML += `<div class="ticket-num">${i}</div>`;
      }
    }
  });
  if (ticket.length === 3) {
    document.body.style.background = "#ffeb3b";
  }
  ticketClick(ticket);
};

// Клики по цифрам внутри определенного билета
function ticketClick(ticket, array) {
  ticket.forEach((ticket) => {
    let tikcetsNum = ticket.querySelectorAll(".ticket-num");
    let ticketBtn = ticket.querySelector('.ticket-autofill')
    let outTicketNumber = ticket.querySelector(".out-ticket-number");
    ticket.array = [];

    tikcetsNum.forEach((ticketsNumBtn) => {
      ticketsNumBtn.addEventListener("click", () => {
        ticketsNumBtn.classList.toggle("active");
        let numActive = ticket.querySelectorAll(".active").length;

        limitCheck(numActive, tikcetsNum,ticket);
        progress(ticket, numActive);
        numArrayPush(ticketsNumBtn, ticket.array);
        outNumber(ticket.array, outTicketNumber);
        console.log(outTicketNumber);
      });
    });

    //Собрать билет 
    ticketBtn.onclick = ()=> {
      let randomArr = []
      ticket.array = []
      tikcetsNum.forEach((ticketsNumBtn) => {
        if(ticketsNumBtn.classList.contains('active')) {
          ticketsNumBtn.classList.remove('active')
        }
      })
      for(let i = 0; i < limitNumber; i++) {
        let random = Math.round(Math.random() * (amountNumber -1))
        let randomDuplicate = randomArr.includes(random)
        if(!randomDuplicate) {
          randomArr.push(random)
        }
        else if(randomDuplicate) {
          while(randomDuplicate) {
             random = Math.round(Math.random() *( amountNumber -1 )) 
             randomDuplicate = randomArr.includes(random)
            if(!randomDuplicate) {
              randomArr.push(random)
            } 
          }
        }

        console.log(randomArr)
        console.log(random)
        // tikcetsNum[random].click()
      }
      for(let i = 0; i < limitNumber; i++) {
        console.log(randomArr[i])
        tikcetsNum[randomArr[i]].click();
      }
    }
  });
}

// const animationDelayMultiplier = 0.15;
// Отрисовка активных цифр
const outNumber = (array, outTicketNumber) => {
  // const animationDelay = 1 * animationDelayMultiplier + 's';
  outTicketNumber.innerHTML = ``;
  array.sort((a, b) => a - b);
  for (let key of array) {
    outTicketNumber.innerHTML += `<div class="out-number">${key}</div>`;
  }
};

// Проверка на заполненость  
const limitCheck = (numActive, tikcetsNum, ticket) => {

  if (numActive === limitNumber) {
    tikcetsNum.forEach((all) => {
      if (!all.classList.contains("active")) {
        all.setAttribute("disabled", "true");
      }
    });
    // добовляем атрибут если билет собран
    ticket.setAttribute('data-ticket-complete', 'true')
  } else if (numActive !== limitNumber) {
    tikcetsNum.forEach((all) => {
      {
        all.removeAttribute("disabled");
      }
    });
    ticket.setAttribute("data-ticket-complete", "false");

  }
  ticketPriceAmount()
};

// Счетчик суммы в баскете
const ticketPriceAmount = () => {
  let ticketComplete = document.querySelectorAll('.ticket[data-ticket-complete="true"]').length
  basketPrice.textContent = ticketPrice * ticketComplete
  if(ticketComplete >= 1) {
    basketText.innerHTML = 'Начнем же ?'
    basketContent.classList.add('show')
  }
  else {
      basketText.innerHTML = 'Чтобы начать игру соберите хотя бы 1 билет'
    basketContent.classList.remove('show')
  }
}

ticketGenerate();

// Прогресс лайн
const progress = (el, numActive) => {
  let progressLine = el.querySelectorAll(".ticket-progress");
  let progressP = 100 / (limitNumber / numActive);
  progressLine.forEach((el) => {
    el.style.width = `${progressP}%`;
  });
};

// добовляем активные цифры в массив
function numArrayPush(elem, array) {
  let btnValue = elem.innerHTML;
  let index = array.indexOf(btnValue);
  if (elem.classList.contains("active")) {
    array.push(elem.innerHTML);
  } else {
    array.splice(index, 1);
  }
}

// window.onscroll = ()=> {
//   if(window.pageYOffset > 200) {
//     basket.style.cssText = `position: fixed; right: 0`
//   }}