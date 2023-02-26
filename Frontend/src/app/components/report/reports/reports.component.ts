import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

import Swal from 'sweetalert2';
import { ClinicalReportService } from '../../clinical-report/clinical-report.service';
import { MedicalHistoryService } from '../../medical-history/medical-history.service';
import { AnswerService } from '../../survey/answer.service';
import { SurveyService } from '../../survey/survey.service';

import { ReportService } from '../report.service';
export  interface Patient {
  name: string,
  lastname: string,
  birthday: Date,
  status: string,
  sex: string,
  age: number,
  analysis: string,
  answerSurvey:String,
  medicalRecords: string,
  reason_medical: string,
  recommendations: string
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportComponent implements OnInit {
  displayedColumns: string[] = ['id','name' ,'answerSurvey','sex','medicalRecords','analysis','recommendations','status'];
  dataSources = [];
  patient = [];
  _id = '';
  formGroup!: FormGroup;
  dataSource: any;
  empdata: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  

  constructor(private dialog: MatDialog , private  reportService: ReportService,private _snackBar: MatSnackBar
    ,private medicalRecordService: MedicalHistoryService,private clinicalReportService: ClinicalReportService,
    private surveySerive: SurveyService,private answerService: AnswerService) {  }
  
  ngOnInit(): void {this.get(); }

  applyFilter(event: any) {

    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;

  }
  get(){
    this.reportService.getPatients().subscribe((x: any) => {
      this.patient = x.map((p:any) => p.name + ' ' +p.lastname)
      this.medicalRecordService.getMedicalRecords().subscribe((m:any) =>{
        var name = "";
        var current_discomforts =""
        m.map((h:any) =>{
          name = h.id_paciente, current_discomforts = h.current_discomforts})
        x.find((r:any) =>{
          (r._id ==name)?Object.assign(r, {medicalRecords: current_discomforts})
        :
        Object.assign(r, {medicalRecords: ""});
        this.empdata = r;
        })
      });
      this.clinicalReportService.getClinicalReports().subscribe((c:any) =>{
        var analysis = "";
        var recommendations ="";
        var reason_medical= "";
        var _id ="";
        c.map((p:any) =>{
          _id = p.id_paciente
          analysis = p.analysis,
          recommendations = p.recommendations,
          reason_medical = p.reason_medical
        })
        x.find((r:any) =>{
          (r._id ==_id)?Object.assign(r, {analysis: analysis,recommendations: recommendations,reason_medical: reason_medical})
        :
        Object.assign(r, {analysis: "",recommendations: "",reason_medical: ""});
        this.empdata = r;
        })
      })
      this.surveySerive.getSurveys().subscribe((s:any) =>{
        var fullname = "";
        var _id ="";
        var id_patient ="";
        s.map((a:any) => {
          fullname =a.fullname,
          _id = a._id,
          id_patient = a.id_paciente
        })
        this.answerService.getAnswers().subscribe((as:any) =>{
          var fullname_patient = "";
          var id_survey =""
          as.map((rt:any) =>{
            id_survey= rt.id_survey,
            fullname_patient = rt.fullname
          })
          
          x.find((r:any) =>{
            (r._id ==id_patient && _id == id_survey &&
            fullname ==  fullname_patient)?Object.assign(r, {answerSurvey: "Si"})
          :
          Object.assign(r, {answerSurvey: "No"});
          this.empdata = r;
          })
        })
      })
      this.empdata = x;

      this.dataSource = new MatTableDataSource<Patient>(this.empdata);
      this.dataSource.paginator = this.paginator;
      
    })
  }
  arrayTo(array: []){
    return array.toString()
  }


}
