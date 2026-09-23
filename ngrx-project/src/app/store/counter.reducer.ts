import { Action, createReducer, on } from '@ngrx/store';
import {
  decrement,
  //   CounterActions,
  //   INCREMENT,
  increment,
  set,
  //   IncrementAction,
} from './counter.actions';

const initialState = 0; // can be any value

export const counterReducer = createReducer(
  initialState,
  // here we define what happens when the action is dispatched, the dispatch itself happens in counter-controls.ts
  // action is used to pass attached data
  on(increment, (state, action) => state + action.value),
  on(decrement, (state, action) => state - action.value),
  on(set, (state, action) => action.value),
);

// this is what happens under the hood in createReducer(), can be useful in older versions where it does not exist

// export function counterReducer(
//   state = initialState,
//   action: CounterActions | Action,
// ) {
//   if (action.type === INCREMENT) {
//     return state + (action as IncrementAction).value;
//   }
//   return state;
// }
