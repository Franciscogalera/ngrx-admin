import { createReducer, on } from '@ngrx/store';
import {  setItems, unsetItems } from './income-outcome.actions';
import { IngresoEgreso } from '../model/ingreso-egreso.model';

export interface State {
  items: IngresoEgreso[];
}

export const initialState: State = {
  items: []
}

const _incomeOutcomeReducer = createReducer(initialState,

    on( setItems,   (state, {items}) => ({ ...state, items: [...items] })),
    on( unsetItems, state => ({ ...state, items: [] })),

);

export function incomeOutcomeReducer(state, action) {
    return _incomeOutcomeReducer(state, action);
}
