import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { BehaviorSubject, Observable ,Subject} from 'rxjs';
import {ChatMessage} from '../models/chat-message'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() {
    
   }

 private stomClient : any;
  private messageSubject : BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]> ([]);
  private loginAccess: Subject<boolean> = new Subject<boolean>();
private medaDates ={}



setObservableAccess(acces : boolean){

  this.loginAccess.next(acces);


}


getObservableAccess() : Observable<any> {

 return this.loginAccess.asObservable()


}


setMetadatesUser(dates : {}){

  this.medaDates = dates;


}

getMetadatesUser(){

  return this.medaDates


}


initConnectionSocjet(){

  const url = 'http://localhost:8080/chat-socket';
  const socket = new SockJS(url)
  this.stomClient = Stomp.over(socket);

}


joinRoom(roomId :string){

  this.stomClient.connect({}, () =>{

  this.stomClient.subscribe(`/topic/${roomId}`, (messages : any) =>{
    const messageContent  = JSON.parse(messages.body);
    
    const currentMessage = this.messageSubject.getValue()

    currentMessage.push(messageContent );

      this.messageSubject.next(currentMessage);
      

  })
})

}


sendMessage( roomId : string, chatMessage : ChatMessage){


  
  this.stomClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage))
  

}

getMessageSubget() : Observable<ChatMessage[]>{
  return this.messageSubject.asObservable()
}



}





