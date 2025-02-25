import { Component } from '@angular/core';
import { NavComponent } from '../components/nav/nav.component';

@Component({
  selector: 'app-servicios',
  imports: [NavComponent],
  templateUrl: './servicios.component.html',
  styles: `
  .gradient {
    background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
}
  `
})
export class ServiciosComponent {

}
