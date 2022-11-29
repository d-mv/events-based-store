import { Action, Data, StateActions } from './types.store';

export const updateData = (
  payload: Data<string>[]
): Action<Data<string>[]> => ({
  type: StateActions.UPDATE_DATA,
  payload,
});

export const setIsLoading = (payload: boolean): Action<boolean> => ({
  type: StateActions.SET_IS_LOADING,
  payload,
});

export const updateValues = (payload: Data<Date>[]): Action<Data<Date>[]> => ({
  type: StateActions.UPDATE_VALUE,
  payload,
});
