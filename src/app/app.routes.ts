import { Routes } from '@angular/router';
import{ PagLoginComponent} from '../app/pag-login/pag-login.component'
import{ PagChatComponent} from '../app/pag-chat/pag-chat.component'


export const routes: Routes = [

{path: 'home' , component: PagLoginComponent},

{path: 'chat/:userId' , component: PagChatComponent},

];
