// Собрать билет
const ticketAutofill = (ticketBtnAutoFill, ticket, tikcetsNum,limitNumber,amountNumber) => {
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