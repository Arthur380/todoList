import {Component, ChangeDetectionStrategy, Input, OnInit} from '@angular/core';
import {TodoItem, TodoList, TodolistService} from '../todolist.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrCodeComponent implements OnInit{
  @Input() dataqr!: TodoList;

  constructor() { }

  ngOnInit(): void {
  }

  get qrInfo(): string{
    return JSON.stringify(this.dataqr);
  }

}
