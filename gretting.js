const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing"

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    //preventDefault로 submit과 이동하는 것을 막음
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    //누군가 form을 submit하면 handleSubmit 함수 작동
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    //페인트를 칠하려면 폼을 숨겨야 한다.
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}
    Tell me what do you do today?`;
}

//이 함수의 역할은 로컬 스토리지에서 가져오는 역할.
function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        // she is not (유저가 없는 경우) 즉, currentUser가 없으면 user의 이름 요청
        askForName();
    } else {
        // she is (유저가 있는 경우)
        paintGreeting(currentUser);
    }
}



function init(){
    loadName();
}

init();