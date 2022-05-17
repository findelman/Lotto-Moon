let btnGenerator = document.querySelector(".btn-generate");
let ticketWrapper = document.querySelector(".tickets-wrapper");
let limit = 46;
let ticket = document.querySelectorAll('.ticket');
// let ticketNumList = document.querySelectorAll('.ticket-numlist');
let numCount = 6;
let biletCount = 1;
btnGenerator.addEventListener("click", () => {
    biletCount++
    

    ticketWrapper.innerHTML += `<div class="ticket"><h1 class="ticket-count">${biletCount} Билет</h1><div class="ticket-numlist"></div></div>`;
    let ticketNumList = document.querySelectorAll('.ticket-numlist');

    ticketNumList.forEach(elem => {
        console.log('123')
         if(elem.innerHTML == '')
         {
            console.log('321')
            for(let i = 1; i <= limit; i++) {
                elem.innerHTML += `<div class="ticket-num">${i}</div>`}
    
         }
        })

});
window.onscroll = ()=> {
    console.log(window.pageYOffset)
}