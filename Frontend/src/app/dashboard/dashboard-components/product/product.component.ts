import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  id: number;
  name: string;
  work: string;
  project: string;
  priority: string;
  badge: string;
  budget: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Dr. Daniel Rivera', work: 'Cardiología', project: 'Hematología', priority: 'Low', badge: 'badge-info', budget: '$1000' },
  { id: 2, name: 'Dra. Sandra Flores', work: 'Cardiología', project: 'Cardiopatía', priority: 'Medium', badge: 'badge-primary', budget: '$2500' },
  { id: 3, name: 'Dr. Alonso Portillo', work: 'Cardiología', project: 'Nefrología', priority: 'High', badge: 'badge-danger', budget: '$1000' },
  { id: 4, name: 'Dra. Cecilia López', work: 'Cardiología', project: 'Medicina Cardiovascular', priority: 'Critical', badge: 'badge-success', budget: '$1000' },
];


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['id', 'assigned', 'name', 'priority', 'budget'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
