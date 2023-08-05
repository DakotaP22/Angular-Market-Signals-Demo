import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavbarComponent {
  @Input({ required: true }) title!: string;
  authSvc = inject(AuthService);

  isAuthenticated = this.authSvc.isAuthenticated;

  logAuthenticated = effect(() => console.log(this.isAuthenticated()));
}
