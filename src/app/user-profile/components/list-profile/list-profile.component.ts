import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.scss']
})
export class ListProfileComponent implements OnInit {
  @Input() dataListUser!:User;
  constructor() { }

  ngOnInit(): void {
  }

}
