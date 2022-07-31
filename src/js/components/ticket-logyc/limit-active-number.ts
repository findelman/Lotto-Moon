// Проверка на заполненость
const limitCheck = (numActive, tikcetsNum, ticket,limitNumber) => {
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

  export default limitCheck