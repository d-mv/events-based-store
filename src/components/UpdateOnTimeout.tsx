import { Optional } from '@mv-d/toolbelt';
import { useEffect, useRef } from 'react';

import { setIsLoading, useDispatch } from '../store';

let timer: Optional<NodeJS.Timeout> = undefined;

export function UpdateOnTimeout() {
  const ref = useRef<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!ref.current)
      timer = setTimeout(() => {
        dispatch(setIsLoading(false));
        ref.current = true;
      }, 3000);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [dispatch]);
  return <div>operations</div>;
}
