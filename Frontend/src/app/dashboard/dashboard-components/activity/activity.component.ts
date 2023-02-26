import { Component, OnInit } from '@angular/core';

interface activity {
  time: string;
  ringColor: string;
  message: string;
}

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
})
export class ActivityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  activity: activity [] = [
    {
      time: "09.50",
      ringColor: "ring-success",
      message: "Cita próxima",
    },
    {
      time: "10.46",
      ringColor: "ring-primary",
      message: "Recoger análisis",
    },
    {
      time: "02.47",
      ringColor: "ring-info",
      message: "Leer contrato",
    },
    {
      time: "04.48",
      ringColor: "ring-warning",
      message: "Verificar historial",
    },
    {
      time: "06.49",
      ringColor: "ring-danger",
      message: "Subir historial",
    },
  ]
  
}
