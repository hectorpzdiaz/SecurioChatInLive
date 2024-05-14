import { Component, ElementRef, OnInit, ViewChild,HostListener, viewChild, COMPILER_OPTIONS} from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription , pluck} from 'rxjs';
import {ChatService} from '../service/chat.service'





@Component({
  selector: 'app-pag-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pag-login.component.html',
  styleUrl: './pag-login.component.css'
})
export class PagLoginComponent {


  @ViewChild('conversleft')conversleft! : ElementRef
  @ViewChild('conversRight')conversRight! : ElementRef 
  @ViewChild('WritterChat')WritterChat! : ElementRef <HTMLInputElement>
  @ViewChild('moveWordLeft')moveWordLeft! : ElementRef <HTMLParagraphElement>
  @ViewChild('moveWordRight')moveWordRight! : ElementRef <HTMLParagraphElement>
  @ViewChild('imgPadlockOpne')imgPadlockOpne! : ElementRef <HTMLImageElement>
  @ViewChild('imgPadlockClosed')imgPadlockClosed! : ElementRef <HTMLImageElement>
  @ViewChild('letGo')letGo! : ElementRef <HTMLButtonElement>
  @ViewChild('sectionLogin') sectionLogin! : ElementRef<HTMLSelectElement>
  @ViewChild('headerLogin') headerLogin! : ElementRef<HTMLSelectElement>
  @ViewChild('fondoBlur') fondoBlur! : ElementRef<HTMLDivElement>
  @ViewChild('userName') userName! : ElementRef<HTMLDivElement>
  @ViewChild('chatSniff') chatSniff! : ElementRef<HTMLDivElement>
  @ViewChild('chatSniffLook') chatSniffLook! : ElementRef<HTMLDivElement>
  @ViewChild('moveSniff') moveSniff! : ElementRef<HTMLDivElement>
  @ViewChild('writterChatRight') writterChatRight! : ElementRef<HTMLInputElement>
  @ViewChild('conversSniffer') conversSniffer! : ElementRef<HTMLDivElement>
  @ViewChild('wordSniffer') wordSniffer! : ElementRef<HTMLDivElement>
  @ViewChild('imgLock')imgLock! : ElementRef<HTMLImageElement>
  @ViewChild('chatIndividual')chatIndividual! : ElementRef<HTMLDivElement>
 private tamañoPantalla = window.innerWidth;






  constructor( private chatService : ChatService ,private http : HttpClient){
   

  
  }

  
 

  ngOnInit(): void {


   


  }





  numLeft: number = 14;
  numRight: number = 13;
  

                //chat Left

  endMenssageLeft( ){
    const moveWordLeft = document.getElementById('moveWordLeft');
    const moveWordRight = document.getElementById('moveWordRight');
    const conversSniffer = document.getElementById('conversSniffer');


  

    if (conversSniffer  ) {
      let firstChild = conversSniffer.firstChild;
     
    
      while (firstChild  ) {
        conversSniffer.removeChild(firstChild);
        firstChild = conversSniffer.firstChild; // Refrescar firstChild después de cada eliminación
      }
    }
 
    
 
 

    if (moveWordLeft  ) {
      let firstChild = moveWordLeft.firstChild;
     
    
      while (firstChild  ) {
        moveWordLeft.removeChild(firstChild);
        firstChild = moveWordLeft.firstChild; // Refrescar firstChild después de cada eliminación
      }
    }
 
    if (moveWordRight  ) {
      let firstChild2 = moveWordRight.firstChild;
     
    
      while (firstChild2  ) {
        moveWordRight .removeChild(firstChild2);
    
       
        firstChild2 = moveWordRight.firstChild; // Refrescar firstChild después de cada eliminación
      }
    }
  
    
  const word : string | null =  this.WritterChat.nativeElement.value.trim()

  if(word != ""){
    console.log("entro")

    
    this.chatSniff.nativeElement.style.transition = ' all 0.5s ';
  
    this.imgLock.nativeElement.style.transition = ' all 0.5s ';
  
    setTimeout(() => {
      

    this.chatSniff.nativeElement.style.transform = " scale(0.9)"
    this.chatSniff.nativeElement.style.opacity = "1"
    if(this.tamañoPantalla <= 799){

      this.chatIndividual.nativeElement.style.height = '86rem';
      this.chatSniff.nativeElement.style.transform = "translateX(0rem) translateY(36rem)"
    }else{
      this.chatSniff.nativeElement.style.transform = "translateX(40rem) "
      this.chatIndividual.nativeElement.style.width = '90rem';
    }
    this.imgLock.nativeElement.style.opacity = "1"
   



    }, 500);


    this.menssageMoveLeft(word);
    this.messageChatLeft(word);
    this.menssageMoveRight();
    this.messageChatRight(word);
   
 
    this.WritterChat!.nativeElement.value = "";

  }else{

       while (this.conversSniffer.nativeElement.firstChild){

      this.conversSniffer.nativeElement.removeChild(this.conversSniffer.nativeElement.firstChild)
  
    }




  }


}




menssageMoveLeft(word : string | null){


  console.log("palabra" , word)

  // here is if the is something in the div


 
   const palabras = word!.split(" ")// split word

   for (var i = 0; i < palabras.length; i++) {

    palabras[i].split(' ').forEach((letter) => {
        const span = document.createElement('span');
        span.textContent = letter;
     
        span.style.position = 'relative';
        span.style.transition = 'all 5s ease-in-out';
        span.style.fontSize ="1.1rem"
        span.style.left = `-5rem`;
        span.style.padding = '0.4rem'
     

        setTimeout(() => {
          span.style.left= `60rem`; // move the word for have a efect of move
       
        }, 1000 ); 
     
        this.moveWordLeft!.nativeElement.appendChild(span);

    });
  

}

}

 wordSniff : string =""
menssageMoveRight(){


  var wordRandom : string = "ABCDEFGHIxgrsdafcyz0123456789 "
  const longitud = wordRandom.length
 
  for ( var j =0; j < longitud; j++){
    const palabra = Math.floor(Math.random()* longitud)
    var h = wordRandom.charAt(palabra)
    const  spanCrypt = document.createElement('span')
    spanCrypt.style.position = 'relative';
    spanCrypt.style.transition = 'all 5s ease-in-out';
    spanCrypt.style.right = `30rem`;
    spanCrypt.textContent = h
   

   


    setTimeout(() => {

   
      this.imgPadlockClosed.nativeElement.style.display ="block"
      this.imgPadlockOpne.nativeElement.style.display ="none"
      // Mover la letra de vuelta a su posición original
      spanCrypt.style.right = `-25rem`;
      
   
  }, 2000 ); // Establecer un retraso creciente para cada palabra
 this.wordSniff +=h



this.moveWordRight.nativeElement.appendChild(spanCrypt)
  }
    


  this.messajeChatSniff(this.wordSniff)

    }
  





messageChatLeft(word : string | null){


    let moveCrypt: HTMLParagraphElement | null;
  moveCrypt = document.querySelector('#moveCrypt ') as HTMLParagraphElement |null;
  var content = document.createElement('p');
  content.textContent = word;
  content.style.top = this.numLeft + 'rem'; // Establecer la posición top
  content.classList.add("content");
  this.numLeft += 3.5// Incrementar num en 1



  this.conversleft?.nativeElement.appendChild(content)
  
// this is for that scroll is always dowmn
  const div = this.conversleft.nativeElement
  div.scrollTop = div.scrollHeight;


      
}

messageChatRight(word : string | null){

  var content = document.createElement('p');
  content.textContent = word;
  content.style.top = this.numRight + 'rem'; // Establecer la posición top
  content.classList.add("content2");
  this.numRight += 3.5// Incrementar num en 1

 

setTimeout(() =>{

  this.conversRight?.nativeElement.appendChild(content)
  const div2 = this.conversRight.nativeElement
  div2.scrollTop = div2.scrollHeight;
  console.log(div2.scrollHeight, div2.scrollTop )
  this.imgPadlockClosed.nativeElement.style.display ="none"
  this.imgPadlockOpne.nativeElement.style.display ="block"
},5000)



}



viewLogin(){

  
  this.fondoBlur.nativeElement.style.display = 'block'
  this.sectionLogin.nativeElement.style.transition = 'all 0.2s ease-in-out';
  this.sectionLogin.nativeElement.style.opacity = "1"
  this.sectionLogin.nativeElement.style.zIndex = '2'


}


quitLogin(){

  this.fondoBlur.nativeElement.style.display = 'none'
  this.sectionLogin.nativeElement.style.opacity = "0"
  this.sectionLogin.nativeElement.style.transition = 'all 0s ease-in-out';
  this.sectionLogin.nativeElement.style.zIndex = '-1'




}




                     //chat right 


endMessageRight(){

  const conversSniffer = document.getElementById('conversSniffer');

  if (conversSniffer  ) {
    let firstChild = conversSniffer.firstChild;
   
  
    while (firstChild  ) {
      conversSniffer.removeChild(firstChild);
      firstChild = conversSniffer.firstChild; // Refrescar firstChild después de cada eliminación
    }
  }


  const moveWordLeft = document.getElementById('moveWordLeft');
  const moveWordRight = document.getElementById('moveWordRight');
  if (moveWordLeft && moveWordRight ) {
    let firstChildmoveWordLeft = moveWordLeft.firstChild;
    let firstChildmoveWordRight = moveWordRight.firstChild;
  
    while (firstChildmoveWordLeft && firstChildmoveWordRight ) {
      moveWordLeft.removeChild(firstChildmoveWordLeft);
      moveWordRight.removeChild(firstChildmoveWordRight);
      firstChildmoveWordRight = moveWordRight.firstChild; 
      firstChildmoveWordLeft= moveWordLeft.firstChild; // Refrescar firstChild después de cada eliminación
    }
  }



  var wordRight : string =  this.writterChatRight.nativeElement.value.trim()

  
  if(wordRight != ''){
    
    this.chatSniff.nativeElement.style.transition = ' all 0.5s ';
  
    this.imgLock.nativeElement.style.transition = ' all 0.5s ';

  
    setTimeout(() => {

       
 

    this.chatSniff.nativeElement.style.transform = " scale(0.9)"
    this.chatSniff.nativeElement.style.opacity = "1"
    if(this.tamañoPantalla <= 799){
  

      this.chatIndividual.nativeElement.style.height = '86rem';
    this.chatSniff.nativeElement.style.transform = "translateX(0rem) translateY(36rem)"
  }else{
    this.chatSniff.nativeElement.style.transform = "translateX(40rem) "
    this.chatIndividual.nativeElement.style.width = '90rem';
  }
    this.imgLock.nativeElement.style.opacity = "1"
   

    this.chatMenssageMoveRight(wordRight)
    this.chatMessageRight(wordRight)
  this.chatMessageLeft(wordRight)
  this.chatMenssageMoveLeft(wordRight)

  this.messajeChatSniff(wordRight)
  this.writterChatRight!.nativeElement.value = "";

    }, 500);




  }else{


  }






}


chatMenssageMoveRight(word : string | null){
 

 
   const palabras = word!.split("/\s*,\s*|\s+/")// split word

   for (var i = 0; i < palabras.length; i++) {

    palabras[i].split(' ').forEach((letter) => {
      const spanRight = document.createElement('span');
      spanRight.textContent = letter ;
     
      spanRight.style.position = 'relative';
      spanRight.style.transition = 'all 6s ease-in-out';
      spanRight.style.fontSize ="1.1rem"
      spanRight.style.right = `-20rem`;
      spanRight.style.padding = '0.4rem'
   

      setTimeout(() => {
        spanRight.style.right= `60rem`; // move the word for have a efect of move
     
      }, 500 ); 
      this.moveWordRight!.nativeElement.appendChild(spanRight);
     

  });
  

}

}




chatMessageRight(word : string | null){

  var content = document.createElement('p');
  content.textContent = word;
  content.style.top = this.numRight + 'rem'; // Establecer la posición top
  content.classList.add("content");
  
  
  this.numRight += 3.5// Incrementar num en 1
  this.conversRight?.nativeElement.appendChild(content)
  const div2 = this.conversRight.nativeElement
  div2.scrollTop = div2.scrollHeight;
  console.log(div2.scrollHeight, div2.scrollTop )

 



}



chatMessageLeft(word : string | null){


var content = document.createElement('p');
content.textContent = word;
content.style.top = this.numLeft + 'rem'; // Establecer la posición top
content.classList.add("content2");
this.numLeft += 3.5// Incrementar num en 1


setTimeout(() => {
  
this.conversleft?.nativeElement.appendChild(content)

// this is for that scroll is always dowmn
const div = this.conversleft.nativeElement
div.scrollTop = div.scrollHeight;

}, 4500);


    
}


chatMenssageMoveLeft(word : string | null){
  
   const palabras = word!.split("/\s*,\s*|\s+/")// split word

   for (var i = 0; i < palabras.length; i++) {

    palabras[i].split(' ').forEach((letter) => {
      const spanRight = document.createElement('span');
      spanRight.textContent = letter ;
     
      spanRight.style.position = 'relative';
      spanRight.style.transition = 'all 6s ease-in-out';
      spanRight.style.fontSize ="1.1rem"
      spanRight.style.right = "-49rem";
      spanRight.style.padding = '0.4rem'
   

      setTimeout(() => {
        spanRight.style.right= `10rem`; // move the word for have a efect of move
     
      },1500 ); 
      this.moveWordLeft!.nativeElement.appendChild(spanRight);
     

  });
}
}


getImgUser(){

  return this.imagen;

}

getNameUser(){

  return this.userName;

}



messajeChatSniff(word : string){

  
  var message = document.createElement('span')
  message.textContent = word;
  message.style.fontSize =" 0.8rem"

console.log(word)

  message.classList.add("contentSniff")
  message.style.top =  "1rem"



setTimeout(() => {


  this.conversSniffer.nativeElement.appendChild(message)
}, 3500);

  

}




// Server

imagen : string  = '../../assets/image/userImg.png'
changeImg(event : any){
 
  const file = event.target.files[0];

  if(file){
    
    const reader = new FileReader()
    reader.readAsDataURL(file)
   reader.onload = (e : any ) => {
    
    this.imagen = e.target?.result
  

    
   };

}


}

 nameUser : string = ""
 nameServer : string = ""



 formHttp(){

 
  var medaDatesForm = {

    nameUser : this.nameUser,
    imageUser : this.imagen,
    nameServer : this.nameServer

  }

  this.chatService.setMetadatesUser(medaDatesForm)

  console.log(medaDatesForm)


 
 var  subscriptiom : Subscription = this.http.post<any>('http://localhost:8080/login', medaDatesForm).subscribe((datesResponse)=>{

  this.chatService.setObservableAccess(datesResponse.access)



  })
  

 }




}