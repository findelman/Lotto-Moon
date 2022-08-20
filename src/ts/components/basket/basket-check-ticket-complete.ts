let basketText = document.querySelector(".basket-text") as HTMLElement
let basketContent = document.querySelector(".basket-hidden-content") as HTMLElement
// Проверка активных тикетов 

export const basketCheckComplete = () => {
  let ticketComplete = document.querySelectorAll('.ticket[data-ticket-complete="true"]').length
  if (ticketComplete >= 1) {
    basketText.innerHTML = "Начнем же ?"
    basketContent.classList.add("show")
  } else {
    basketText.innerHTML = "Чтобы начать игру соберите хотя бы 1 билет"
    basketContent.classList.remove("show")
  }
}
