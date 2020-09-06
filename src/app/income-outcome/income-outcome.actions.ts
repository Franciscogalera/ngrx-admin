import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../model/ingreso-egreso.model';

export const setItems   = createAction(
  '[IncomeOutcome Component] setItems',
  props<{items: IngresoEgreso[]}>());

export const unsetItems = createAction('[IncomeOutcome Component] unsetItems');
