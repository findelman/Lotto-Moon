// Собрать билет
export const ticketAutofill = (ticketBtnAutoFill, tikcetsNum, ticket) => {
  ticketBtnAutoFill.addEventListener("click", () => {
    let randomArr = Array(tikcetsNum.length)
      .fill(0)
      .map((item, i) => ++i)
    let randomArrClick = Array(parseInt(ticket.dataset.limitNumber))
      .fill(0)
      .map(() => randomArr.splice(Math.floor(Math.random() * randomArr.length), 1).pop())
    tikcetsNum.forEach((ticketsNumBtn) => {
      ticketsNumBtn.classList.remove("ticket-num--active")
      ticketsNumBtn.removeAttribute("disabled")
    })
    for (let key of randomArrClick) {
      tikcetsNum[key - 1].click()
    }
  })
}
