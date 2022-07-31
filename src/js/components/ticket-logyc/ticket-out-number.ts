// Отрисовка активных цифр
const outNumber = (array, outTicketNumber) => {
    outTicketNumber.innerHTML = ``;
    array.sort((a, b) => a - b);
    for (let key of array) {
      outTicketNumber.innerHTML += `<div class="out-number">${key}</div>`;
    }
  };

// добовление цифр в массив
  function numArrayPush(elem, array) {
    if (elem.classList.contains("active")) {
      array.push(elem.innerHTML);
    } else {
      array.splice(array.indexOf(elem.innerHTML), 1);
    }
  }

  export  {outNumber, numArrayPush}