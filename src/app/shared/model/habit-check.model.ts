import { Habit, IHabit } from './habit.model';

export interface IHabitCheck {
  id: number;
  habitId: number;
  date: Date;
}

export class HabitCheck implements IHabitCheck {
  private constructor(
    public id: number,
    public habitId: number,
    public date: Date
  ) {
  }
}

export interface ICheckOverview {
  date: Date;
  checks: IHabit[];
}

export class CheckOverview implements ICheckOverview {
  private constructor(
      public date: Date,
      public checks: Habit[]
  ) {
  }
}
