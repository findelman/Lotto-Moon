// Прогресс лайн
export const progressLine = (el, numActive,limitNumber) => {
    let progressLine = el.querySelector(".ticket-progress");
    let progressP = 100 / (limitNumber / numActive);
    progressLine.style.width = `${progressP}%`;
  }

 