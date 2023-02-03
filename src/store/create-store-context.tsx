import {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore
} from 'react';

export function createStoreContext<Store>(initState: Store) {
  type UseStoreData = {
    get: () => Store;
    set: (value: Partial<Store>) => void;
    subscribe: (callback: () => void) => () => void;
  };

  const useStoreData = (): UseStoreData => {
    const store = useRef(initState);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: Partial<Store>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach(callback => callback());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe
    };
  };

  const StoreContext = createContext<UseStoreData | null>(null);

  interface ProviderProps {
    children: React.ReactNode;
  }

  const Provider = ({ children }: ProviderProps) => {
    return (
      <StoreContext.Provider value={useStoreData()}>
        {children}
      </StoreContext.Provider>
    );
  };

  function useStore<SelectorOutput>(
    selector: (store: Store) => SelectorOutput
  ): [SelectorOutput, (value: Partial<Store>) => void] {
    const store = useContext(StoreContext);

    if (!store) throw new Error('Store not found');

    const state = useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(initState)
    );

    return [state, store.set];
  }

  return { Provider, useStore };
}
