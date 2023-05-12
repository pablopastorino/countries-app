import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CountriesComponent } from './countries.component';
import { DataService } from '../services/data.service';
import { MaterialModule } from '../material/material.module';
import { Country } from '../types/country';

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let service: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientModule, MatFormFieldModule, MaterialModule, NoopAnimationsModule, ReactiveFormsModule],
      declarations: [CountriesComponent],
      providers: [DataService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountriesComponent);
    service = TestBed.inject(DataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  })

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should reset form', () => {
    // Given
    component.searchForm.setValue({ searchInput: 'test' });

    // When
    component.onReset();

    // Then
    expect(component.searchForm.value.searchInput).toBeNull();

    expect(component.searchForm.pristine).toBeTrue();

    expect(component.searchForm.untouched).toBeTrue();
  });

  it('Should call searchCountries method', () => {
    // Given
    spyOn(component, 'searchCountries');

    // When
    component.onSubmit();

    // Then
    expect(component.searchCountries).toHaveBeenCalled();
  });


  it('Should retrieve countries', () => {
    // Given
    const countries: Country[] = [{ id: 1, country: 'Argentina', population: 45_000_000, percentage: 0.6 }, { id: 2, country: 'Brazil', population: 200_000_000, percentage: 2.1 }];

    spyOn(service, 'getCountries').and.returnValue(of(countries as any));
 
    // When
    component.searchForm.setValue({ searchInput: 'test' });
    component.searchCountries();

    // Then
    expect(component.countries).toEqual(countries);
  });
});


