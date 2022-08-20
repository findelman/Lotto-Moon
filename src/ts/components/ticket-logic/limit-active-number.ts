
export const limitCheck = (numActive, tikcetsNum, ticket) => {
  if (numActive === parseInt(ticket.dataset.limitNumber)) {
    ticket.setAttribute("data-ticket-complete", `true`);
    tikcetsNum.forEach((nums) => {
      if (!nums.classList.contains("ticket-num--active")) {
        nums.disabled = "true";
      }
    });
  } else {
    tikcetsNum.forEach((nums) => {
      nums.removeAttribute("disabled");
    });
    ticket.setAttribute("data-ticket-complete", `false`);
  }
};


// Проверка на заполненость / изначальная функция подразумевала под собой расширенную ставку
// export const limitCheck = (numActive, tikcetsNum, ticket, gameConfig) => {
//   if (numActive === gameConfig.limitNumber && gameConfig.limitNumber === 10) {
//     tikcetsNum.forEach((all) => {
//       if (!all.classList.contains("ticket-num--active")) {
//         all.setAttribute("disabled", "");
//       }
//     });
//   }
//   if (numActive === gameConfig.limitNumber) {
//     ticket.setAttribute("data-ticket-complete", `true`);
//   }
//   if (numActive > gameConfig.limitNumber) {
//     ticket.setAttribute("data-big-stavka", "true");
//     gameConfig.limitNumber = 10;
//   }
//   if (numActive <= 6) {
//     ticket.setAttribute("data-big-stavka", "false");
//     gameConfig.limitNumber = 6;
//     ticket.style.boxShadow = 'unset'
//   }
//   if (numActive < 6) {
//     ticket.setAttribute("data-ticket-complete", "false");
//   }
//   if (numActive > 6) {
//     ticket.setAttribute("data-big-stavka", `${numActive - 6}`);
//     ticket.style.boxShadow = 'white 0px 0px 20px 4px'
//   }
//   if (numActive !== gameConfig.limitNumber) {
//     tikcetsNum.forEach((all) => {
//       {
//         all.removeAttribute("disabled");
//       }
//     });
//   }
// };
