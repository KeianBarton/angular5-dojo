import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.css']
})
export class ErrorNotificationComponent implements OnInit {

  @Input() message : string = "";
  @Output() dismissError : EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit() {
  }

  onDismissError(){
    this.dismissError.emit(true);
  }


}
