import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from '../models/user.model';
import {UserService} from '../user.service';
import {Subscription} from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  navbarCollapsed = true;
  user: UserModel;
  userEventsSubscription: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userEventsSubscription = this.userService.userEvents.subscribe(value => this.user = value);
  }

  ngOnDestroy(): void {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }

  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout($event: Event) {
    $event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
