const addButton = document.querySelector('.add');
const clearButton = document.querySelector('.clear');
const textArea = document.querySelector('.txt-area');
const taskList = document.querySelector('.task-list');
const taskListItem = document.getElementsByClassName('.task-list-item');

const list = [];

function main() {
    const listElement = document.createElement('li');
    const taskContent = document.createElement('input');
    const deleteElement = document.createElement('button');
    const editButton = document.createElement('button');
    const checkbox = document.createElement('input');

    taskContent.setAttribute('readonly', 'readonly');
    checkbox.type = 'checkbox'
    checkbox.className = 'checkbox';
    listElement.className = 'task-list-item';
    taskContent.className = 'task-content';
    deleteElement.className = 'delete-button';
    editButton.className = 'edit-button';
    deleteElement.textContent = 'Delete';
    editButton.textContent = 'Edit';

    if (!(textArea.value === '')) {
        list.push(listElement);
        taskList.appendChild(listElement);
        listElement.appendChild(checkbox);
        listElement.appendChild(taskContent);
        listElement.appendChild(editButton);
        listElement.appendChild(deleteElement);
        taskContent.value = textArea.value;
        
        list.forEach(function(element, key) {
            element.id = key;
            taskList.appendChild(element);
        });
    }

    else {
        return;
    }

    textArea.value = '';
    taskContent.disabled = true;

    editButton.addEventListener('click', function(event) {
        event.preventDefault();

        if (editButton.textContent.toLocaleLowerCase() === 'edit') {
            taskContent.disabled = false;
            taskContent.removeAttribute('readonly');
            taskContent.focus();
            editButton.textContent = 'Save';
        }
        else {
            taskContent.setAttribute('readonly', 'readonly');
            taskContent.disabled = true;
            editButton.textContent = 'Edit';
        }
    });

    deleteElement.addEventListener('click', function(event) {
        event.preventDefault();
        const index = event.target.parentNode.id;
        list.splice(index, 1);
        this.parentElement.remove();

        console.log(list);
    });

    clearButton.addEventListener('click', function(event) {
        event.preventDefault();

        const checkboxes = document.getElementsByClassName('checkbox');

        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkboxes[i].parentElement.remove();
                list.splice(list[i], 1);
            }
        }
    });
}

textArea.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        if (list.length < 7) {
            main();
        }
        else {
            console.log('task list is full!');
        }
    }
});

addButton.addEventListener('click', function() {
    if (list.length < 7) {
        main();
    }
    else {
        console.log('task list is full!');
    }
});
