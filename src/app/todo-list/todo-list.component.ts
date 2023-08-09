import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit{
  newTodo: string = '';
  todos: string[] = [];

  ngOnInit(): void {
    this.loadTodoItems();
  }

  addTodo(): void {
    if (this.isValidInput(this.newTodo)) {
      this.todos.push(this.newTodo);
      this.updateLocalStorage();
      this.newTodo = '';
    } else {
      alert("Please enter a valid To-Do item (4-200 characters, no special characters).");
    }
  }

  removeTodo(todo: string): void {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  isValidInput(text: string): boolean {
    return /^[a-zA-Z0-9\s]*$/.test(text) && text.length >= 4 && text.length <= 200;
  }

  updateLocalStorage(): void {
    localStorage.setItem('todoItems', JSON.stringify(this.todos));
  }

  loadTodoItems(): void {
    const storedItems = localStorage.getItem('todoItems');
    if (storedItems) {
      this.todos = JSON.parse(storedItems);
    }
  }
}

