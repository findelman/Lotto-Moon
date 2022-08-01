// Проверка на заполненость
export const limitCheck = (numActive, tikcetsNum, ticket, gameConfig) => {
  if (numActive === gameConfig.limitNumber && gameConfig.limitNumber === 10) {
    tikcetsNum.forEach((all) => {
      if (!all.classList.contains("ticket-num--active")) {
        all.setAttribute("disabled", "");
      }
    });
  }
  if (numActive === gameConfig.limitNumber) {
    ticket.setAttribute("data-ticket-complete", `true`);
  }
  if (numActive > gameConfig.limitNumber) {
    ticket.setAttribute("data-big-stavka", "true");
    gameConfig.limitNumber = 10;
  }
  if (numActive <= 6) {
    ticket.setAttribute("data-big-stavka", "false");
    gameConfig.limitNumber = 6;
  }
  if (numActive < 6) {
    ticket.setAttribute("data-ticket-complete", "false");
  }
  if (numActive > 6) {
    ticket.setAttribute("data-big-stavka", `${numActive - 6}`);
  }
  if (numActive !== gameConfig.limitNumber) {
    tikcetsNum.forEach((all) => {
      {
        all.removeAttribute("disabled");
      }
    });
  }  
};