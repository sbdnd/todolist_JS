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
        done: false,
        editMode: true
    },
    
    {
        text: "je suis une todo validée",
        done: true,
        editMode: false
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
        if(todo.editMode){
            return createTodoEditElement(todo, index);
        } else {
            return createTodoElement(todo, index);
        }
    });
    ul.innerHTML = '';
    ul.append(...todosNode);
};

/**
 * Créé un bouton supprimer, l'ajoute à la <li>, supprime une todo en fonction de son index
 * Créé une todo avec bouton toggle, text et bouton supprimer
 * @param {*} todo 
 * @param {number} index 
 */
const createTodoElement = (todo, index) => {
    const li = document.createElement("li");
    const buttonDelete = document.createElement('button');
    buttonDelete.innerText = "Delete";
    const buttonEdit = document.createElement('button'); 
    buttonEdit.innerText = "Edit";
    buttonDelete.addEventListener('click', e =>{
        e.stopPropagation();
        deleteTodo(index);
    });
    buttonEdit.addEventListener('click', e =>{
        e.stopPropagation();
        toggleEditMode(index);
    });

    li.innerHTML = `
    <span class="todo ${ todo.done ? 'done' : '' }"></span>
    <p>${ todo.text }</p>
    `;
    li.append(buttonEdit, buttonDelete);
    li.addEventListener('click', e=>{
        toggleTodo(index);
    })
    return li;
};

/**
 * Créé une todo sou forme d'input et deux boutons (cancel et save)
 * @param {*} todo 
 * @param {number} index 
 */
const createTodoEditElement = (todo, index) => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo.text;
    const buttonSave = document.createElement('button');
    buttonSave.innerHTML = "Save";
    buttonSave.addEventListener('click', e=>{
        editTodo(index, input);
    })
    const buttonCancel = document.createElement('button')
    buttonCancel.innerHTML = "Cancel";
    buttonCancel.addEventListener('click', e=>{
        e.stopPropagation();
        toggleEditMode(index);
    })
    li.append(input, buttonSave,buttonCancel);
    return li;
}

/**
 * Ajoute une todo au tableau Todos
 * @param {string} text 
 */
const addTodo = (text) => {
    todos.push({
        text,
        done: false,
        editMode: false
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

const toggleEditMode = index => {
    todos[index].editMode = !todos[index].editMode;
    displayTodo();
}

const editTodo = (index, input) => {
    const value = input.value;
    todos[index].text = value;
    todos[index].editMode = false;
    displayTodo();

}

displayTodo();

