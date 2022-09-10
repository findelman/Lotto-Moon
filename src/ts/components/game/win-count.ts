export const winCount = (gameConfig) => {
  let gameItemsWrappers = document.querySelectorAll(".game-item-wrapper")
  gameItemsWrappers.forEach((item) => {
    let winNumbers = item.querySelectorAll(".win-num").length
    console.log(winNumbers)
    let checkWin =
      winNumbers === 0  
        ? "Ничего не выиграли"
        : `Совпало ${winNumbers} Выигрыш ${gameConfig.ticketPrice * winNumbers}`
    item.innerHTML += checkWin
  })
}
