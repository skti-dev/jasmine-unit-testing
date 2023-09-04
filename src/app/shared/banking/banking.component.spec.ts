import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { BankingComponent } from './banking.component';
import { ListComponent } from '../investments/components/list/list.component';

describe('BankingComponent', () => {
  let component: BankingComponent;
  let fixture: ComponentFixture<BankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankingComponent, ListComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(BankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`(U) getPoupanca: poupanca should be 10`, () => {
    expect(component.getPoupanca).toEqual(10)
  });

  it(`(U) getCarteira: carteira should be 50`, () => {
    expect(component.getCarteira).toEqual(50)
  });

  it(`(U) setSacar: should send informed value from poupanca to carteira`, () => {
    component.setSacar('10')
    // fixture.detectChanges() // só precisa quando for alterado o valor do html
    expect(component.getPoupanca).toEqual(0)
    expect(component.getCarteira).toEqual(60)
  })

  it(`(U) setSacar: should error if isNan of value > poupanca`, () => {
    expect(component.setSacar('string')).not.toBeTruthy()
    expect(component.setSacar('1000')).not.toBeTruthy()
  })

  it(`(I) setSacar: should send informed value from poupanca to carteira`, () => {
    let el = fixture.debugElement.nativeElement
    el.querySelector("#input-sacar").value = '10'
    el.querySelector("#sacar").click()
    fixture.detectChanges()
    
    expect(component.getCarteira).toEqual(60)
    expect(component.getPoupanca).toEqual(0)
    
    expect(el.querySelector('#get-poupanca').textContent).toEqual('0')
    expect(el.querySelector('#get-carteira').textContent).toEqual('60')
  })

  it(`(U) setDepositar: should send informed value from carteira to poupanca`, () => {
    component.setDepositar('10')
    // fixture.detectChanges() // só precisa quando for alterado o valor do html
    expect(component.getCarteira).toEqual(40)
    expect(component.getPoupanca).toEqual(20)
  })

  it(`(U) setDepositar: should error if isNan of value > carteira`, () => {
    expect(component.setDepositar('string')).not.toBeTruthy()
    expect(component.setDepositar('1000')).not.toBeTruthy()
  })

  it(`(I) setDepositar: should send informed value from carteira to poupanca`, () => {
    let el = fixture.debugElement.nativeElement
    el.querySelector("#input-depositar").value = '10'
    el.querySelector("#depositar").click()
    fixture.detectChanges()
    
    expect(component.getCarteira).toEqual(40)
    expect(component.getPoupanca).toEqual(20)
    
    expect(el.querySelector('#get-poupanca').textContent).toEqual('20')
    expect(el.querySelector('#get-carteira').textContent).toEqual('40')
  })

});
