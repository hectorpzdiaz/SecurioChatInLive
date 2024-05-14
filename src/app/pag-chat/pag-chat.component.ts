import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { PagLoginComponent } from '../pag-login/pag-login.component';
import {ModuleAppModule} from '../../app/module-app/module-app.module'
import {ActivatedRoute } from '@angular/router';
import {ChatMessage} from '../../app/models/chat-message'





@Component({
  selector: 'app-pag-chat',
  standalone: true,
  imports: [ModuleAppModule],
  templateUrl: './pag-chat.component.html',
  styleUrl: './pag-chat.component.css'
})
export class PagChatComponent implements OnInit {
  @ViewChild('imgUser')imgUser! : ElementRef<HTMLImageElement>
  @ViewChild('nameUser')nameUser! : ElementRef<HTMLHeadingElement>
  @ViewChild('nameServer')nameServer! : ElementRef<HTMLParagraphElement>
  @ViewChild('buttonDark')buttonDark! : ElementRef<HTMLDivElement>
  @ViewChild('dark')dark! : ElementRef<HTMLDivElement>
  @ViewChild('imgDark')imgDark! : ElementRef<HTMLImageElement>
  @ViewChild('contentFather')contentFather! : ElementRef<HTMLDivElement>
  @ViewChild('ConverssationChat')ConverssationChat! : ElementRef<HTMLDivElement>
  @ViewChild('headerChat')headerChat! : ElementRef<HTMLHeadElement>
  @ViewChild('messageFather')messageFather! : ElementRef





  



  private userImg : any =""
  private userName : any =""
  private serveName : any = ""
  messageInput : string = "";
 private userId : string = "";
 messageList : any[] = [];

  constructor(private chatService : ChatService, private router :  ActivatedRoute){}


  ngAfterViewInit(){

    this.changeInfoUser()
  }

  ngOnInit(): void {
    this.chatService.initConnectionSocjet()
    this.userId = this.router.snapshot.params["userId"];
    console.log(this.userId);
    this.listenerMessage();
   
 

  }



changeInfoUser(){

  const infoUser = this.chatService.getMetadatesUser();


  if (infoUser) {
    Object.entries(infoUser).forEach(([key, value]) => {
      if(key == "imageUser"){
        this.userImg = value
        console.log(this.userImg)
     

      }else if ( key == "nameUser"){
        this.userName = value

      }else{

        this.serveName = value
        console.log(this.serveName = value)
       
       

      }

     
    });
  } else {
    console.log('No se pudo obtener la información del usuario.');
  }
  


  this.chatService.joinRoom( this.serveName)
  this.nameUser.nativeElement.textContent = this.userName
  this.imgUser.nativeElement.src = this.userImg
  this.nameServer.nativeElement.textContent = this.serveName


}




sendMessageChat(){

  const chatMessage = {
    message : this.messageInput,
    user : this.userId,
    imgUser : ""
  
  }as ChatMessage
  
  
  this.chatService.sendMessage(this.serveName, chatMessage)
  
  
  }


  listenerMessage(){

    this.chatService.getMessageSubget().subscribe((messages : any )=>{
  
      this.messageList = messages.map((item : any)=>({
  
        ...item,
        message_side : item.user === this.userId ? 'sender' : 'receiver'
        
  
      }))
  
      
  
  console.log(this.messageList)
  
    })
  

  
    }

   private click = 0
 buttonLight(){
    


 if(this.click == 0){
      
  this.buttonDark.nativeElement.style.transition = "all 0.5s"
  this.buttonDark.nativeElement.style.transform= "translatex(2.5rem)"

  this.imgDark.nativeElement.src ="../../assets/image/night.png"


this.dark.nativeElement.style.background ="rgba(50, 43, 115, 1)"
this.dark.nativeElement.style.backgroundImage ="linear-gradient(180deg, rgba(50, 43, 115, 1) 61%, rgba(73, 69, 76, 1) 100%)"
this.dark.nativeElement.style.border ="2px solid rgba(37, 34, 209, 0.76)"
this.dark.nativeElement.style.transition = "all 0.5s"

this.ConverssationChat.nativeElement.style.backgroundImage ="url(../../assets/image/fondoSun.png)"

this.contentFather.nativeElement.style.background ="rgb(221, 224, 226)"
this.contentFather.nativeElement.style.transition = "all 0.5s"

this.headerChat.nativeElement.style.background ="#202C33"

this.messageFather.nativeElement.style.background ="#202C33"

     this.click++
 }else{

this.buttonDark.nativeElement.style.transform= "translatex(0)"

this.imgDark.nativeElement.src ="../../assets/image/day.png"


this.dark.nativeElement.style.border =" 2px solid  rgba(255, 255, 0, 0.76)"
this.dark.nativeElement.style.background ="rgba(231, 231, 226, 1)"
this.dark.nativeElement.style.backgroundImage ="linear-gradient(176deg, rgba(231, 231, 226, 1) 23%, rgba(218, 208, 123, 1) 95%) "

this.contentFather.nativeElement.style.background ="rgb(37,42,47)"

this.ConverssationChat.nativeElement.style.backgroundImage ="url(../../assets/image/fondChat.jpg)"

this.headerChat.nativeElement.style.background ="#f3f1f1"

this.messageFather.nativeElement.style.background ="#f3f1f1"




this.click--
 }
    }

}
