import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent,ModalViewRE } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

//angular material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'  
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
 

//extra
import { TextMaskModule } from 'angular2-text-mask';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  }
]


@NgModule({
  declarations: [
    ProfileComponent,
    ModalViewRE
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TextMaskModule,
    PdfViewerModule,
    
    //angular materials
    MatFormFieldModule, 
    MatInputModule ,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule ,
    MatButtonModule,
    FormsModule,
    MatOptionModule,
    ReactiveFormsModule,
    FeatherModule,
    MatListModule,
    MatDialogModule
  ]
})
export class ProfileModule { }
