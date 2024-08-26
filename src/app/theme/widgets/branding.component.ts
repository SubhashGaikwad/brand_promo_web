import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branding',
  template: `
    <button
    mat-button
      class="matero-branding"
      style="cursor: pointer;border-radius: 19px;"
    >
      <img
      mat-button
        src="./assets/images/brand_niti_logo.png"
        class="matero-branding-logo-expanded"
        alt="logo"
        style="height: 22px; width: 27px;"
      />
      <span class="brand-name" style="color: white;">Brandniti</span>
    </button>
  `,
  styles: [
    `
      .brand-name {
        font-size: 21px;
        font-variant-caps: all-small-caps;
      }
    `,
  ],
})
export class BrandingComponent {
  constructor(  private router: Router) {}


}
