/**
 * @jest-environment jsdom
 */

document.body.innerHTML = `
  <div class="todo-container">
    <input type="text" id="taskInput" placeholder="Ajouter une tâche...">
    <ul id="taskList"></ul>
  </div>
`;

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert("Ajoute une tâche !");
    return;
  }

  const li = document.createElement('li');
  li.textContent = taskText;

  li.addEventListener('click', function() {
    li.classList.toggle('completed');
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Supprimer';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.onclick = function(e) {
    e.stopPropagation();
    li.remove();
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  taskInput.value = '';
}

describe('To-Do List - addTask()', () => {
  beforeEach(() => {
    taskInput.value = '';
    taskList.innerHTML = '';
  });

  test('Ajoute une tâche à la liste', () => {
    taskInput.value = 'Nouvelle tâche';
    addTask();

    const items = taskList.querySelectorAll('li');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('Nouvelle tâche');
  });

  test('Ne fait rien si la tâche est vide', () => {
    taskInput.value = '   ';
    window.alert = jest.fn(); // Mock l'alerte

    addTask();

    expect(taskList.children.length).toBe(0);
    expect(window.alert).toHaveBeenCalledWith("Ajoute une tâche !");
  });

  test('Ajoute le bouton Supprimer', () => {
    taskInput.value = 'Test bouton';
    addTask();

    const deleteBtn = taskList.querySelector('button.delete-btn');
    expect(deleteBtn).toBeTruthy();
    expect(deleteBtn.textContent).toBe('Supprimer');
  });
});
