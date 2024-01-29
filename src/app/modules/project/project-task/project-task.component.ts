import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.scss']
})
export class ProjectTaskComponent implements OnInit {

  constructor() {
    console.log('constructor Task');

  }

  ngOnInit(): void {
    console.log('on init Tasks');

  }
}
