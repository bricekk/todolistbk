import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddtaskPageRoutingModule } from './addtask-routing.module';

import { AddtaskPage } from './addtask.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddtaskPageRoutingModule
  ],
  declarations: [AddtaskPage]
})
export class AddtaskPageModule {}
