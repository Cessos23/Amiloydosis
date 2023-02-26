import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { SignaturePad } from 'angular2-signaturepad';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Swal from 'sweetalert2';

import { ContractService } from '../contracts.service';
import { PatientService } from '../../patient/patient.service';
import { Permission } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractComponent implements OnInit {

  displayedColumns: string[] = ['id','title','doctor_name','fullname_patient','hospital_name','actions'];
  dataSource = [];
  _id = '';
  formGroup!: FormGroup;
  

  constructor(private dialog: MatDialog , private  contractService: ContractService,private _snackBar: MatSnackBar) {  }

  ngOnInit(): void {this.get(); }

  openAddModal(): void {
    const dialogRef = this.dialog.open(Modal, { height: '80%',width: '800px'});
    dialogRef.afterClosed().subscribe(result => {
      this.formGroup = result;
      this.add();
    });
  }

  get(){
    this.contractService.getContracts().subscribe((x: any) => {
      this.dataSource = x;
    })
  }

  openEditModal(id: string) {
    this.contractService.getContract(id).subscribe((x) => {
      this._id = x._id;
    const title = x.title;
    const protocol_number = 'Número de protocolo: 0000'+x.protocol_number;
    const doctor_name = x.doctor_name;
    const hospital_name = x.hospital_name;
    const description_protocol = x.description_protocol;
    const clauses = x.clauses;
    const fullname_patient = x.fullname_patient;
    const signature_patient = x.signature_patient;
    const fullname_witnessone = x.fullname_witnessone;
    const signature_witnessone = x.signature_witnessone;
    const fullname_witnesstwo = x.fullname_witnesstwo;
    const signature_witnesstwo = x.signature_witnesstwo;
    const date_start = x.date_start;
    const date_end = x.date_end;

    const dateStart = moment(date_start).locale('es-mx').add(1,'days').format('LL');
    const dateEnd = moment(date_end).locale('es-mx').add(1,'days').format('LL');
    

    var doc = new jsPDF()
    doc.setFont('helvetica')
    const splitTitle = doc.splitTextToSize(clauses, 220);
    const splitTitlePatient = doc.splitTextToSize(fullname_patient,220);
    const splitTitleWitnessone= doc.splitTextToSize(fullname_witnessone,220);
    const splitTitleWitnesstwo= doc.splitTextToSize(fullname_witnesstwo,220);
    if(title.length <21){
        doc.setFontSize(20)
        doc.text(title,75, 15)
      }
      doc.setFontSize(10)
      doc.text(protocol_number,150,25);
      doc.setFontSize(11)
      doc.text('Atendio, por '+doctor_name+' el investigador médico del estudio.',13,45);

      doc.setFontSize(11)
      doc.text('Este contrato tiene vigencia '+dateStart+' al '+dateEnd+'',13,55);

      doc.setFontSize(11)
      doc.text('Centro de investigación: '+hospital_name+'',13,65);
      doc.setFontSize(11)
      doc.text(description_protocol,13,75);

      doc.setFontSize(11)
      doc.text(clauses,13,85,splitTitle);

      doc.addImage(signature_patient, 'JPEG', 65, 192, 80, 60);
      doc.setFontSize(11)
      doc.text(fullname_patient,85,225,splitTitlePatient);
      doc.text('Paciente',97,230,splitTitlePatient);

      doc.addImage(signature_witnessone, 'JPEG', 0, 234, 70, 60);
      doc.setFontSize(11)
      doc.text(fullname_witnessone,17,265,splitTitleWitnessone);
      doc.text('Testigo 1',22,270,splitTitleWitnessone);


      doc.addImage(signature_witnesstwo, 'JPEG', 145, 234, 70, 60);
      doc.setFontSize(11)
      doc.text(fullname_witnesstwo,160,265,splitTitleWitnesstwo);
      doc.text('Testigo 2',165,270,splitTitleWitnesstwo);
      doc.save('Contrato_Paciente_'+fullname_patient+'.pdf')

 
    })
  }

  add(){
    this.get();
  }

  edit(){
    if(this.formGroup.valid){
      const data = this.formGroup.getRawValue(); 
      this.contractService.editContract(data,this._id).subscribe((x)=> {
        Swal.fire({
          title: 'Success!',text:  "Se actualizo correctamente",icon: 'success',confirmButtonText: 'OK'
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
      title: 'Estas seguro de eliminar el contrato?',
      showCancelButton: true,
      cancelButtonColor:'#1C92DE',
      confirmButtonColor:'#E22020',
      confirmButtonText: 'Eliminar',
      icon:'warning'
    }).then((result) => {
      if (result.isConfirmed) {

        this.contractService.deleteContract(id).subscribe((x) => {
          if(x.deletedCount == 1){
            Swal.fire({
              title: 'Success!',
              text:  "Se elimino correctamente el contrato",
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
  selector: 'contracts-modal',
  templateUrl: 'contracts-modal.html',
})

export class Modal {
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  errorAddEdit= "";
  formGroup!: FormGroup;
  title = 'Angular signature example';
  signatureImgPatient!: string;
  signatureImgWitnessOne!: string;
  signatureImgWitnessTwo!: string;
  dataSource = [];
  patientName = "";
  @ViewChild(SignaturePad)
  
  signaturePadPatient!: SignaturePad;
  @ViewChild('witnessone')
  signaturePadPadWitnessOne!: SignaturePad;
  @ViewChild('witnesstwo')
  signaturePadPadWitnessTwo!: SignaturePad;
  permisos: Permission[] = [];
  

  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 300,
    'canvasHeight': 300,
    'border': '1px solid black'
  };

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<Modal>,@Inject(MAT_DIALOG_DATA) public data: any,
  private patientService: PatientService,private contractService: ContractService) {
    const x = data?data.doctor:null;

    this.formGroup = this.fb.group({
      title: ['',[Validators.required]],
      protocol_number: ['',[Validators.required]],
      doctor_name: ['',[Validators.required]],
      hospital_name: ['',[Validators.required]],
      description_protocol: ['',[Validators.required]],
      clauses: ['',[Validators.required]],
      date_start: ['',[Validators.required]],
      date_end: ['',[Validators.required]],
      fullname_patient: ['',[Validators.required]],
      fullname_witnessone: ['',[Validators.required]],
      fullname_witnesstwo: ['',[Validators.required]],
    });
    this.patientService.getPatients().subscribe((x: any) => {
      this.permisos = x.map((e:any) => ({text: e.name+' '+e.lastname,value: e._id} ));
      
    })

    if(x){
      const dia = moment(x.birthday)
      const formatedDate = moment(x.birthday, moment.ISO_8601).format("DD/MM/YYYY");

      this.formGroup.setValue({title: x.title,protocol_number: x.protocol_number, doctor_name: x.doctor_name,
        hospital_name: x.hospital_name,description_protocol: x.description_protocol,clauses: x.clauses,
        date_start: x.date_start,date_end: x.date_end,fullname_patient: x.fullname_patient,
         signature_patient: x.signature_patient,fullname_witnessone: x.fullname_witnessone,
         signature_witnessone: x.signature_witnessone,fullname_witnesstwo: x.fullname_witnesstwo,
         })
    }

  }

  add(){
    if(this.formGroup.valid){
      const data = this.formGroup.getRawValue(); 
      const datas = {
        title: data.title,
        protocol_number: data.protocol_number,
        doctor_name: data.doctor_name,
        hospital_name: data.hospital_name,
        description_protocol: data.description_protocol,
        clauses: data.clauses,
        fullname_patient: this.patientName,
        signature_patient: this.signatureImgPatient,
        fullname_witnessone: data.fullname_witnessone,
        signature_witnessone: this.signatureImgWitnessOne,
        fullname_witnesstwo: data.fullname_witnesstwo,
        signature_witnesstwo: this.signatureImgWitnessTwo,
        date_start: data.date_start,
        date_end: data.date_end

      }
      
         this.contractService.addContract(datas).subscribe((x)=> {
        Swal.fire({
          title: 'Success!',text:  "Se guardo correctamente el contrato",icon: 'success',confirmButtonText: 'OK'
        })
        
        this.formGroup.reset()
        this.dialogRef.close(Modal)
        this.get();


      },(e) => {
        Swal.fire({title: 'Error!',text:  e.error ,icon: 'error',confirmButtonText: 'OK'})
      })
    }
  }

  get(){
    this.contractService.getContracts().subscribe((x: any) => {
      this.dataSource = x;
    })
  }
  selectChange(any:any){
    this.patientService.getPatient(any.value).subscribe((x:any) =>{
      if(x.status == "Aceptado"){
        
        this.patientName = x.name + ' ' + x.lastname+'';
      }else{
        Swal.fire({title: 'Error!',text:  'El paciente no ha sido aceptado' ,icon: 'error',confirmButtonText: 'OK'})
        this.formGroup.controls['fullname_patient'].reset();
      }
    })
  }
  ngAfterViewInit() {
    this.signaturePadPatient.set('minWidth', 2); 
    this.signaturePadPatient.clear(); 
  }


  drawStart() {
  }

  clearSignaturePatient() {
    this.signaturePadPatient.clear();
  }

  savePadPatient() {
    const base64Data = this.signaturePadPatient.toDataURL();
    this.signatureImgPatient = base64Data;
  }

  clearSignatureWitnessOne() {
    this.signaturePadPadWitnessOne.clear();
  }

  savePadWitnessOne() {
    const base64Data = this.signaturePadPadWitnessOne.toDataURL();
    this.signatureImgWitnessOne = base64Data;
  }
  clearSignatureWitnessTwo() {
    this.signaturePadPadWitnessTwo.clear();
  }

  savePadWitnessTwo() {
    const base64Data = this.signaturePadPadWitnessTwo.toDataURL();
    this.signatureImgWitnessTwo = base64Data;
  }
  
  onNoClick(): void {this.dialogRef.close();}
}

