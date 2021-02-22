const getListName = document.querySelector('form input');
const addBtn = document.querySelector('form button');
const lists = document.querySelector('ul');
const markAsDone = document.querySelectorAll('markAsDone');
const deleteBtn = document.querySelectorAll('delete');
const namesOfTodosInLocalStorage = Object.keys(localStorage);

window.addEventListener('load', () => {
  if (localStorage.length === 0) {
  } else {
    namesOfTodosInLocalStorage.forEach((todoName) => {
      const newTodoName = document.createElement('p');
      const list = document.createElement('li');
      const newDeleteBtn = document.createElement('button');
      const newMarkAsDoneBtn = document.createElement('button');
      const newBtnSpan = document.createElement('span');
      newTodoName.innerText = todoName;
      newDeleteBtn.innerText = 'X';
      newDeleteBtn.classList.add('delete');

      if (localStorage.getItem(todoName) === 'todo') {
        newMarkAsDoneBtn.innerText = 'Mark as done';
      } else if (localStorage.getItem(todoName) === 'done') {
        newMarkAsDoneBtn.innerText = 'Unmark';
        newTodoName.style.textDecoration = 'line-through';
        newTodoName.style.color = 'green';
      }

      newMarkAsDoneBtn.classList.add('markAsDone');
      list.append(newTodoName);
      newBtnSpan.append(newMarkAsDoneBtn);
      newBtnSpan.append(newDeleteBtn);
      list.append(newBtnSpan);
      lists.append(list);
    });
  }
});
const addLi = () => {
  const newTodoName = document.createElement('p');
  const list = document.createElement('li');
  const newDeleteBtn = document.createElement('button');
  const newMarkAsDoneBtn = document.createElement('button');
  const newBtnSpan = document.createElement('span');
  newTodoName.innerText = getListName.value;
  newDeleteBtn.innerText = 'X';
  newDeleteBtn.classList.add('delete');
  newMarkAsDoneBtn.innerText = 'Mark as done';
  newMarkAsDoneBtn.classList.add('markAsDone');
  list.append(newTodoName);
  newBtnSpan.append(newMarkAsDoneBtn);
  newBtnSpan.append(newDeleteBtn);
  list.append(newBtnSpan);
  lists.append(list);
  localStorage.setItem(getListName.value, 'todo');
  getListName.value = '';
};
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (getListName.value !== '') {
    addLi();
  } else {
    getListName.focus();
  }
});

lists.addEventListener('click', (e) => {
  if (
    e.target.className === 'markAsDone' &&
    e.target.innerHTML === 'Mark as done'
  ) {
    e.target.parentElement.parentElement.firstChild.style.textDecoration =
      'line-through';
    e.target.parentElement.parentElement.firstChild.style.color = 'green';
    e.target.innerHTML = 'Unmark';
    localStorage[e.target.parentElement.parentElement.firstChild.innerText] =
      'done';
  } else if (
    e.target.className === 'markAsDone' &&
    e.target.innerHTML === 'Unmark'
  ) {
    e.target.parentElement.parentElement.firstChild.style.textDecoration =
      'none';
    e.target.parentElement.parentElement.firstChild.style.color =
      'rgb(214, 223, 235)';
    localStorage[e.target.parentElement.parentElement.firstChild.innerText] =
      'todo';
    e.target.innerHTML = 'Mark as done';
  } else if (e.target.className === 'delete') {
    localStorage.removeItem(
      e.target.parentElement.parentElement.firstChild.innerText
    );
    e.target.parentElement.parentElement.remove();
  }
});
document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addLi();
  }
});
