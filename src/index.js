import "./style.css";

//récupération d'une référence à la balise <ul>
const ul = document.querySelector("ul");

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

displayTodo();
