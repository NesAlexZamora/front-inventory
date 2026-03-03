import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material-module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Confirm } from './components/confirm/confirm';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    Confirm
  ]
})
export class SharedModule { }
