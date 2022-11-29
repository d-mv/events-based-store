export function useDispatch() {
  return function dispatch<T>(a: { type: string; payload?: T }) {
    const event = new CustomEvent('store-action', {
      bubbles: true,
      detail: a,
    });
    document.dispatchEvent(event);
  };
}
