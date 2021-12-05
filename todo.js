    const todoForm=document.querySelector("#todo-form")
    const todo=document.querySelector("#todo")
    const cardBodyFirst=document.querySelectorAll(".card-body")[0]
    const cardBodySecond=document.querySelectorAll(".card-body")[1]
    const listGroup=document.querySelector(".list-group")
    const clear=document.querySelector("#clear-todos")
    const filter=document.querySelector("#filter")


    eventListener();
    function eventListener(){
        todoForm.addEventListener("submit",addTodo)
        document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
        cardBodySecond.addEventListener("click",deleteTodo)
        filter.addEventListener("keyup",filterTodos)
        clear.addEventListener("click",clearTodo)
    }
function clearTodo(e){
   if(confirm("tümünü silmekte emin misiniz")){

    listGroup.innerHTML=""

   }
  
}

function filterTodos(e){
    const value=e.target.value.toLowerCase()
    const storys=document.querySelectorAll(".list-group-item")
    storys.forEach(function(story){
        const text=story.textContent.toLowerCase()
        if(text.indexOf(value)===-1){
          story.setAttribute("style","display : none !important")
        }else{
            story.setAttribute("style","display : block")
        }
    })
}


















    // function filterTodos(e){
    //     const filterValue=e.target.value.toLowerCase()
    //     const listItems=document.querySelectorAll(".list-group-item")
    //     listItems.forEach(function(listItem){
    //         const text =listItem.textContent.toLowerCase()
    //         if(text.indexOf(filterValue)===-1){
    //             listItem.setAttribute("style","display : none !important")
    //         } else{
    //             listItem.setAttribute("style","display: block")
    //         }
    //     })
    // }
function deleteTodo(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("success","başarılı bir şekilde silindi")
    }
}

function deleteTodoFromStorage(deletetodo,index){
let todos=getTodosFromStarage()
todos.forEach(function(todo){
    if(todo===deletetodo){
        todos.splice(index,1)
    }

})
localStorage.setItem("todos",JSON.stringify(todos))
}
function loadAllTodosToUI(){
 let todos=getTodosFromStarage()
 todos.forEach(function(todo){
    addTodotoUI(todo)
 })
}


    function addTodo(e){
     const newValue=todo.value.trim()

    if(newValue === ""){
        showAlert("danger","lütfen bir todo giriniz")
    }
    else{
       addTodotoUI(newValue) 
       
       addTodoToStorage(newValue)
       showAlert("success","geçerli bir todo eklendi")
    }
    
        e.preventDefault()
    }



function getTodosFromStarage(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem("todos")) 
    }
    return todos
}


function addTodoToStorage(newValue){
    let todos=getTodosFromStarage()
    todos.push(newValue)
    localStorage.setItem("todos",JSON.stringify(todos))
}



function showAlert(type,message){
const alert=document.createElement("div")
alert.className=`alert alert-${type}`
alert.textContent=message
//console.log(alert)
cardBodyFirst.appendChild(alert)

setTimeout(() => {
    alert.remove()
}, 1000);
}


    function addTodotoUI(newValue){
   

    const listItem=document.createElement("li")
    const link=document.createElement("a")
    link.href="#"
    link.className="delete-item"
    link.innerHTML="<i class = 'fa fa-remove'></i>"

    listItem.classList="list-group-item d-flex justify-content-between"
    listItem.appendChild(document.createTextNode(newValue))
    listItem.appendChild(link)
    listGroup.appendChild(listItem)


    todo.value=""

    }


