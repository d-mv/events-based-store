import { UpdateOnTimeout } from './UpdateOnTimeout';
import { Selected } from './Selected';
import { getIsLoading } from '../store/selectors.store';
import { MultiObjectFastUpdate } from './MultiObjectFastUpdate';
import { Subscribed } from './Subscribed';
import { useSubscribe } from '../store/useSubscribe';
import { DataPusher } from './DataPusher';

export function App() {
  const isLoading = useSubscribe(getIsLoading);

  return (
    <div>
      <UpdateOnTimeout />
      <Selected />
      <Subscribed />
      {`Loading: ${String(isLoading)}`}
      <MultiObjectFastUpdate />
      <DataPusher />
    </div>
  );
}
