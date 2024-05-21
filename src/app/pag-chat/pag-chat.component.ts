import { Component, ElementRef, Renderer2,OnInit, ViewChild} from '@angular/core';
import { ChatService } from '../service/chat.service';
import {ModuleAppModule} from '../../app/module-app/module-app.module'
import {ActivatedRoute } from '@angular/router';
import {ChatMessage} from '../../app/models/chat-message'
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';






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
  @ViewChild('inputMessage')inputMessage! : ElementRef
  @ViewChild('contentServer')contentServer! : ElementRef
  @ViewChild('ContentMessages')ContentMessages! : ElementRef

  private sizeWindows = window.innerWidth;
  private userImg : any =""
  private userName : any =""
  private serveName : any = ""
  messageInput : string = "";
 private userId : string = "";
 messageList : any[] = [];




  





  constructor(private chatService : ChatService, private router :  ActivatedRoute , private renderer: Renderer2,private http : HttpClient){}


  ngAfterViewInit(){

    this.changeInfoUser();
 
  }

  ngOnInit(): void {
    this.chatService.initConnectionSocjet()
    this.userId = this.router.snapshot.params["userId"];
    this.listenerMessage();
    //cambio de tamaño en el chat,para que se vea mas grande

    if(this.sizeWindows <= 799 ){
      this.renderer.setStyle(document.documentElement, 'font-size','63%');
    
    } else{
   
    }

  }


changeInfoUser(){

  const infoUser = this.chatService.getMetadatesUser();
  //this.toggleCOntenet()

  if (infoUser) {
    Object.entries(infoUser).forEach(([key, value]) => {
      if(key == "imageUser"){
        this.userImg = value
      
     

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
  

  var  subscriptiom : Subscription = this.http.post<any>('https://securioserver.onrender.com/img',this.userImg ).subscribe((datesResponse)=>{
    const chatMessage = {
      message : this.messageInput,
      user : this.userId,
      imgUser : ""
    
    }as ChatMessage


  this.chatService.sendMessage(this.serveName, chatMessage)

  setTimeout(()=>{
    var contenteMessen = this.ContentMessages.nativeElement
    contenteMessen.scrollTop = contenteMessen.scrollHeight;

  }, 100)


  this.inputMessage.nativeElement.value="";

  })


  
  
  }


  listenerMessage(){

    this.chatService.getMessageSubget().subscribe((messages : any )=>{
     
      this.messageList = messages.map((item : any)=>({
      
        ...item,
        message_side : item.user === this.userId ? 'sender' : 'receiver'
      }))
  
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
this.dark.nativeElement.style.border ="1px solid rgba(37, 34, 209, 0.76)"
this.dark.nativeElement.style.transition = "all 0.5s"

this.ConverssationChat.nativeElement.style.background = "url(../../assets/image/fondoSun.jpg)"
if(this.sizeWindows <= 1299){
  this.ConverssationChat.nativeElement.style.backgroundSize ="75%"
}else{
  this.ConverssationChat.nativeElement.style.backgroundSize ="28%"
}

this.contentFather.nativeElement.style.background ="rgb(221, 224, 226)"
this.contentFather.nativeElement.style.transition = "all 0.5s"

this.headerChat.nativeElement.style.background ="#eaeaeb"
this.headerChat.nativeElement.style.borderBottom ="1px solid rgba(182, 182, 182, 0.589)"

this.contentServer.nativeElement.style.color ="black"


this.nameUser.nativeElement.style.color="black"

this.inputMessage.nativeElement.style.background = "#eaeaeb"
this.inputMessage.nativeElement.style.color ="black"



     this.click++
 }else{

this.buttonDark.nativeElement.style.transform= "translatex(0)"

this.imgDark.nativeElement.src ="../../assets/image/day.png"


this.dark.nativeElement.style.border =" 1px solid  rgba(255, 255, 0, 0.76)"
this.dark.nativeElement.style.background ="rgba(231, 231, 226, 1)"
this.dark.nativeElement.style.backgroundImage ="linear-gradient(176deg, rgba(231, 231, 226, 1) 23%, rgba(218, 208, 123, 1) 95%) "

this.contentFather.nativeElement.style.background ="rgb(37,42,47)"

this.ConverssationChat.nativeElement.style.backgroundImage ="url(../../assets/image/fondChat.jpg)"

if(this.sizeWindows <= 1299){
  this.ConverssationChat.nativeElement.style.backgroundSize ="80%"
}else{
  this.ConverssationChat.nativeElement.style.backgroundSize ="35%"
}


this.contentServer.nativeElement.style.color ="#dddfe0"


this.headerChat.nativeElement.style.background ="#171a1d"
this.headerChat.nativeElement.style.borderBottom =" 1px solid rgba(255, 255, 255, 0.295)"


this.inputMessage.nativeElement.style.background = "rgb(41, 48, 65)"
this.inputMessage.nativeElement.style.color ="#dddfe0"

this.nameUser.nativeElement.style.color="#dddfe0"




this.click--
 }
    }

}
