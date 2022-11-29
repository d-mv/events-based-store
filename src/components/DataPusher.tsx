import { Optional, R } from '@mv-d/toolbelt';
import { useEffect } from 'react';

import { makeItems } from '../seed';
import { updateValues } from '../store';
import { useDispatch } from '../store/useDispatch';

let timer: Optional<NodeJS.Timer> = undefined;

let counter = 0;
export function DataPusher() {
  const dispatch = useDispatch();

  useEffect(() => {
    timer = setInterval(() => {
      if (counter < 1) {
        R.compose(dispatch, updateValues)(makeItems(true));
        counter += 1;
      } else {
        if (timer) clearInterval(timer);
        counter = 0;
      }
    }, 100);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [dispatch]);
  return <div />;
}
