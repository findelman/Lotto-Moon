const basketText = document.querySelector(".basket-text") as HTMLElement
const basketContent = document.querySelector(".basket-hidden-content") as HTMLElement
// Проверка активных тикетов

export const basketCheckComplete = () => {
  const ticketComplete = document.querySelectorAll('.ticket[data-ticket-complete="true"]').length
  if (ticketComplete >= 1) {
    basketText.innerHTML = "Начнем же ?"
    basketContent.classList.add("show")
  } else {
    basketText.innerHTML = "Чтобы начать игру соберите билет"
    basketContent.classList.remove("show")
  }
}
