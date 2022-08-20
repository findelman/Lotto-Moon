// Отрисовка суммы в баскет
export const basketDrawSumm = (basketObj,basketPrice) => {
    let summ: number = 0
    summ = 0
    for (let key in basketObj) {
      summ += basketObj[key]
    }
    console.log(basketObj)
    basketPrice.textContent = `Сумма: ${summ.toString()}`
  }