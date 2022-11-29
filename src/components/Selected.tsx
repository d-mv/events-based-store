import { useSelector } from '../store/useSelector';

export function Selected() {
  const slice = useSelector(['isLoading']);

  return <div>{String(slice)}</div>;
}
