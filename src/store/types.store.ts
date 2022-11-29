import { AnyValue } from '@mv-d/toolbelt';

export enum StateActions {
  SET_IS_LOADING = 'setIsLoading',
  UPDATE_VALUE = 'updateValue',
  UPDATE_DATA = 'updateData',
}

export type Data<V = unknown> = { i: number; id: string; values: V[] };

export interface State {
  isLoading: boolean;
  value: Data<Date>[];
  data: Data<string>[];
}

export type Action<Payload = void> = { type: StateActions; payload: Payload };

export type ReducerFn<T> = (state: T, action: Action<AnyValue>) => T;

export type Reducers<A, S> = Map<A, ReducerFn<S>>;
