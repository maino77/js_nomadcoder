const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

//이 함수는 forEach에서 function을 실행하는 것 같이 각각의 item과 같이 실행될거다.
//필터는 배열의 모든 아이템을 통해 함수를 실행하고 true인 아이템들만 가지고 새로운 배열을 만들고
function filterFn(toDo){

}

// 할 일이 여러개가 모인 목록으로 만들어야 하기 때문에 배열을 이용한다.
// 해야할 일을 생성했을 때 'toDos' 배열에 추가되도록 한다.
// 결국 이 함수는 '할 일 목록'
let toDos = [];

//리스트 항목 삭제하는 함수
function deleteToDo(event){
    //event에 target이라는 것이 있다. button이 계속 뜨게 하는. 
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    //cleanToDos와 filter가 하는 일은 filterFn이 체크된 아이템들의 array를 주는 것이다.
    //id가 1이 아닌 경우 toDos를 직접 하고 싶을 때
    //filter 함수 기억하기!★
    const cleanToDos = toDos.filter(function(toDo){
        //toDo의 id가 숫자이고 li의 id는 string이다.
        //li의 id를 숫자로 바꿔야 한다. 그래서 parselnt를 사용
        //parseInt는 string을 숫자로 바꿀 수 있다.
        return toDo.id !== parseInt(li.id);
    });
    //이것 때문에 toDos를 const가 아닌 let으로 이용
    toDos = cleanToDos
    saveToDos();
}


//saveToDos는 toDos를 가져와 로컬에 저장하는 일을 한다.
function saveToDos(){
    //local storage에는 자바스크립트의 data를 저장할 수 없다.
    //js는 local storage에 있는 모든 데이터를 string으로 저장하려 한다.
    //JSON.stringify는 자바스크립트 object를 string으로 바꿔준다.
    // 정리: local storage는 js 데이터를 저장할 수 없으며 꺼낼때 string으로 꺼낸다. 
    //  js data를 저장하고 싶다면 JSON.stringify를 이용해 string으로 바꾸어 local storage에 저장한다.
    // (저장) js(object) -> Json -> string -> local storage // (호출) local storage(string) -> JSON -> js(object)
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

//li에도 id를 준다. 나중에 버튼을 클릭했을 때 어떤 li를 지워야 하는지 알 수 있기 때문.

//체크리스트
function paintToDo(text){
const li = document.createElement("li");
const delBtn = document.createElement("button")
const span = document.createElement("span");
const newId = toDos.length +1;
delBtn.innerText="❌";
delBtn.addEventListener("click", deleteToDo);
span.innerText = text
li.appendChild(delBtn);
li.appendChild(span);
//li에도 id를 준다. 나중에 버튼을 클릭했을 때 어떤 li를 지워야 하는지 알 수 있기 때문.
li. id = newId;
toDoList.appendChild(li);

const toDoObj = {
    text: text,
    id: newId
    };
    // toDoObj를 toDos에 입력한다.
    //push한 후에 호출할 것. 반대로 하면 아무것도 나오지 않는다.
    toDos.push(toDoObj);
    saveToDos();
}

    function handleSubmit(event){
        event.preventDefault();
        const currentValue = toDoInput.value;
        paintToDo(currentValue);
        toDoInput.value = "";
    }

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    //local storage가 비어있지 않다면 불러올 수 있다.
    if(loadedToDos !== null){
        //todo를 불러오는 작업
        //여기서도 JSON을 사용하며 JavaScript Object Notation의 줄잉말이다.
        // locoal storage에서 js로 꺼내기 위해서 string을 object로 바꿔야 하며 그때 JSON 사용
        //local storage에서 불러온 것은 string으로 존재하나 JSON을 하니 object로 변환.
        const parsedToDos = JSON.parse(loadedToDos);
        //parsedToDos 안에 있는 것들에 대해서 paintToDo function을 실행시킨다.
        //forEach: array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜 준다.
        //함수를 호출하는 게 아니라, 안에다 바로 만든다.
        //각각에 대해서 paintToDo라는 함수가 실행된다.
        //forEach는 array를 위한 함수다.
        //object 각각에 대해서 paintToDo라는 함수가 실행.
        //forEach 기억하기!★
        parsedToDos.forEach(function something(toDo){
            paintToDo(toDo.text);
        })
    }
}

    function init(){
        loadToDos();
        toDoForm.addEventListener("submit", handleSubmit);
    }

    init();