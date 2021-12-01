import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TodoItem, TodoList, TodolistService} from '../controller/todolist.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: '../view/app.component.html',
  styleUrls: ['../view/style/app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(private todoList: TodolistService){
  }

  public getTodoList(): Observable<TodoList>{
    return this.todoList.observable;
  }

  public removeInTodoList(item: any): void{
    this.todoList.remove(item);
  }

  public updateItem(item: any, checked: boolean): void{
    item.isDone = checked;
    this.todoList.update(item);
  }

  public updateItemLabel(item: any, newLabel: string): void{
    item.label = newLabel;
    this.todoList.update(item);
  }

}
