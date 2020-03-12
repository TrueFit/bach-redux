export type Selector<T, K> = (state: never, props: T | undefined) => K;
