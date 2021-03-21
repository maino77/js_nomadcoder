const now = document.querySelector(".day");

function getDay(){
    let today = new Date();   

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    now.innerText = `${year}.${month}.${date}`
};

function init(){
    getDay();
};

init();