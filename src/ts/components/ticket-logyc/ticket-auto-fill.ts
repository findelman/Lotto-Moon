// Собрать билет
const ticketAutofill = (ticketBtnAutoFill, ticket, tikcetsNum,limitNumber,amountNumber) => {
    ticketBtnAutoFill.addEventListener("click", () => {
      ticket['array'] = []
      let randomArr = [];
      tikcetsNum.forEach((ticketsNumBtn) => {
        if (ticketsNumBtn.classList.contains("ticket-num--active")) {
          ticketsNumBtn.classList.remove("ticket-num--active");
        }
      });
      for (let i = 0; i < limitNumber; i++) {
        let random = Math.round(Math.random() * (amountNumber - 1));
        let randomDuplicate = randomArr.includes(random);
        if (!randomDuplicate) {
          randomArr.push(random)
          tikcetsNum[random].click();
        } else {
          while (randomDuplicate) {
            random = Math.round(Math.random() * (amountNumber - 1));
            randomDuplicate = randomArr.includes(random);
            if (!randomDuplicate) {
              randomArr.push(random)
              tikcetsNum[random].click();
            }
          }
        }
      }
      console.log(randomArr, '123');
      
    });
  };

  export default ticketAutofill