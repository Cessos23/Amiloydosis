import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {AddPatientComponent} from '../add-patient/add-patient.component'
import {EditPatientComponent} from '../edit-patient/edit-patient.component'

import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  displayedColumns: string[] = ['id','name' ,'birthday','allergies','weight','actions'];
  dataSource = [];
  

  constructor(private dialog: MatDialog , private  patientService: PatientService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(){
    this.patientService.getPatients().subscribe((x: any) => {
      this.dataSource = x;
    })
  }

  openAddServiceModal() {
    
    const dialogRef =  this.dialog.open(AddPatientComponent,{
      height: '80%',
      width: '600px',
    });

    dialogRef.componentInstance.closeAddUserModal.subscribe((z) => {
      if(z === 'CLOSE_ADD_MODAL'){
        dialogRef.close();
        this.getPatients();
      }
    })

  }
  
  
  editPatient(id: string){
    const dialogRefEdit =  this.dialog.open(EditPatientComponent,{
      height: '80%',
      width: '600px',
    });

    dialogRefEdit.componentInstance._id = id;

    dialogRefEdit.componentInstance.closeEditUserModal.subscribe((z) => {
      if(z === 'CLOSE_EDIT_MODAL'){
        dialogRefEdit.close();
        this.getPatients();
      }
    })

  }

  deletePatient(id: string){

    Swal.fire({
      title: 'Estas seguro de eliminar el paciente?',
      showCancelButton: true,
      cancelButtonColor:'#1C92DE',
      confirmButtonColor:'#E22020',
      confirmButtonText: 'Eliminar',
      icon:'warning'
    }).then((result) => {
      if (result.isConfirmed) {

        this.patientService.deletePatient(id).subscribe((x) => {
          if(x.deletedCount == 1){
            Swal.fire({
              title: 'Success!',
              text:  "Se elimino correctamente el usuario",
              icon: 'success',
              confirmButtonText: 'OK'
            })

            this.getPatients();
          }
        })
        
      } 
    })


    
  }

  arrayTo(array: []){
    return array.toString()
  }


}

