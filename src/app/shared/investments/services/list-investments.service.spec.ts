import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { ListInvestmentsService } from './list-investments.service';
import { HttpClient } from '@angular/common/http';
import { MOCK_LIST } from './list-investments.mock';

describe('ListInvestmentsService', () => {
  let service: ListInvestmentsService;
  let httpTestingController: HttpTestingController
  let httpClient: HttpClient

  const URL: string = 'https://raw.githubusercontent.com/troquatte/fake-server/main/investiments-all.json'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ListInvestmentsService);
    httpTestingController = TestBed.inject(HttpTestingController)
    httpClient = TestBed.inject(HttpClient)
  });

  afterEach(() => {
    httpTestingController.verify
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`(U) should list all investments from mock`, (done) => {
    service.list().subscribe(
      res => {
        expect(res[0].name).toEqual('Itaú')
        expect(res[0].value).toEqual(100)

        expect(res[res.length - 1].name).toEqual('Nubank')
        expect(res[res.length - 1].value).toEqual(100)
        done()
      }
    )

    const req = httpTestingController.expectOne(URL)
    req.flush(MOCK_LIST)
    expect(req.request.method).toEqual('GET')
  })
});
