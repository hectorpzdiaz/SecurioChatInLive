import { Component, OnInit } from '@angular/core';
import {ModuleAppModule} from '../../src/app/module-app/module-app.module'
import { Router } from '@angular/router';
import {ChatService} from '../app/service/chat.service'



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ModuleAppModule],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
 
  constructor(private router : Router, private chatService : ChatService){}



ngOnInit(): void {
  
this.navigateRouter()
this.initRouter()


}



initRouter(){
  this.router.navigate(["/home"])
  
}

navigateRouter(){


  var acces : boolean = false;

  this.chatService.getObservableAccess().subscribe((date) =>{
    console.log("entro")
    acces = date
    if(acces == false){
  
      this.router.navigate(["/home"])
  
    }else {

        var number : number = Math.floor(Math.random()*10000);
        console.log(number)
      this.router.navigate([`/chat/${number}`])

    }



  })
 


}


}
