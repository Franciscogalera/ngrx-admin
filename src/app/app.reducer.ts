import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as incomeOutcome from './income-outcome/income-outcome.reducer';


export interface GlobalState {
  ui: ui.State;
  user: auth.State;
  incomeOutcome: incomeOutcome.State;
}

export const reducers: ActionReducerMap<GlobalState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  incomeOutcome: incomeOutcome.incomeOutcomeReducer
};


