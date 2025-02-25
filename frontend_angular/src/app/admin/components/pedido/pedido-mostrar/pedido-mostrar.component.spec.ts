import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoMostrarComponent } from './pedido-mostrar.component';

describe('PedidoMostrarComponent', () => {
  let component: PedidoMostrarComponent;
  let fixture: ComponentFixture<PedidoMostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedidoMostrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
