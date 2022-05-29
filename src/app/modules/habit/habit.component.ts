import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from '../../shared/model/action.model';
import { HabitService } from '../../shared/service/habit.service';
import { Habit, IHabit } from '../../shared/model/habit.model';
import { Routes } from '../../routes';
import { MenuOverlayService } from '../../shared/modal/menu-overlay.service';
import { ConfirmModalComponent } from '../../shared/modal/confirm-modal/confirm-modal.component';
import { HabitCheckService } from '../../shared/service/habit-check.service';
import { HabitAddModalComponent } from '../../shared/modal/habit-add-modal/habit-add-modal.component';

@Component({
  selector: 'ha-habit',
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.scss']
})
export class HabitComponent implements OnInit {

  actions = [
    Action.create<IHabit>({
      label: 'Edit',
      icon: 'ic-edit',
      executor: (entity) => {
        this.menuOverlayService.open({
          component: HabitAddModalComponent,
          data: {
            action: (habit: IHabit) => {
              this.habitService.updateHabits()
              this.habit = habit;
            },
            entity
          }
        });
      }
    }),
    Action.create<IHabit>({
      label: 'Delete',
      icon: 'ic-delete',
      executor: (entity) => {
        if (!entity) { return }
        this.menuOverlayService.open({
          component: ConfirmModalComponent,
          data: {
            action: () => {
              this.habitService.delete(entity.id).subscribe(() => {
                this.habitService.updateHabits();
                this.router.navigate([Routes.home()]);
              });
            }
          }
        })
      }
    })
  ];

  habit: IHabit = Habit.newEmpty();

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private habitService: HabitService,
      private habitCheckService: HabitCheckService,
      private menuOverlayService: MenuOverlayService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.habit = data.habit;
    });
  }

}
