import "./style.css";

//récupération d'une référence à la balise <ul>
const ul = document.querySelector("ul");

//récupération d'une référence à la balise <form>
const form = document.querySelector("form");

//récupération d'une référence à la balise <input>
const input = document.querySelector("input");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value;
    input.value = '';
    addTodo(value);
    displayTodo();
});


const todos = [
    {
        text: "je suis une todo non validée",
        done: false
    },

    {
       text: "je suis une todo validée",
       done: true
    }
]


const displayTodo = () => {
    const todosNode = todos.map((todo, index) =>{
        return createTodoElement(todo, index);
    });
    ul.innerHTML = '';
    ul.append(...todosNode);
};

const createTodoElement = (todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="todo ${ todo.done ? 'done' : '' }"></span>
        <p>${ todo.text }</p>
        <button>supprimer</button>
    `;
    return li;
};

const addTodo = (text) => {
    todos.push({
        text,
        done: false
    });
}

displayTodo();
