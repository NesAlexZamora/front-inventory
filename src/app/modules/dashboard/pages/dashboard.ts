import { Component } from '@angular/core';
import { Sidenav } from '../../shared/components/sidenav/sidenav';
import { CategoryModule } from '../../category/category-module';

@Component({
  selector: 'app-dashboard',
  imports: [Sidenav,CategoryModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
