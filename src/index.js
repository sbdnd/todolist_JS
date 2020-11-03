import "./style.css";

//référence à la balise <ul>
const ul = document.querySelector("ul");

//référence à la balise <form>
const form = document.querySelector("form");

//référence à la balise <input>
const input = document.querySelector("input");

/**
 * tableau d'objet Todo
 */
const todos = [
    {
        text: "je suis une todo non validée",
        done: false
    },
    
    {
        text: "je suis une todo validée",
        done: true
    }
];

/**
 * Ajoute une Todo à la soumission du formulaire
 */
form.addEventListener("submit", e => {
    e.preventDefault();
    const value = input.value;
    input.value = '';
    addTodo(value);
});

/**
 * Créé un tableau d'éLements Todo à partir du tableau d'obejt Todos
 * Insère la liste des éléments todo dans l'élément <ul>
 */
const displayTodo = () => {
    const todosNode = todos.map((todo, index) =>{
        return createTodoElement(todo, index);
    });
    ul.innerHTML = '';
    ul.append(...todosNode);
};

/**
 * Créé un bouton supprimer, l'ajoute à la <li>, supprime une todo en fonctionn de son index
 * Créé un todo, lui le contenu : <span>, text et bouton supprimer
 * @param {*} todo 
 * @param {number} index 
 */
const createTodoElement = (todo, index) => {
    const li = document.createElement("li");
    const buttonDelete = document.createElement('button');
    buttonDelete.innerText = "Supprimer";
    buttonDelete.addEventListener('click', e=>{
        e.stopPropagation();
        deleteTodo(index);
    });
    li.innerHTML = `
    <span class="todo ${ todo.done ? 'done' : '' }"></span>
    <p>${ todo.text }</p>
    `;
    li.appendChild(buttonDelete);
    li.addEventListener('click', e=>{
        toggleTodo(index);
    })
    return li;
    
};

/**
 * Ajoute une todo au tableau Todos
 * @param {string} text 
 */
const addTodo = (text) => {
    todos.push({
        text,
        done: false
    });
    displayTodo();
};

/**
 * Supprime une Todo du tableau Todos en fonction de son index
 * @param {number} index
 */
const deleteTodo = index => {
    todos.splice(index, 1);
    displayTodo();
}

const toggleTodo = index => {
    todos[index].done = !todos[index].done;
    displayTodo();
}

displayTodo();

