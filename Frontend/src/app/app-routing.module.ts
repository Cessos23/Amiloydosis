import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';

//guards

import {LoginGuard} from './guards/login.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
 
  {
    path:"login",
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
  },
  {
    path:"",
    component:FullComponent,
    canActivate: [ LoginGuard],
    children: [
      {path:"", redirectTo:"/home", pathMatch:"full"},
      {path:"home", component:DashboardComponent},
      {
        path:"services",
        loadChildren: () => import('./components/service/service.module').then((m) => m.ServiceModule),
        canActivate: [RoleGuard]
      },
      {
        path:"schedule",
        loadChildren: () => import('./components/schedule/schedule.module').then((m) => m.ScheduleModule),
        canActivate: [RoleGuard]
      },
      {
        path:"appointments",
        loadChildren: () => import('./components/appointment/appointment.module').then((m) => m.AppointmentModule),
        canActivate: [RoleGuard]
      },
      {
        path:"users",
        loadChildren: () => import('./components/user/user.module').then((m) => m.UserModule),
        canActivate: [RoleGuard]
      },
      {
        path:"sales",
        loadChildren: () => import('./components/sale/sale.module').then((m) => m.SaleModule),
        canActivate: [RoleGuard]
      },
      {
        path:"products",
        loadChildren: () => import('./components/product/product.module').then((m) => m.ProductModule),
        canActivate: [RoleGuard]
      },
      {
        path:"patients",
        loadChildren: () => import('./components/patient/patient.module').then((m) => m.PatientModule),
        canActivate: [RoleGuard]
      },
      {
        path:"doctors",
        loadChildren: () => import('./components/doctor/doctor.module').then((m) => m.DoctorModule),
        canActivate: [RoleGuard]
      },
      {
        path:"medical-records",
        loadChildren: () => import('./components/medical-history/medical-history.module').then((m) => m.MedicalHistoryModule),
        canActivate: [RoleGuard]
      },
      {
        path:"profile",
        loadChildren: () => import('./components/user-profile/user-profile.module').then((m) => m.ProfileModule),
        canActivate: [RoleGuard]
      },
      {
        path:"control-exams",
        loadChildren: () => import('./components/control-exam/control-exam.module').then((m) => m.ControlExamModule),
        canActivate: [RoleGuard]
      },
      {
        path:"test-results",
        loadChildren: () => import('./components/test-result/test-result.module').then((m) => m.TestResultModule),
        canActivate: [RoleGuard]
      },
      {
        path:"surveys",
        loadChildren: () => import('./components/survey/survey.module').then((m) => m.SurveyModule),
        canActivate: [RoleGuard]
      },
      {
        path:"clinical-reports",
        loadChildren: () => import('./components/clinical-report/clinical-report.module').then((m) => m.ClinicalReportModule),
        canActivate: [RoleGuard]
      },
      {
        path:"follow-up-patients",
        loadChildren: () => import('./components/follow-up-patient/follow-up-patient.module').then((m) => m.FollowUpPatientModule),
        canActivate: [RoleGuard]
      },
      {
        path:"notifications",
        loadChildren: () => import('./components/notification/notification.module').then((m) => m.NotificationModule),
        canActivate: [RoleGuard]
      },
      {
        path:"contracts",
        loadChildren: () => import('./components/contract/contracts.module').then((m) => m.ContractModule),
        canActivate: [RoleGuard]
      },
      {
        path:"reports",
        loadChildren: () => import('./components/report/report.module').then((m) => m.ReportModule),
        canActivate: [RoleGuard]
      },
      {
        path:"backups",
        loadChildren: () => import('./components/backup/backup.module').then((m) => m.BackupModule),
        canActivate: [RoleGuard]
      },
      {path:"alerts", component:AlertsComponent},
      {path:"forms", component:FormsComponent},
      {path:"table", component:ProductComponent},
      {path:"grid-list", component:GridListComponent},
      {path:"menu", component:MenuComponent},
      {path:"tabs", component:TabsComponent},
      {path:"expansion", component:ExpansionComponent},
      {path:"chips", component:ChipsComponent},
      {path:"progress", component:ProgressComponent},
      {path:"toolbar", component:ToolbarComponent},
      {path:"progress-snipper", component:ProgressSnipperComponent},
      {path:"snackbar", component:SnackbarComponent},
      {path:"slider", component:SliderComponent},
      {path:"slide-toggle", component:SlideToggleComponent},
      {path:"tooltip", component:TooltipsComponent},
      {path:"button", component:ButtonsComponent},
    ]
    
  },
  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"**", redirectTo:"/home", pathMatch:"full"},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(){
  }
}
