import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {TodoItem} from '../todolist.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: '../../view/todo-item.component.html',
  styleUrls: ['../../view/style/todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {

  constructor() { }

  @Input() data!: TodoItem;

  ngOnInit(): void {
  }

}
