import { Optional, R } from '@mv-d/toolbelt';
import { useEffect, useRef } from 'react';

import { makeItems } from '../seed';
import {
  updateData,
  getDataByIndex,
  useDispatch,
  useSubscribe,
} from '../store';

let timer: Optional<NodeJS.Timeout> = undefined;

export function Subscribed() {
  const dispatch = useDispatch();
  const item = useSubscribe(getDataByIndex(5));

  const ref = useRef<boolean>(false);
  useEffect(() => {
    if (!ref.current)
      timer = setTimeout(() => {
        R.compose(dispatch, updateData)(makeItems(false));
        ref.current = true;
      }, 3000);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [dispatch]);

  return (
    <div
      style={{
        width: '1000px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
    >
      Data: {JSON.stringify(item)}
    </div>
  );
}
