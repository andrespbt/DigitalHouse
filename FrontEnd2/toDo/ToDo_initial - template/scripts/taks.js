// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.

if (!localStorage.getItem('jwt')) {
  window.location.replace('./index.html');
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCloseSession = document.getElementById('closeApp');
  const formCreateTask = document.querySelector('.nueva-tarea');
  const urlBase = 'https://ctd-todo-api.herokuapp.com/v1';
  const jwt = localStorage.getItem('jwt');

  // Functions
  getUserName();
  getTasks();

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCloseSession.addEventListener('click', function () {
    localStorage.removeItem('jwt');
    window.location.reload();
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function getUserName() {
    const config = {
      method: 'GET',
      headers: {
        authorization: jwt
      }
    };

    fetch(`${urlBase}/users/getMe`, config)
      .then(res => res.json())
      .then(data => {
        if (data) {
          const nameContainer = document.querySelector('.user-info p');
          const firstName = data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1);
          const lastName = data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1);
          nameContainer.textContent = firstName + ' ' + lastName;
        } else {
          console.log('Impossible to connect to the server');
        }
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function getTasks() {
    const config = {
      method: 'GET',
      headers: {
        authorization: jwt
      }
    };
    fetch(`${urlBase}/tasks`, config)
      .then(res => res.json())
      .then(data => renderTasks(data));
  }

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCreateTask.addEventListener('submit', function (e) {
    e.preventDefault();
    const newTaskInput = document.querySelector('#nuevaTarea');
    const newTask = {
      description: newTaskInput.value,
      completed: false
    };
    const config = {
      method: 'POST',
      headers: {
        authorization: jwt,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    };

    fetch(`${urlBase}/tasks`, config).then(res => {
      if (res.status === 201) {
        showMesagge('Task created successfully');
        getTasks();
      } else {
        showMesagge('Can not create task');
      }
    });

    formCreateTask.reset();
  });

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderTasks(listado) {
    const pendingTasks = listado.filter(task => task.completed === false).reverse();
    const completedTasks = listado.filter(task => task.completed === true).reverse();
    const pendingTasksContainer = document.querySelector('.tareas-pendientes');
    const completedTasksContainer = document.querySelector('.tareas-terminadas');
    const countPending = document.getElementById('cantidad-pendientes');
    const countCompleted = document.getElementById('cantidad-finalizadas');

    // Render if there is tasks
    if (pendingTasks.length > 0) {
      cleanHtml(pendingTasksContainer);
      pendingTasks.forEach(task => {
        let template = `
            <li class="tarea" data-aos="fade-down">
          <button class="change" id="${task.id}"><i class="fa-regular fa-circle"></i></button>
          <div class="descripcion">
            <p class="nombre">${task.description}</p>
            <p class="timestamp">${task.createdAt}</p>
          </div>
        </li>`;

        pendingTasksContainer.innerHTML += template;
      });
    } else {
      pendingTasksContainer.innerHTML = '';
    }

    if (completedTasks.length > 0) {
      cleanHtml(completedTasksContainer);
      completedTasks.forEach(task => {
        let template = `<li class="tarea" data-aos="fade-up">
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${task.description}</p>
              <div class="cambios-estados">
                <button class="changeCompleta" id="${task.id}" ><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id="${task.id}"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </li>`;

        completedTasksContainer.innerHTML += template;
      });
    } else {
      completedTasksContainer.innerHTML = '';
    }

    // Update count
    countPending.textContent = pendingTasks.length;
    countCompleted.textContent = completedTasks.length;

    // Add event listeners
    pendingTasksContainer.addEventListener('click', botonesCambioEstado);
    completedTasksContainer.addEventListener('click', botonesCambioEstado);
  }

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado(e) {
    const id = Number(e.target.id);
    // To complete task
    if (e.target.classList.contains('change')) {
      const task = e.target.nextElementSibling.querySelector('.nombre').textContent;

      const taskObject = {
        description: task,
        completed: true
      };

      const config = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', authorization: jwt },
        body: JSON.stringify(taskObject)
      };

      fetch(`${urlBase}/tasks/${id}`, config).then(res => {
        if (res.status === 200) {
          showMesagge('Task completed. Congrats!');
          getTasks();
        } else {
          showMesagge('Could not mark as completed. Sorry', 'error');
        }
      });
    }

    // To made task pending again

    if (e.target.classList.contains('changeCompleta')) {
      const task = e.target.parentElement.parentElement.querySelector('.nombre').textContent;

      const taskObject = {
        description: task,
        completed: false
      };

      const config = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', authorization: jwt },
        body: JSON.stringify(taskObject)
      };

      fetch(`${urlBase}/tasks/${id}`, config).then(res => {
        if (res.status === 200) {
          showMesagge('Task mark as pending again.');
          getTasks();
        } else {
          showMesagge('Could not mark as pending.', 'error');
        }
      });
    }

    if (e.target.classList.contains('borrar')) {
      deleteTask(id);
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function deleteTask(id) {
    const config = {
      method: 'DELETE',
      headers: {
        authorization: jwt
      }
    };

    fetch(`${urlBase}/tasks/${id}`, config).then(res => {
      if (res.status === 200) {
        showMesagge('Task deleted successfully');
        getTasks();
      } else {
        showMesagge('Could not delete task', 'error');
      }
    });
  }

  function cleanHtml(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function showMesagge(msg, type) {
    const alertIsShow = document.querySelector('.success');
    if (alertIsShow) {
      alertIsShow.remove();
    }
    const container = document.querySelector('.containerMain');
    const tasksContainer = document.querySelector('.contenedor__tareas');
    const msgDiv = document.createElement('div');
    msgDiv.textContent = `${msg}`;

    if (type === 'error') {
      msgDiv.classList.add('error');
    } else {
      msgDiv.classList.add('success');
    }

    container.insertBefore(msgDiv, tasksContainer);
    setTimeout(() => {
      msgDiv.remove();
    }, 3000);
  }
});
