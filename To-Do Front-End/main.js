// Task Class : Represents a Task
class Task {
    constructor (title, date){
        this.title = title;
        this.date = date; 
    }
}


// UI Class: Handle UI Tasks

class UI {
    static displayLists () {
       

        const lists = StoredLists;

        lists.forEach(list => UI.addTaskToList(list)) ;  // in arrow function if there is only one property and one argument then there is no need for enclosing them in bracets and curly braces, we can direclty pass it. 
    }

      static addTaskToList(list) {
          const task = document.querySelector ('#task-list');

          const row = document.createElement('tr');

          row.innerHTML = `
          <td id="title">${list.title}</td>
            <td id="date">${list.date}</td>
            <td><a href="#" class="btn btn-info btn-sm edit">Edit</a></td>
            <td><a href="#" class="btn btn-success btn-sm update">Update</a></td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
            `;

          task.appendChild(row);

        }
     



    static deleteList(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }  

    static editList(el) {
        if(el.classList.contains('edit')){
            var title = el.parentElement.parentElement.childNodes[1].innerHTML;
            var date = el.parentElement.parentElement.childNodes[3].innerHTML;
            // console.log(el.parentElement.parentElement);
            // console.log(el.parentElement.parentElement.childNodes[1].innerHTML);
            // console.log(el.parentElement.parentElement.childNodes[3].innerHTML);
            el.parentElement.parentElement.innerHTML = `
            <td id="title"><input type="text" id="editTitle" class="form-control" value="${title}"></td>
            <td id="date"><input type="date" id="editDate" class="form-control" value="${date}"></td>
            <td><a href="#" class="btn btn-success btn-sm update">Update</a></td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
            `

        }
    } 



    static updateList(el) {
        if(el.classList.contains('update')){
            var title = document.querySelector('#editTitle').value;
            var date = document.querySelector('#editDate').value;;    
            
            el.parentElement.parentElement.innerHTML = `
            <td id="title">${title}</td>
            <td id="date">${date}</td>
            <td><a href="#" class="btn btn-info btn-sm edit">Edit</a></td>
            <td><a href="#" class="btn btn-success btn-sm update">Update</a></td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
            `;
        }
    } 
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form =document.querySelector('#list-form');
        container.insertBefore(div, form);
        // Vanish in 2 seconds
        setTimeout(() => document.querySelector('.alert').remove(),2000);
    }


    static clearFields() {
      document.querySelector('#title').value='';
      document.querySelector('#date').value='';
    }    
}


// Event : Display Tasks
document.addEventListener ('DOMContentLoaded', UI.displayLists);

// Event: Add a Task
document.querySelector('#list-form').addEventListener('submit', function(e)
 {
// Prevent actual submit
e.preventDefault();

// Get form values
const title = document.querySelector('#title').value;
const date = document.querySelector('#date').value;

//Validate
if(title==='' || date===''){
    UI.showAlert('Please fill in all fields', 'danger') ;
   // alert ('Please fill in all fields') ;
} else {
 //Instatiate List
const list = new Task(title, date);


// Add Task to UI
UI.addTaskToList(list);
// console.log(list)

// Clear fields
UI.clearFields();
}
});

// Event : Remove a Task
document.querySelector('#task-list').addEventListener('click', function(e) {
  
UI.deleteList(e.target)
// console.log(e.target)

});

// Event : Edit a Task
document.querySelector('#task-list').addEventListener('click', function(e) {
  
    UI.editList(e.target)
   // console.log(e.target)
    
});

// Event : Update a Task
document.querySelector('#task-list').addEventListener('click', function(e) {
  
    UI.updateList(e.target)
   // console.log(e.target) 
});