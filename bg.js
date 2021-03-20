const body = document.querySelector("body");

//랜덤을 설정하는 방법 매우 중요 ★
//Math.random을 통해 숫자를 랜덤으로 받을 수 있다ㅏ.
//범위 지정은 Math.random*5 이런 형식으로 하면 0~5까지가 지정된다.
//단, 이렇게 하면 소숫점 뒷자리수가 나오는데 이를 막기 위해선 Math.floor를 사용
//Math.floor(3.9) 이런 형식으로 쓰이며 floor는 버림, ceiling은 올림을 나타내
//소수점 뒷자리를 어떻게 할지 정할 수 있다.
//Math.floor(Math.random() * 7);
const IMG_NUMBER = 7;

function paintImage(imgNumber){
    const image = new Image();
    //이미지 폴더 의미
    // +1을 하는 이유는 Math.radom()함수가 0을 줄 수 있기 때문.
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom(){
    const number = Math.floor(Math.random()*IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();