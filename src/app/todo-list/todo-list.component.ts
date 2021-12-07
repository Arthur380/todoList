import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem, TodoList, TodolistService } from '../todolist.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoListComponent implements OnInit {
  private filter = 'all';

  constructor(private TDLS: TodolistService) {
  }

  ngOnInit(): void {
  }

  setFilter(filter: string): void{
    this.filter = filter;
  }

  getItems(items: TodoItem[]): TodoItem[]{
    return items.filter(item => this.filter === 'all' ? item : this.filter === 'active' ? (!item.isDone ? item : null) : this.filter === 'ended' ? (item.isDone ? item : null) : null);
  }

  get obsTodoList(): Observable<TodoList> {
      return this.TDLS.observable;
  }

  append(label: string): void {
    this.TDLS.append(label);
  }

  updateItem(item: TodoItem, u: Partial<TodoItem>): void {
    this.TDLS.update(u, item);
  }

  delete(item: TodoItem): void {
    this.TDLS.remove(item);
  }

  deleteAll(): void {
    this.TDLS.removeAll();
  }

  removeChecked(): void {
    this.TDLS.removeChecked();
  }

  undo(): void {
    this.TDLS.undo();
  }

  redo(): void {
    this.TDLS.redo();
  }

  updateAll(isChecked: boolean): void{
    this.TDLS.updateAll(isChecked);
  }


}
