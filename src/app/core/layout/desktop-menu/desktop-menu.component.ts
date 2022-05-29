import { Component, Input } from '@angular/core';
import { Account } from '../../../shared/model/account.model';
import { IHabit } from '../../../shared/model/habit.model';
import { MenuOverlayService } from '../../../shared/modal/menu-overlay.service';
import { HabitService } from '../../../shared/service/habit.service';
import { Routes } from '../../../routes';
import { Router } from '@angular/router';
import { HabitAddModalComponent } from '../../../shared/modal/habit-add-modal/habit-add-modal.component';

@Component({
  selector: 'ha-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss']
})
export class DesktopMenuComponent {

  @Input() account: Account | null = null;
  @Input() habits: IHabit[] = [];
  Routes = Routes;

  constructor(
      private menuOverlayService: MenuOverlayService,
      private habitService: HabitService,
      private router: Router
  ) { }

  addHabitModal() {
    this.menuOverlayService.open({
      component: HabitAddModalComponent,
      data: {
        action: (habit: IHabit) => {
          this.habitService.updateHabits()
        },
      }
    });
  }

  toAccount() {
    this.router.navigate([Routes.accountView()]);
  }

}
