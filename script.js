// OPERAZIONI DA FARE A INIZIO PAGINA

// Recupero gli elementi di interesse nella pagina
const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');

// Preparo una lista attività
let activities = ["Take Kermit", "Love Kermit", "Hug Kermit"];

// Chiedo a JS di decidere cosa mostrare
showContent();

// FUNZIONI
// Funzione che decide cosa mostrare in pagina
function showContent(){
    // innanzitutto pulisco tutto
    todoList.innerText = "";
    emptyListMessage.innerText = "";
}

if(activities.length > 0){

    // Se c'è almeno un'attività...
    // mostra le attività
    //per ciascuna attività...
    activities.forEach(function(activity) {
        console.log( `
               <li class="todo-item">
                <div class="todo-check">
                <img src="images/checked.png" alt="check icon" width="20px">
            </div>
                <p class="todo-text">${activity}</p>
            </li>` )
    });
    
} else {
    // ALTRIMENTI
    //mostra il messaggio di lista vuota
    emptyListMessage.innerText = "Niente da fare per Kermit"
}
    