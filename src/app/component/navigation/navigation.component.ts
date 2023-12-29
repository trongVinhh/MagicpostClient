import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  currentRoute: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Sử dụng filter để chỉ lắng nghe sự kiện NavigationEnd
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Lấy route hiện tại sau khi thay đổi
      this.currentRoute = this.activatedRoute.snapshot.firstChild?.routeConfig?.path || '';
      console.log(this.activatedRoute.snapshot.firstChild?.routeConfig?.path);
    });
  }

}
