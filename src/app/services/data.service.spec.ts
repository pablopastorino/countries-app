import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Country } from '../types/country';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return an Observable<Country[]>', () => {
    // Given
    const search = 'Uruguay';
    const mockResponse: Country[] = [
      { id: 1, country: 'Uruguay', population: 3_000_000, percentage: 0.15 },
      { id: 2, country: 'Paraguay', population: 6_000_000, percentage: 0.3 }
    ];

    // When
    service.getCountries(search).subscribe((countries) => {
      expect((countries as unknown as Country[]).length).toBe(2);
      expect(countries as unknown as Country[]).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:3000/countries?search=${search}&limit=5&offset=0`);

    // Then
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse, {status: 200, statusText: 'OK'});
  });
});
