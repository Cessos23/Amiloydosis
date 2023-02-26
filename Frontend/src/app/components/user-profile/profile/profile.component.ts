import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit,inject, Output, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {LoginService} from '../../../components/login/login.service'
import { User } from 'src/app/interfaces/login.interface';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as moment from 'moment';

import Swal from 'sweetalert2';

import { UserProfileService } from '../user-profile.service';
import { TestResultService } from '../../test-result/test-result.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  @ViewChild('imgAvatar') imgAvatar! : ElementRef<HTMLImageElement>;
  randomAvatar = Math.random();
  urlAvatar = "https://avatars.dicebear.com/api/adventurer/"+this.randomAvatar+".svg";
  displayedColumns: string[] = ['id','name' ,'birthday','phone_number','personal_number','speciality','actions'];
  _id = '';
  avatar = '';
  name = '';
  email = '';
  public errorEditUser = "";
  formGroup!: FormGroup;
  dataSource: UserInterface[] = [];
  isButtonVisible = true;
  

  constructor(private dialog: MatDialog ,private fb: FormBuilder, private  userProfileService: UserProfileService,
     private loginService: LoginService, private local: LocalStorageService,private _snackBar: MatSnackBar,
     private testResultService: TestResultService) { 
      const user  =JSON.parse(localStorage.getItem('user')!);
      this.formGroup = this.fb.group({
        address: ['',[Validators.required]],
        email: [user.email,Validators.email],
        phone_number: ['',Validators.required],
        occupation: ['',Validators.required],
        marital_status: ['',Validators.required],
      });

      }
    
      openViewModal(id: string) {
        const user  =JSON.parse(localStorage.getItem('user')!);
        this.testResultService.getTestResults().subscribe((x:any) =>{
          x= x.map((x:any) => (x.fullname == user.name)?x.namefile:'')
             let uniqueChars = x.filter((element:any, index:any) => {
              return x.indexOf(element) === index;
              });
              const resultExam = uniqueChars.filter((str:any) => str != '');
              const link ='http://localhost:3001/'+resultExam.toString()
              const dialogRef = this.dialog.open(ModalViewRE, {data: {doctor: link}, height: '70%',width: '700px'});
            
        })
      }
  ngOnInit(): void {
    const user  =JSON.parse(localStorage.getItem('user')!);
    this.name = user.name;
    this.avatar = user.avatar
    this.email = user.email
    this.getuser();
    this.testResultService.getTestResults().subscribe((x:any) =>{
      x= x.map((x:any) => (x.fullname == user.name)?x.namefile:'')
      let uniqueChars = x.filter((element:any, index:any) => {
        return x.indexOf(element) === index;
        });
        const resultExam = uniqueChars.filter((str:any) => str != '');
      if(resultExam != ''){
        this.isButtonVisible = true;
      }else{
        this.isButtonVisible = false;
      }
    })
    
   }
   addUser(){
    if(this.formGroup.valid){
      const user  =JSON.parse(localStorage.getItem('user')!);
      const data = this.formGroup.getRawValue(); 
      this.userProfileService.editUser(data,user.id).subscribe((x:any)=>{
        this.errorEditUser = '';
        Swal.fire({
          title: 'Success!',
          text:  "Se actualizo correctamente el usuario",
          icon: 'success',
          confirmButtonText: 'OK'
        })

        this.getuser();
      })
    }
  }

   getuser(){
    const user  =JSON.parse(localStorage.getItem('user')!);
    this.userProfileService.getUser(user.id).subscribe((x:any) =>{
      this.dataSource = x
      this.formGroup.setValue({address: x.address,email: x.email, phone_number: x.phone_number,
        occupation: x.occupation, marital_status: x.marital_status})
    })
   }
   
}


@Component({
  selector: 'profile-viewRE-modal',
  templateUrl: 'profile-viewRE-modal.html',
})

export class ModalViewRE {
  errorAddEdit= "";
  answer: any[] = [];
   qs: string[] = [];
   _id = "";
   dataSourceAnswer = [];
   is = [];
   pdfSrc = "";

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ModalViewRE>,@Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    const x = data?data.doctor:null;
    this.pdfSrc = x;
    
    
    
    

  }
  
  onNoClick(): void {this.dialogRef.close();}
}