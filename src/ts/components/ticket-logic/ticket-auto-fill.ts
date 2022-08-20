// Собрать билет
export const ticketAutofill = (ticketBtnAutoFill, tikcetsNum,limitNumber,amountNumber) => {
    ticketBtnAutoFill.addEventListener("click", () => {
      let randomArr = [];
      tikcetsNum.forEach((ticketsNumBtn) => {
          ticketsNumBtn.classList.remove("ticket-num--active");
          ticketsNumBtn.removeAttribute('disabled')
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
      // console.log(randomArr, '123');
      
    });
  };
