const toDoForm = document.querySelector(".js-toDoForm");//HTML에서 필요한것을 얻음 
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];// 해야할 일 생성 시 toDos array에 추가 되도록 

function deleteToDos(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
    //    console.log(toDo.id, li.id );
        return toDo.id !== parseInt(li.id);
    })
    //console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();

}

function saveToDos(){//toDos를 가져와서 로컬에 저장하는 역할 
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));//JSON.stringify() 는 자바스크립트 object를 string으로 바꿔주는 역할
}

function paintToDo(text){
    const li = document.createElement("li"); //비어있는 li 생성. 엘리먼트 생성, 이름은 상관 x(const potato여도 됨 )
    const delBtn = document.createElement("button");//button 생성
    const span = document.createElement("span"); //span 생성
    const newId= toDos.length + 1;

    delBtn.innerText="X";
    delBtn.addEventListener("click",deleteToDos );

    span.innerText = text; //submit함수에서 온 값(currentvalue)
    li.appendChild(span);//span을 li에 넣음
    li.appendChild(delBtn);//버튼을 li에 넣음
    li.id = newId;
    toDoList.appendChild(li); //금방 만든 li에 넣음 , 즉 li를 ul에 append

    const toDoObj = {
        text : text,
        id : newId //처음엔 'toDos' array가 비어있으므로 id값은 1
    };
    toDos.push(toDoObj);//push 사용해서 'toDo'array안에 element 하나를 넣어줌
    saveToDos(); // push한 이후에 불러오기 (push 전에 호출하면 saveToDos를 불러도 저장할게 없음(toDos는 비어있기 때문에))
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
    //    console.log(loadedToDos);
    const parsedToDos = JSON.parse(loadedToDos); //object로 변경
    //  console.log(loadedToDos);
    parsedToDos.forEach(function(toDo){
        paintToDo(toDo.text);
     });//forEach : array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜줌 
    }
}
 

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);//toDo생성 
}
 
init();