import { R,  } from '@mv-d/toolbelt';

import { StateActions, State, ReducerFn } from './types.store';



export const REDUCER_FNS = new Map<StateActions, ReducerFn<State>>();

REDUCER_FNS.set(StateActions.SET_IS_LOADING, (state, action) => {
  if (R.isNil(action.payload)) return state;
  return R.assoc('isLoading', action.payload, state);
});

REDUCER_FNS.set(StateActions.UPDATE_VALUE, (state, action) => {
  if (R.isNil(action.payload)) return state;
  return R.assoc('value', action.payload, state);
});

REDUCER_FNS.set(StateActions.UPDATE_DATA, (state, action) => {
  if (R.isNil(action.payload)) return state;
  return R.assoc('data', action.payload, state);
});
