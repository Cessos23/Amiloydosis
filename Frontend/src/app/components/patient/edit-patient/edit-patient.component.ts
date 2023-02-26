import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Service } from 'src/app/interfaces/service.interface';
import Swal from 'sweetalert2';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {
  _id = "";
  editPatientForm!: FormGroup;
  public errorEditPatient = "";
  status: string[] = [];
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    
  constructor(private fb: FormBuilder,private  patientService: PatientService) {

    this.editPatientForm = this.fb.group({
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

  ngOnInit(): void {
    this.patientService.getPatient(this._id).subscribe((x) => {
      const dia = moment(x.birthday)
      this._id = x._id;
      const age = moment().diff( dia.format('yyyy-MM-DD'), 'years',false);
       this.editPatientForm.setValue({name: x.name,lastname: x.lastname, phone_number: x.phone_number,email: (x.email != null)?x.email:'',
       status: (x.status != null)?x.status:'',age: (x.age != null)?x.age:'',sex: (x.sex != null)?x.sex:'',description_status: (x.description_status != null)?x.description_status:'',allergies: x.allergies,weight: x.weight,size: x.size,temperature: x.temperature,birthday: dia.format('yyyy-MM-DD'),
        heart_rate: x.heart_rate,breathing_frequency: x.breathing_frequency, blood_pressure: x.blood_pressure,
        oxygen_saturation: x.oxygen_saturation})

    })

  }


  @Output() closeEditUserModal = new EventEmitter();


  editPatient(){
    if(this.editPatientForm.valid){
      const data = this.editPatientForm.getRawValue(); 

      this.patientService.editPatient(data,this._id).subscribe((x)=> {
        this.errorEditPatient = '';
        Swal.fire({
          title: 'Success!',
          text:  "Se actualizo correctamente el paciente",
          icon: 'success',
          confirmButtonText: 'OK'
        })

        this.editPatientForm.reset()
        this.closeEditModalF();
      },(e) => {
        this.errorEditPatient = e.error.error;
        Swal.fire({
          title: 'Error!',
          text:  this.errorEditPatient,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })
    }
  }



  closeEditModalF(){
    this.closeEditUserModal.emit('CLOSE_EDIT_MODAL');
  }

}
