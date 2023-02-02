import { Component, OnInit,OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  userActivated = false;
  activatedSub:Subscription;

  constructor(private userService:UserService) {}

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe(didActivate => { //didActivate = true
      this.userActivated = didActivate;
    });
  }

  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }
}
