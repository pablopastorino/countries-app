import { Component, Input } from '@angular/core';

import { Country } from '../types/country';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent {
  @Input() countries: Country[] = [];
  public displayedColumns: string[] = ['id', 'country', 'population', 'percentage'];
}
