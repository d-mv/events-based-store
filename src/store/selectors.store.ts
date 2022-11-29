import { State } from './types.store';

export const getIsLoading = (state: State) => state.isLoading;

export const getValue = (state: State) => state.value;

export const getDataByIndex = (index: number) => (state: State) =>
  state.data.find(({ i }) => i === index);
