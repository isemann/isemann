import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { LayoutModule } from '@angular/cdk/layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
     RouterOutlet,
     RouterLink, 
     RouterLinkActive,
     MatGridListModule,
     MatToolbarModule,
     MatSidenavModule,
     MatListModule,
     MatIconModule,
     MatButtonModule,
     LayoutModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'isemann';
  time!: Date;
  hours = 0;
  msg = 'Hi';

  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web])
    .pipe(
      tap(value => console.log(value)),
      distinctUntilChanged()
    );

  Breakpoints = Breakpoints;
  currentBreakpoint:string = '';

  constructor(private breakpointObserver: BreakpointObserver){
    setInterval(() => {
      this.time = new Date();
   }, 1000);

   this.decide();
  }

  ngOnInit(): void {
    this.breakpoint$.subscribe(() =>
      this.breakpointChanged()
    );
  }
  private breakpointChanged() {
    if(this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      this.currentBreakpoint = Breakpoints.Handset;
    } else if(this.breakpointObserver.isMatched(Breakpoints.Tablet)) {
      this.currentBreakpoint = Breakpoints.Tablet;
    } else if(this.breakpointObserver.isMatched(Breakpoints.Web)) {
      this.currentBreakpoint = Breakpoints.Web;
    } 
  }

  decide() {
    this.hours = new Date().getHours();
    console.log("this.hours",this.hours)
    if(this.hours < 10){
      this.msg = "Good Morning"
      console.log("Morgen")
    }else if(this.hours < 16){
      this.msg = "Good Afternoon"
      console.log("Nachmittag")
    }else if(this.hours < 19){
      this.msg = "Good Evening"
    }else if(this.hours < 24){
      this.msg = "Good Night"
      console.log("Nacht")
    }else if(this.hours < 6){
      this.msg = "Sleep good"
      console.log("Schlaf gut")
    }
  }

  firebaseSusbscribing(){
    
  }

}
