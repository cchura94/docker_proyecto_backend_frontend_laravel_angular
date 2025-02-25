import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TextareaModule } from 'primeng/textarea'
import { InputNumberModule } from 'primeng/inputnumber'
import { RadioButtonModule } from 'primeng/radiobutton'
import { ImageModule } from 'primeng/image';
import {ProgressBarModule} from 'primeng/progressbar'

const componentes = [
  TableModule,
  ButtonModule,
  DialogModule,
  InputTextModule,
  ChipModule,
  ToolbarModule,
  IconFieldModule,
  InputIconModule,
  TextareaModule,
  InputNumberModule,
  RadioButtonModule,
  ImageModule,
  ProgressBarModule

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...componentes
  ],
  exports: [
    ...componentes
  ]
})
export class PrimeNgModuleModule { }
