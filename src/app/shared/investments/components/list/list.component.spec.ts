import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { ListComponent } from './list.component';
import { MOCK_LIST } from '../../services/list-investments.mock';
import { ListInvestmentsService } from '../../services/list-investments.service';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: ListInvestmentsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ListComponent);
    service = TestBed.inject(ListInvestmentsService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`(U) should list investments`, () => {
    spyOn(service, 'list').and.returnValue(of(MOCK_LIST))
    component.ngOnInit()
    fixture.detectChanges()

    expect(service.list).toHaveBeenCalledWith()

    expect(component.investments.length).toEqual(4)
    expect(component.investments[0].name).toEqual('Itaú')
    expect(component.investments[component.investments.length - 1].name).toEqual('Nubank')
    
    // let investments = component.investments
    // expect(investments.length).toBe(3)
    // expect(investments[0].name).toContain('Nubank')
    // expect(investments[investments.length - 1].name).toContain('C6')
  })

  it(`(I) should list investments`, () => {
    spyOn(service, 'list').and.returnValue(of(MOCK_LIST))
    component.ngOnInit()
    fixture.detectChanges()

    expect(service.list).toHaveBeenCalledWith()

    let investments = fixture.debugElement.nativeElement.querySelectorAll('.list-item')
    expect(investments.length).toBe(4)
    expect(investments[0].textContent.trim()).toEqual('Itaú | 100')
    expect(investments[investments.length - 1].textContent.trim()).toEqual('Nubank | 100')
  })
});
