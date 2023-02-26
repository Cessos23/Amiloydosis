import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {PatientService} from '../patient.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {

  addPatientForm!: FormGroup;
  public errorAddPatient = "";
  @Output() closeAddUserModal = new EventEmitter();
  status: string[] = [];
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private fb: FormBuilder,private  patientService: PatientService,private _snackBar: MatSnackBar){

    this.addPatientForm = this.fb.group({
      name: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      phone_number: ['',[Validators.required]],
      email: ['',[Validators.email,Validators.required]],
      status: ['',[Validators.required]],
      description_status: ['',[Validators.required]],
      birthday: ['',[Validators.required]],
      sex: ['',[Validators.required]],
      age: ['',[Validators.required]],
      allergies: ['',[Validators.required]],
      weight: [0],
      size: [0],
      temperature: [0],
      heart_rate: [0],
      breathing_frequency: [0],
      blood_pressure: [0],
      oxygen_saturation: [0],
    });
    this.status = this.patientService.getStatus();

  }

  ngOnInit(): void {}

  addPatient(){
    if(this.addPatientForm.valid){
      const data = this.addPatientForm.getRawValue(); 
      this.patientService.addPatient(data).subscribe((x)=> {
        this.errorAddPatient = '';
        Swal.fire({
          title: 'Success!',
          text:  "Se guardo correctamente el paciente",
          icon: 'success',
          confirmButtonText: 'OK'
        })

        this.addPatientForm.reset()
        this.closeAddModalF();
      },(e) => {
        this.errorAddPatient = e.error.error;
        Swal.fire({
          title: 'Error!',
          text:  this.errorAddPatient,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })
    }
  }

  closeAddModalF(){
    this.closeAddUserModal.emit('CLOSE_ADD_MODAL');
  }

  


}
