import { getValue } from '../store/selectors.store';
import { useSelector } from '../store/useSelector';

export function MultiObjectFastUpdate() {
  const v = useSelector(getValue);

  return (
    <div
      style={{
        width: '1000px',
        height: '800px',
        overflow: 'hidden',
        fontSize: '10px',
      }}
    >
      {JSON.stringify(v)}
    </div>
  );
}
