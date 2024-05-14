import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponentModule} from '../module-app/component-module.component'
import { RouterModule, Routes } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule  } from '@angular/forms';






@NgModule({
  declarations: [
    AppComponentModule
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    FormsModule
    
   
  ],
  exports:[
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    FormsModule
   
  ]
})
export class ModuleAppModule { }
