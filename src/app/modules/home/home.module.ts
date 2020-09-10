import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { PostComponent } from './components/post/post.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [HomeComponent, HeaderComponent, PostComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class HomeModule { }
