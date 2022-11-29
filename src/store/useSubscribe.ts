import { useEffect, useState } from 'react';
import { AnyValue, generateId } from '@mv-d/toolbelt';

import { INITIAL_STATE } from './initial.store';
import { State } from './types.store';

export function useSubscribe<T>(selectorFn: (state: State) => T) {
  const [state, setState] = useState<AnyValue>(selectorFn(INITIAL_STATE));
  function processUpdate(e: CustomEvent) {
    setState(e.detail);
  }

  useEffect(() => {
    const id = generateId();

    const event = new CustomEvent('store-subscribe', {
      bubbles: true,
      detail: { type: id, payload: selectorFn },
    });

    document.dispatchEvent(event);
    const eventId = `store-subscription-update-${id}`;

    document.addEventListener(eventId, (e) => {
      if ('detail' in e) processUpdate(e as CustomEvent);
    });

    return () => {
      // TODO: add unsubscribe from store
      document.removeEventListener(eventId, (e) => {
        if ('detail' in e) processUpdate(e as CustomEvent);
      });
    };
  }, [selectorFn]);
  return state;
}
