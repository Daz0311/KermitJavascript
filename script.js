// - OPERAZIONI DA FARE AD AVVIO PAGINA

// Recupero gli elementi di interesse nella pagina
const kermitButton = document.getElementById('kermit-btn');
const nukeButton = document.getElementById('reset-btn');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');

// Creo una chiave per il local storage
const STORAGE_KEY = '__bool_todo__';

// Preparo una lista attività
let activities = [];

// Controllo se per caso c'erano delle attività nel local storage
const storage = localStorage.getItem(STORAGE_KEY);

if(storage){
    activities = JSON.parse(storage);
}

// Chiedo a JS di decidere cosa mostrare
showContent();

// - OPERAZIONI DINAMICHE
// Reagisco al click del bottone
kermitButton.addEventListener('click', function() {
// chiedo di aggiungere attività
addActivity()
});

document.addEventListener("keydown", function(event)  {
    if (event.key == "Enter") {
        kermitButton.click();
    }
});

// imposto nuke button
nukeButton.addEventListener('click', function(){
    resetActivity()
});

// - FUNZIONI
// Funzione che decide cosa mostrare in pagina
function showContent(){
    // innanzitutto pulisco tutto
    todoList.innerText = "";
    emptyListMessage.innerText = "";


    // Se c'è almeno un'attività...
if(activities.length > 0){
    // per ciascuna attività... 
    activities.forEach(function(activity) {
    // Crea un template HTML
        const template = createActivityTemplate(activity)
        
    // Inseriscilo in pagina
    todoList.innerHTML += template;
    });

  // Rendi cliccabili tutti i check
  makeCheckClickable();


} else {
    // ALTRIMENTI
    //mostra il messaggio di lista vuota
    emptyListMessage.innerText = "Nothing to be done for Kermit."
}
}

// Funzione per rendere i check cliccabili
function makeCheckClickable(){
      // Cerca tutti i check e fa sì che siano clicabili
      const checks = document.querySelectorAll(".todo-check");
      // Per ognuno dei check
      checks.forEach(function(check, index){
          //Aggiungi una reazione al click
          check.addEventListener("click", function(){
              //Rimuovi l'elemento dalla lista
              activities.splice(index , 1)

              // Aggiorna anche il localStorage
              localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
              
              // Aggiorna la lista in pagina
              showContent();
          });
      })
}

// Funzione per aggiungere attività
function addActivity() {
// Recupero il testo nel campo
const newActivity = inputField.value.trim();

// Se il campo non è vuoto...
if(newActivity.length > 0){
// Aggiungo l'attività alla lista
activities.push(newActivity);

// Aggiorna lo storage
localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

// Ora, decidi cosa mostrare
showContent();

// Svuoto il campo
inputField.value = "";
}
}

function resetActivity() {
    if (activities.length > 0) {
        activities.length = 0;
        localStorage.clear(STORAGE_KEY, JSON.stringify(activities));
        console.log("reset clicked");
        showContent();
    }
};

// Funzione che crea un template HTMl per un'attività
function createActivityTemplate(activity){
    //restituisci questo pezzo di HTML
    return `
       <li class="todo-item">
        <div class="todo-check">
        <img src="images/checked.png" alt="check icon" width="20px">
    </div>
        <p class="todo-text">${activity}</p>
    </li>
    `;
}