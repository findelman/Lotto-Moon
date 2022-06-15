let btnGenerator = document.querySelector(".btn-generate");
let ticketOutWrapper = document.querySelector(".tickets-out-wrapper");
let basket = document.querySelector(".basket");
let amountNumber = 46;
let limitNumber = 6;
let biletCount = 0;
let basketText = document.querySelector(".basket-text");
let basketContent = document.querySelector(".basket-hidden-content");
let basketPrice = document.querySelector(".basket-ticket-price");
let basketObj = {}
let summ = 0

let ticketPrice = 200;

// let arrayTicketNumber = [];

btnGenerator.addEventListener("click", () => {
  ticketGenerate();
});

// генерация билета
const ticketGenerate = () => {
  ticketOutWrapper.innerHTML += `<div class="ticket"><div class="ticket-remove"></div><h1 class="ticket-count">${++biletCount} Билет</h1><div class="out-ticket-number"></div><div class="ticket-prgoress-wrapper">
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
  ticket.forEach((ticket,index) => {
    let tikcetsNum = ticket.querySelectorAll(".ticket-num");
    let ticketBtn = ticket.querySelector(".ticket-autofill");
    let outTicketNumber = ticket.querySelector(".out-ticket-number");
    let ticketRemove = ticket.querySelector('.ticket-remove')
    ticket.array = [];
    tikcetsNum.forEach((ticketsNumBtn) => {
      ticketsNumBtn.addEventListener("click", () => {
        ticketsNumBtn.classList.toggle("active");
        let numActive = ticket.querySelectorAll(".active").length;
        let ticketCompleted = document.querySelectorAll(
          '.ticket'
        );
          if(ticket.dataset.ticketComplete === 'true') {
            basketObj[index] = (ticket.dataset.bigStavka * 9) * ticketPrice
          }
          summ = 0;

          for(let key in basketObj) {
            summ += basketObj[key]
          }
          console.log(summ)
        limitCheck(numActive, tikcetsNum, ticket);
    

 console.log(basketObj)

        basketPrice.textContent = summ;
        progress(ticket, numActive);
        numArrayPush(ticketsNumBtn, ticket.array);
        outNumber(ticket.array, outTicketNumber);
  ticketPriceAmount(ticket,numActive,summ);

      });
    });

    ticketAutofill(ticketBtn,ticket,tikcetsNum)
    ticketRemoveF(ticketRemove,ticket)
   
  });
}
// Счетчик суммы в баскете
const ticketPriceAmount = (ticket,numActive,ticketBigCount, summ) => {
  let ticketComplete = document.querySelectorAll(
    '.ticket[data-ticket-complete="true"]'
  ).length;

 
  

  if (ticketComplete >= 1) {
    basketText.innerHTML = "Начнем же ?";
    basketContent.classList.add("show");
  } else {
    basketText.innerHTML = "Чтобы начать игру соберите хотя бы 1 билет";
    basketContent.classList.remove("show");
  }
};

// Собрать билет
const ticketAutofill = (ticketBtn,ticket,tikcetsNum)=> {
  ticketBtn.onclick = () => {
    let randomArr = [];
    ticket.array = [];
    tikcetsNum.forEach((ticketsNumBtn) => {
      if (ticketsNumBtn.classList.contains("active")) {
        ticketsNumBtn.classList.remove("active");
      }
    });
    for (let i = 0; i < limitNumber; i++) {
      let random = Math.round(Math.random() * (amountNumber - 1));
      let randomDuplicate = randomArr.includes(random);
      if (!randomDuplicate) {
        randomArr.push(random);
      } else if (randomDuplicate) {
        while (randomDuplicate) {
          random = Math.round(Math.random() * (amountNumber - 1));
          randomDuplicate = randomArr.includes(random);
          if (!randomDuplicate) {
            randomArr.push(random);
          }
        }
      }
    }
    for (let i = 0; i < limitNumber; i++) {
      tikcetsNum[randomArr[i]].click();
    }
  };
}

// Удалить билет

const ticketRemoveF = (ticketRemove,ticket)=> {

  ticketRemove.addEventListener('click', ()=> {
    // console.log(ticket)
    ticket.remove()
    let ticketq = document.querySelectorAll(".ticket");
    ticketq.forEach(tickets => {
      let counter = tickets.querySelector('.ticket-count')
      // counter.innerHTML = biletCount-- 
    })
    // --biletCount
  })
}

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
  let ticketBigCount = parseInt(ticket.dataset.bigStavka)

  if (numActive === limitNumber) {
    // limitNumber = 10

    tikcetsNum.forEach((all) => {
      if (!all.classList.contains("active")) {
          // all.setAttribute('disabled','')
      }
    });
    // добовляем атрибут если билет собран
    ticket.setAttribute("data-ticket-complete", `true`);

  } 
  if(numActive > limitNumber) {
    limitNumber = 10
    ticket.setAttribute('data-big-stavka','true');
   
  } 
   if( numActive <= 6) {
    limitNumber = 6
    ticket.setAttribute('data-big-stavka','false');
  } 
   if(numActive < 6) {
     ticket.setAttribute("data-ticket-complete", "false");
  }
  if(numActive > 6) {
    ticket.setAttribute("data-big-stavka", `${numActive - 6}`);
     ticketBigCount = parseInt(ticket.dataset.bigStavka)

  }
   if (numActive !== limitNumber) {
    tikcetsNum.forEach((all) => {
      {
        all.removeAttribute("disabled");
      }
    });
    // ticket.setAttribute("data-ticket-complete", "false");
  }
  
};



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
