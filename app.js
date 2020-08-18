document.getElementById('formTask').addEventListener('submit', saveTask);

function  saveTask(e){

  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;

  const task = {
    title, //title: title,
    description //description: description
  };

  /*LocalStorage: nos permite almacenar los datos dentro de la propia memoria del navegador, 
  * aun cuando se cierre, los datos se mantendrán.
  * Uno de sus métodos principales es setItem, el que permite almacenar datos. Recibe 2 parámetros:
  * 1) nombre de como se llamaran esos datos - "tasks";
  * 2) y el valor de esos datos, lo que almaceraremos - "taks" (la constante antes creada), 
  * pero antes de almacenar el dato, lo convertiremos a un string
  */

  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formTask').reset();
  e.preventDefault();
}

//Obtendremos las tareas para mostrarlas en pantalla
function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  for(let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;

    tasksView.innerHTML += `
      <div class="card mb-3">
        <div class="card-body">
          <p>${title} - ${description}
          <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">Delete</a>
          </p>
        </div>
      </div>`;
  }
}

function deleteTask(title) {
  console.log(title)
  let task = JSON.parse(localStorage.getItem('tasks'));
  //Acá recorremos todas las tareas que se encuentran en el localStorage
  for(let i = 0; i < tasks.length; i++){
    if (tasks[i].title == title){
      //Si bien push permite ingresar un dato al arreglo, splice permite eliminarlo
      tasks.splice(i, 1);
    }
  }
  //Volvemos a listar las tareas con el ítem eliminado
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

getTasks();