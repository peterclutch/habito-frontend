import { Component, Input } from '@angular/core';
import { Account } from '../../../shared/model/account.model';
import { IHabit } from '../../../shared/model/habit.model';
import { AvatarSize } from '../../../shared/component/avatar/avatar.component';
import { Routes } from '../../../routes';
import { Router } from '@angular/router';
import { MenuOverlayService } from '../../../shared/modal/menu-overlay.service';
import { HabitService } from '../../../shared/service/habit.service';

@Component({
  selector: 'ha-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent {

  @Input() account: Account | null = null;
  @Input() habits: IHabit[] = [];
  AvatarSize = AvatarSize;
  Routes = Routes;
  expandMenuVisible: boolean = false;

  constructor(
      private router: Router,
      private menuOverlayService: MenuOverlayService,
      private habitService: HabitService
  ) { }

  toAccount() {
    this.router.navigate([Routes.accountView()]);
  }

  expandMenu() {
    this.expandMenuVisible = !this.expandMenuVisible;
  }

  addHabitModal() {
    this.expandMenu()
    this.menuOverlayService.open({}, (habit: IHabit) => { this.habitService.updateHabits() });
  }

}
