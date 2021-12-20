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
  editLabel = false;

  constructor(private TDLS: TodolistService) {
  }

  ngOnInit(): void {
  }

  setFilter(filter: string): void{
    this.filter = filter;
  }

  get filterItems(): string{
    return this.filter;
  }

  getItems(items: any): any{
    // tslint:disable-next-line:max-line-length
    return items.filter((item: any) => this.filter === 'all' ? item : (this.filter === 'active' ? (!item.isDone ? item : null) : this.filter === 'ended' ? (item.isDone ? item : null) : null));
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

  updateAll(items: any): void{
    let selected = false;
    for (const item of items){
      if (item.isDone === true){
        selected = true;
        break;
      }
    }

    for (const item of items){
      this.TDLS.update({isDone: !selected}, item );
    }
  }

  getRestant(items: any): number {
    let i = 0;
    for (const item of items) {
      if (!item.isDone) {
        i++;
      }
    }
    return i;
  }

  setEditable(editable: boolean): void{
    this.editLabel = editable;
  }

  updateLabelTodoList(label: string): void{
    this.TDLS.updateLabelTodoList(label);
    this.editLabel = !this.editLabel;
  }
}
