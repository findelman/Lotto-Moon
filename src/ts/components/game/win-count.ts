export const winCount = (gameConfig) => {
  const gameItemsWrappers = document.querySelectorAll(".game-item-wrapper")
  gameItemsWrappers.forEach((item) => {
    const winNumbers = item.querySelectorAll(".win-num").length
    console.log(winNumbers)
    const checkWin =
      winNumbers === 0
        ? "Ничего не выиграли"
        : `Совпало ${winNumbers} Выигрыш ${gameConfig.ticketPrice * winNumbers}`
    item.innerHTML += checkWin
  })
}
