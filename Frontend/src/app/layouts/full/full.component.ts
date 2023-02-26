import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {LoginService} from '../../components/login/login.service';
import { User } from 'src/app/interfaces/login.interface';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import {Router} from '@angular/router';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

  search: boolean = false;
  user : User = {id: "",name: "", email: "",avatar: "",roles: [],permissions: [] };
  navBar: string[] = [];
  sidebarMenu2: sidebarMenu[] = []
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private loginService: LoginService,
    private local: LocalStorageService, private router: Router) { 
    const u =  this.loginService.getUser();
    this.user = u;
    const user  =JSON.parse(localStorage.getItem('user')!);
    this.navBar = this.sidebarMenu.map((m:any) => m.link.replace('/', ''));
    this.navBar = this.navBar.filter((val => user.permissions.includes(val)));
    this.navBar.forEach((element,index)=>{
      this.sidebarMenu.find((x:any) =>(x.link == '/'+element)?this.sidebarMenu2.push(x):'');
    })
    

  }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/home",
      icon: "home",
      menu: "Principal",
    },
    // {
    //   link: "/sales",
    //   icon: "shopping-cart",
    //   menu: "Ventas",
    // },
    {
      link: "/appointments",
      icon: "calendar",
      menu: "Citas",
    },
    // {
    //   link: "/products",
    //   icon: "package",
    //   menu: "Productos",
    // },
    {
      link: "/services",
      icon: "file-plus",
      menu: "Análisis",
    },
    {
      link: "/schedule",
      icon: "clock",
      menu: "Horario",
    },
    {
      link: "/users",
      icon: "users",
      menu: "Usuarios",
    },
    {
      link: "/patients",
      icon: "frown",
      menu: "Pacientes",
    },
    {
      link: "/doctors",
      icon: "heart",
      menu: "Doctores",
    },
    {link: "#",icon: "book-open", menu: "Reportes", },
    {link: "#",icon: "briefcase", menu: "Contrato", },
    {
      link: "/medical-records",
      icon: "clipboard",
       menu: "Historial Clinico",
    },
    {
      link: "/clinical-reports",
      icon: "file-text",
       menu: "Informe clinico",
    },
    {link: "#",icon: "globe", menu: "Foro", },
    {
      link: "/surveys",
      icon: "clipboard",
       menu: "Encuenta",
    },
    {
      link: "/control-exams",
      icon: "clipboard",
       menu: "Exámenes de control",
    },
    {
      link: "/test-results",
      icon: "file-text",
       menu: "Resultados de exámenes",
    },
    {
      link: "/follow-up-patients",
      icon: "user-check",
       menu: "Seguimiento del paciente",
    },
    {
      link: "/notifications",
      icon: "bell",
       menu: "Notificaciones",
    },
    {
      link: "/contracts",
      icon: "file-text",
       menu: "Contrato",
    },
    {
      link: "/reports",
      icon: "search",
       menu: "Reportes",
    },
    {
      link: "/backups",
      icon: "refresh-cw",
       menu: "Respaldo y Restauración",
    },
    
    // {
    //   link: "/button",
    //   icon: "disc",
    //   menu: "Buttons",
    // },
    // {
    //   link: "/forms",
    //   icon: "layout",
    //   menu: "Forms",
    // },
    // {
    //   link: "/alerts",
    //   icon: "info",
    //   menu: "Alerts",
    // },
    // {
    //   link: "/grid-list",
    //   icon: "file-text",
    //   menu: "Grid List",
    // },
    // {
    //   link: "/menu",
    //   icon: "menu",
    //   menu: "Menus",
    // },
    // {
    //   link: "/table",
    //   icon: "grid",
    //   menu: "Tables",
    // },
    // {
    //   link: "/expansion",
    //   icon: "divide-circle",
    //   menu: "Expansion Panel",
    // },
    // {
    //   link: "/chips",
    //   icon: "award",
    //   menu: "Chips",
    // },
    // {
    //   link: "/tabs",
    //   icon: "list",
    //   menu: "Tabs",
    // },
    // {
    //   link: "/progress",
    //   icon: "bar-chart-2",
    //   menu: "Progress Bar",
    // },
    // {
    //   link: "/toolbar",
    //   icon: "voicemail",
    //   menu: "Toolbar",
    // },
    // {
    //   link: "/progress-snipper",
    //   icon: "loader",
    //   menu: "Progress Snipper",
    // },
    // {
    //   link: "/tooltip",
    //   icon: "bell",
    //   menu: "Tooltip",
    // },
    // {
    //   link: "/snackbar",
    //   icon: "slack",
    //   menu: "Snackbar",
    // },
    // {
    //   link: "/slider",
    //   icon: "sliders",
    //   menu: "Slider",
    // },
    // {
    //   link: "/slide-toggle",
    //   icon: "layers",
    //   menu: "Slide Toggle",
    // },
  ]

  logout(){
    this.local.remove('token');
    this.local.remove('user');
    this.router.navigate(['login']);
  }

  perfil(){
    
    this.router.navigate(['/profile']);
  }
}
