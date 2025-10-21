import { BreakpointObserver, Breakpoints, BreakpointState  } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver
    .observe([Breakpoints.XSmall,Breakpoints.HandsetPortrait])
    .subscribe((state: BreakpointState) =>{
      if(state.matches){
        console.log('version mobil')

      }else{
        console.log('version desktop')
      }
    })
  }

}
