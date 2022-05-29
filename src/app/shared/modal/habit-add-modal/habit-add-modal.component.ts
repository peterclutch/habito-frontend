import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ModalOverlayRef } from '../modal-overlay-ref';
import { Router } from '@angular/router';
import { HabitService } from '../../service/habit.service';
import { HABITO_MODAL_DATA } from '../modal.token';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType } from '../../directive/button/button.directive';
import { Routes } from '../../../routes';
import { Habit, IHabit } from '../../model/habit.model';
import { ModalData } from '../modal.model';

@Component({
  templateUrl: './habit-add-modal.component.html',
  styleUrls: ['./habit-add-modal.component.scss']
})
export class HabitAddModalComponent implements OnInit {

  _degree: number = 0;
  loading: boolean = false;
  habitForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    icon: ['', [Validators.required]]
  })
  buttonType = ButtonType;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private habitService: HabitService,
    public modalRef: ModalOverlayRef,
    @Inject(HABITO_MODAL_DATA) public data: ModalData
) { }

  get degree(): string {
    return `${this._degree}deg`;
  }

  close(): void {
    this.modalRef.close();
  }

  createHabit(): void {
    this.loading = true;
    if (this.data.entity) {
      this.habitService.update({ ...this.data.entity, ...this.habitForm.value }).subscribe((habit: IHabit) => {
        this.handleSucces(habit);
      }, () => {
        this.loading = false;
      });
    } else {
      this.habitService.create(this.habitForm.value).subscribe((habit: IHabit) => {
        this.handleSucces(habit);
      }, () => {
        this.loading = false;
      });
    }
  }

  handleSucces(habit: IHabit): void {
    this.close();
    this.data.action(habit);
    this.router.navigate([Routes.habits(habit.id)]);
  }

  ngOnInit(): void {
    if (this.data.entity) {
      this.habitForm = this.formBuilder.group({
        title: [this.data.entity.title, [Validators.required]],
        icon: [this.data.entity.icon, [Validators.required]]
      })
    }

    setInterval(() => {
      this._degree = this._degree >= 360 ? 0 : this._degree + 2;
    }, 80);
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.close();
  }
}
