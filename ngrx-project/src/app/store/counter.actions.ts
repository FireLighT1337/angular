import { createAction, props } from '@ngrx/store';
// import { Action } from 'rxjs/internal/scheduler/Action';

export const init = createAction('[Counter] Init');

export const set = createAction('[Counter] Set', props<{ value: number }>());

export const increment = createAction(
  '[Counter] Increment',
  // this is how you prepare an action for data that is attached, could also be email: string, password: string for example
  props<{ value: number }>(),
);

export const decrement = createAction(
  '[Counter] Decrement',
  props<{ value: number }>(),
);

// export const INCREMENT = '[Counter] Increment';

// export class IncrementAction implements Action {
//   readonly type = INCREMENT;

//   constructor(public value: number) {}
// }

// export type CounterActions = IncrementAction; // here we could export multiple by using the | symbol
