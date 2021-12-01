import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {TodoList, TodolistService} from '../todolist.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: '../../view/todo-list.component.html',
  styleUrls: ['../../view/style/todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  constructor(private todoList: TodolistService) { }

  ngOnInit(): void {
  }

  public appendInTodoList(label: any): void{
    this.todoList.append(label);
  }

  public getTodoList(): Observable<TodoList>{
    return this.todoList.observable;
  }

}
