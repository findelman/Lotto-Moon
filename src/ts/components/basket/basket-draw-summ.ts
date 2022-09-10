// Отрисовка суммы в баскет
export const basketDrawSumm = (basketObj, basketPrice) => {
  let summ: number = 0
  summ = 0
  console.log(basketObj, "map")

  basketObj.forEach((value) => {
    summ += value
  })

  basketPrice.textContent = `Сумма: ${summ.toString()}`
}
