import { basketCheckComplete } from "./basket-check-ticket-complete"

// Отрисовка суммы в баскет
export const basketDrawSumm = (basketObj, basketPrice) => {
  let summ: number = 0
  summ = 0

  basketObj.forEach((value) => {
    summ += value
  })

  basketPrice.textContent = summ ? `Сумма: ${summ.toString()}` : basketCheckComplete()
}
