import {
  R,
  deepEqual,
  AnyValue,
  Result,
  failure,
  success,
  generateId,
  logger,
  Optional,
  RecordObject,
} from '@mv-d/toolbelt';

import { Action, Reducers, StateActions } from './types.store';
import { REDUCER_FNS } from './reducerFns.store';
import { INITIAL_STATE } from './initial.store';

type Subscription = {
  id: string;
  path: string | string[];
  fn: (arg0: unknown) => void;
};

export interface StoreOptions {
  isSilent: boolean;
}

class Store<S> {
  #state: S;
  #reducerFns: Reducers<StateActions, S>;
  #subscriptions: Subscription[] = [];
  #options: Optional<Partial<StoreOptions>>;

  constructor(
    initialState: S,
    reducerFns: Reducers<StateActions, S>,
    options?: Partial<StoreOptions>
  ) {
    this.#state = initialState;
    this.#reducerFns = reducerFns;
    this.#options = options;
    this.#listenToEvents();
    logger.info('Store is init');
  }
  #cached: RecordObject<{ fn: (state: S) => unknown; cachedResult: unknown }> =
    {};
  #processSubscription(
    e: CustomEvent<{ type: string; payload: (state: S) => unknown }>
  ) {
    const id = e.detail.type;
    const fn = e.detail.payload;
    const cachedResult = fn(this.#state);

    this.#cached = R.assoc(id, { fn, cachedResult }, this.#cached);
    this.#notifySubscribedClient(id, cachedResult);
  }

  #listenToEvents() {
    document.addEventListener('store-action', (e) => {
      if ('detail' in e) this.#processEvents(e as CustomEvent);
    });
    document.addEventListener('store-subscribe', (e) => {
      if ('detail' in e) this.#processSubscription(e as CustomEvent);
    });
  }
  #processEvents(e: CustomEvent<Action>) {
    const action = e.detail;
    const r = this.#reducer(action);

    if (r.isOK) {
      this.#logAction(action, this.#state, r.payload);
      this.#updateState(r.payload);
    }
  }

  #reducer(action: Action): Result<S> {
    const fn = this.#reducerFns.get(action.type);
    if (!fn) return failure(new Error('No action fn'));
    const newState = fn(this.#state, action);

    const isSame = deepEqual(this.#state, newState);

    return isSame ? failure(new Error('Not updated')) : success(newState);
  }

  #notifySubscribedClient(id: string, newResult: unknown) {
    const event = new CustomEvent(`store-subscription-update-${id}`, {
      bubbles: true,
      detail: newResult,
    });
    document.dispatchEvent(event);
  }
  #updateCachedResult(id: string, cachedResult: unknown) {
    if (!(id in this.#cached)) return;

    this.#cached[id] = { ...this.#cached[id], cachedResult };
  }

  #notifyOfStateChange(nextState: S) {
    const event = new CustomEvent('store-update', {
      bubbles: true,
      detail: nextState,
    });
    document.dispatchEvent(event);

    for (const [id, { fn, cachedResult }] of Object.entries(this.#cached)) {
      const newResult = fn(nextState);
      const isEqual = R.identical(newResult, cachedResult);

      if (!isEqual) {
        this.#notifySubscribedClient(id, newResult);
        this.#updateCachedResult(id, newResult);
      }
    }
  }
  #logAction(action: Action<AnyValue>, state: S, nextState: S) {
    if (this.#options?.isSilent) return;
    console.groupCollapsed(`STORE Action: ${action.type}`);
    console.log('prevState:', state);
    console.log('action:', action);
    console.log('nextState:', nextState);
    console.groupEnd();
  }

  async #updateState(nextState: S) {
    this.#notifyOfStateChange(nextState);
    this.#state = nextState;
  }

  subscribeToPath(path: string | string[], fn: (arg0: unknown) => void) {
    const id = generateId();
    this.#subscriptions.push({ path, fn, id });
    return id;
  }

  unsubscribeFromPath(subId: string) {
    this.#subscriptions = this.#subscriptions.filter(({ id }) => id !== subId);
  }
}

export const createStore = <State>(
  initialState: State,
  reducerFns: Reducers<StateActions, State>,
  options?: Partial<StoreOptions>
) => new Store(initialState, reducerFns, options);

export const store = createStore(INITIAL_STATE, REDUCER_FNS);

export const initStore = () => store;
