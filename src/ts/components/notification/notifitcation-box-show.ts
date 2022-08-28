// Показ текста при смене лотереи
export const notificationBoxShow = () => {
    let clearTimeout
    let notificationBox = document.querySelector(".notification-box")
    return function () {
      notificationBox.classList.add("show-f")
      clearInterval(clearTimeout)
      clearTimeout = setTimeout(() => {
        notificationBox.classList.remove("show-f")
      }, 3000)
    }
  }