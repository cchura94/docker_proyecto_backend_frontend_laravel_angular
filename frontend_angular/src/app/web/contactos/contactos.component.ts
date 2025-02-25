import { Component } from '@angular/core';
import { NavComponent } from '../components/nav/nav.component';

@Component({
  selector: 'app-contactos',
  imports: [NavComponent],
  template: `
    <div
      class="leading-normal tracking-normal text-white gradient"
      style="font-family: 'Source Sans Pro', sans-serif;"
    >
      <app-nav></app-nav>
      <div class="pt-24">
        <div
          class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center"
        >
          <!--Left Col-->
          <div
            class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left"
          >
            <p class="uppercase tracking-loose w-full">CONTACTENOS</p>
            <h1 class="my-4 text-5xl font-bold leading-tight">
              Nuestros Contactos
            </h1>
            <button
              class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              Subscribe
            </button>
          </div>
          <!--Right Col-->
          <div class="w-full md:w-3/5 py-6 text-center">
            <img class="w-full md:w-4/5 z-50" src="hero.png" />
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './contactos.component.scss',
})
export class ContactosComponent {}
