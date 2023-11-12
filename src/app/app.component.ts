import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
     RouterOutlet,
     MatGridListModule,
     MatToolbarModule,
     MatSidenavModule,
     MatListModule,
     MatIconModule,
     MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'isemann';
  time!: Date;
  hours = 0;
  msg = 'Hi';
  constructor(){
    setInterval(() => {
      this.time = new Date();
   }, 1000);

   this.decide();
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
