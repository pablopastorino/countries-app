import { TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';
import { MaterialModule } from './material/material.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CountriesComponent
      ],
      providers: [HttpClient, HttpHandler],
      imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule]
    }).compileComponents();
  });

  it('Should create the app', () => {
    // Given
    const fixture = TestBed.createComponent(AppComponent);

    // When
    const app = fixture.componentInstance;

    // Then
    expect(app).toBeTruthy();
  });

  it(`Should have as title 'app'`, () => {
    // Given
    const fixture = TestBed.createComponent(AppComponent);

    // When
    const app = fixture.componentInstance;

    // Then
    expect(app.title).toEqual('app');
  });

  it('Should render title', () => {
    // Given
    const appTitle = 'Countries';
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Then
    expect(compiled.querySelector('h1')?.textContent).toContain(appTitle);
  });
});
