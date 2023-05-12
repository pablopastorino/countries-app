import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Country } from '../types/country';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CountriesComponent {
  countries: Array<Country> = [];
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private countryService: DataService) {
    this.searchForm = this.fb.group({
      searchInput: [''] // without validations to test the api
    });
  }

  onReset() {
    this.searchForm.reset();
  }

  onSubmit() {
    this.searchCountries();
  }

  searchCountries() {
    const { searchInput } = this.searchForm.value;
    this.countryService.getCountries(searchInput).subscribe((response) => {
      this.countries = response as unknown as Country[];
    });
  }
}

