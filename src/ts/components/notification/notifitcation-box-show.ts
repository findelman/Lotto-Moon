// Показ текста при смене лотереи
export const notificationBoxShow = () => {
    let clearTimeout
    return function () {
      let notificationBox = document.querySelector(".notification-box")
      notificationBox.classList.add("show-f")
      clearInterval(clearTimeout)
      clearTimeout = setTimeout(() => {
        notificationBox.classList.remove("show-f")
      }, 3000)
    }
  }