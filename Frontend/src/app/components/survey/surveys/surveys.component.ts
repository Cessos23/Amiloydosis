import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray,FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Permission } from 'src/app/interfaces/user.interface';

import Swal from 'sweetalert2';
import { PatientService } from '../../patient/patient.service';
import { AnswerService } from '../answer.service';

import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveyComponent implements OnInit {
  displayedColumns: string[] = ['id','fullname' ,'questions','actions'];
  dataSource = [];
  dataSourceAnswer = [];
  isButtonVisible = true;
  isButtonVisible2= true;
  _id = '';
  formGroup!: FormGroup;

  constructor(private dialog: MatDialog , private  surveyService: SurveyService,private _snackBar: MatSnackBar,
    private answerService: AnswerService) {  }

  ngOnInit(): void {this.get(); this.getAnswer()}

  openAddModal(): void {
    const dialogRef = this.dialog.open(Modal, { height: '80%',width: '600px'});
    dialogRef.afterClosed().subscribe(result => {
      this.formGroup = result;
      this.add();
    });
  }

  get(){
    const user  =JSON.parse(localStorage.getItem('user')!);
    if(user.roles == 'Farmacia'){
      this.isButtonVisible = false;
      this.surveyService.getSurveys().subscribe((x: any) => {
        this.dataSource = x;
        x = x.map((x:any) => (x.fullname == user.name)?x:'');
        let uniqueChars = x.filter((element:any, index:any) => {
          return x.indexOf(element) === index;
          });
          const resultExam = uniqueChars.filter((str:any) => str != '');
          this.dataSource = resultExam;
          this.displayedColumns.forEach((element,index)=>{
            if(element=="questions") this.displayedColumns.splice(index,1);
         });
         this.isButtonVisible2 = true;
         
        
      })
    }else{
      this.isButtonVisible = true;
      this.isButtonVisible2 = true;
      this.surveyService.getSurveys().subscribe((x: any) => {
        this.dataSource = x;
      })
  }
  }
  getAnswer(){
    this.answerService.getAnswers().subscribe((x: any) => {
      this.dataSourceAnswer = x;
    })
  }

  openEditModal(id: string) {
    this.surveyService.getSurvey(id).subscribe((x) => {
      this._id = x._id;
      const dialogRef = this.dialog.open(Modal, {data: {doctor: x}, height: '80%',width: '600px'});
      dialogRef.afterClosed().subscribe(result => {
        this.formGroup = result;
        this.edit();
      });
    })
  }
  openShowModal(id: string) {
    this.surveyService.getSurvey(id).subscribe((x) => {
      this._id = x._id;
      const dialogRef = this.dialog.open(ModalShow, {data: {doctor: x}, height: '70%',width: '1000px'});
      dialogRef.afterClosed().subscribe(result => {
        this.formGroup = result;
        this.addAnswer();
      });
    })
  }
  addAnswer(){
    if(this.formGroup.valid){
      const data = this.formGroup.getRawValue(); 
      const user  =JSON.parse(localStorage.getItem('user')!);
      const datas = {
        id_survey: this._id,
        fullname: user.name,
        answers: data.answers
      }
      this.answerService.addAnswer(datas).subscribe((x)=> {
        Swal.fire({
          title: 'Success!',text:  "Se guardo correctamente la encuesta",icon: 'success',confirmButtonText: 'OK'
        })
        this.get();
        this.formGroup.reset()
        this.getAnswer();

      },(e) => {
        Swal.fire({title: 'Error!',text:  e.error ,icon: 'error',confirmButtonText: 'OK'})
      })
    }
  }
  openViewModal(id: string) {
    this.surveyService.getSurvey(id).subscribe((x) => {
      this._id = x._id;
      const dialogRef = this.dialog.open(ModalView, {data: {doctor: x}, height: '70%',width: '1000px'});
    })
  }

  add(){
    if(this.formGroup.valid){
      const data = this.formGroup.getRawValue(); 
      this.surveyService.addSurvey(data).subscribe((x)=> {
        Swal.fire({
          title: 'Success!',text:  "Se guardo correctamente la encuesta",icon: 'success',confirmButtonText: 'OK'
        })
        this.get();
        this.formGroup.reset()

      },(e) => {
        Swal.fire({title: 'Error!',text:  e.error ,icon: 'error',confirmButtonText: 'OK'})
      })
    }
  }

  edit(){
    if(this.formGroup.valid){
      const data = this.formGroup.getRawValue(); 
      this.surveyService.editSurvey(data,this._id).subscribe((x)=> {
        Swal.fire({
          title: 'Success!',text:  "Se actualizo correctamente la encuesta",icon: 'success',confirmButtonText: 'OK'
        })

        this._id = '';
        this.get();
      },(e) => {
        Swal.fire({title: 'Error!',text:  e.error ,icon: 'error',confirmButtonText: 'OK'
        })
      })
    }
  }

  delete(id: string){

    Swal.fire({
      title: 'Estas seguro de eliminar la encuesta?',
      showCancelButton: true,
      cancelButtonColor:'#1C92DE',
      confirmButtonColor:'#E22020',
      confirmButtonText: 'Eliminar',
      icon:'warning'
    }).then((result) => {
      if (result.isConfirmed) {

        this.surveyService.deleteSurvey(id).subscribe((x) => {
          if(x.deletedCount == 1){
            Swal.fire({
              title: 'Success!',
              text:  "Se elimino correctamente la encuesta",
              icon: 'success',
              confirmButtonText: 'OK'
            })

            this.get();
          }
        })
        
      } 
    })


    
  }

  arrayTo(array: []){
    return array.toString()
  }


}



@Component({
  selector: 'surveys-modal',
  templateUrl: 'surveys-modal.html',
})

export class Modal {
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  errorAddEdit= "";
  formGroup!: FormGroup;
  title = 'FormArray';
  permisos: Permission[] = [];
   items!: FormArray;
   qs: string[] = [];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<Modal>,@Inject(MAT_DIALOG_DATA) public data: any,
  private patienService: PatientService) {
    const x = data?data.doctor:null;
    
    this.formGroup = this.fb.group({
      id_paciente: [null,Validators.required],
      fullname: [null,Validators.required],
      questions: new FormArray([])
    });
    this.patienService.getPatients().subscribe((x: any) => {
      this.permisos = x.map((e:any) => ({text: e.name+' '+e.lastname,value: e._id} ));
      
    })
    if(x){
      this.qs = x.questions.map((m:any) => m.question)

      this.formGroup.patchValue({id_paciente: x.id_paciente,fullname: x.fullname})
      var tagsArray:any = [];
      this.qs.forEach(q => tagsArray.push(this.fb.group({question: [q, [Validators.required]]})));
        this.formGroup.setControl('questions', this.fb.array(tagsArray || []));
    }

  }

  selectChange(any:any){
    this.patienService.getPatient(any.value).subscribe((x:any) =>{
      const nombre = document.getElementById('fullname') as HTMLInputElement ;
      nombre.value = x.name + ' ' + x.lastname+'';
    })
  }
  Addnewrow() {
    this.items = this.formGroup.get("questions") as FormArray;
    this.items.push(this.Genrow())
  }
  Removeitem(index:any){
    this.items = this.formGroup.get("questions") as FormArray;
    this.items.removeAt(index)
  }

  get questions(){
    return this.formGroup.get("questions") as FormArray;
  }

  Genrow(): FormGroup {
    return new FormGroup({
     question:new FormControl('',Validators.required),
    });
  }
  
  onNoClick(): void {this.dialogRef.close();}
}





@Component({
  selector: 'surveys-show-modal',
  templateUrl: 'surveys-show-modal.html',
  styleUrls: ['./surveys.modal.component.scss']
})

export class ModalShow {
  errorAddEdit= "";
  formGroup!: FormGroup;
  permisos: Permission[] = [];
   items!: FormArray;
   question: string[] = [];
   arrayRadio = ['Sumamente Limitado', 'Bastante', 'Moderadamente','Sin limitaciones'];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<Modal>,@Inject(MAT_DIALOG_DATA) public data: any,
  private patienService: PatientService) {
    const x = data?data.doctor:null;
    
    this.formGroup = this.fb.group({
      answers: new FormArray([]),
    });
    this.patienService.getPatients().subscribe((x: any) => {
      this.permisos = x.map((e:any) => ({text: e.name+' '+e.lastname,value: e._id} ));
      
    })
    if(x){

      this.question = x.questions.map((m:any) => m.question);
    }

  }

  radioChange(any:any){
    const formArray: FormArray = this.formGroup.get('answers') as FormArray;
    formArray.push(new FormControl(any.value));
  }
  
  onNoClick(): void {this.dialogRef.close();}
}


@Component({
  selector: 'surveys-view-modal',
  templateUrl: 'surveys-view-modal.html',
})

export class ModalView {
  errorAddEdit= "";
  answer: any[] = [];
   qs: string[] = [];
   _id = "";
   dataSourceAnswer = [];
   is = [];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<Modal>,@Inject(MAT_DIALOG_DATA) public data: any,
  private patienService: PatientService,private answerService: AnswerService ) {
    const x = data?data.doctor:null;
    this.answerService.getAnswers().subscribe((x: any) => {
      x=x.map((x:any)=> (x.id_survey == this._id)?x.answers:'')
      const questionAnswers: any[] = [];
      let uniqueChars = x.filter((element:any, index:any) => {
        return x.indexOf(element) === index;
      });
      const resultAnswer = uniqueChars.filter((str:any) => str != '');

      resultAnswer[0].map((x:any,index:any) => {
            questionAnswers.push({
              question: this.qs[index],
              answer: x
            })
       })
       this.answer = questionAnswers;
          

    })
    if(x){
      this._id = x._id
      this.qs = x.questions.map((m:any) => m.question)
    }

  }
  
  onNoClick(): void {this.dialogRef.close();}
}