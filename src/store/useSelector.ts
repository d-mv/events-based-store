import { useCallback, useEffect, useState } from 'react';
import { AnyValue, R } from '@mv-d/toolbelt';

import { INITIAL_STATE } from './initial.store';
import { State } from './types.store';

function toArray<T>(v: T | T[]): T[] {
  if (Array.isArray(v)) return v;
  return [v];
}

export function useSelector<T>(
  pathOrFn: string | string[] | ((state: State) => T)
) {
  function getCurrentState() {
    if (typeof pathOrFn === 'function') return pathOrFn(INITIAL_STATE);
    else return R.path(toArray(pathOrFn), INITIAL_STATE);
  }

  const [state, setState] = useState<AnyValue>(getCurrentState());

  const processUpdate = useCallback(
    (e: CustomEvent) => {
      if (typeof pathOrFn === 'function') {
        const r = pathOrFn(e.detail);
        if (state !== r) setState(r);
      } else {
        const slice = R.path(toArray(pathOrFn), e.detail);
        if (state !== slice) setState(slice);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathOrFn]
  );

  useEffect(() => {
    document.addEventListener('store-update', (e) => {
      if ('detail' in e) processUpdate(e as CustomEvent);
    });
    return () => {
      document.removeEventListener('store-update', (e) => {
        if ('detail' in e) processUpdate(e as CustomEvent);
      });
    };
  }, [processUpdate]);
  return state;
}
