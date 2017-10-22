import { identity, propOr, mergeAll } from 'ramda';

export interface MicroReducer<R> {
  [actionType: string]: R;
}

export function combineMicroReducers<R>(...microReducers: Array<MicroReducer<R>>) {
  const reducers: MicroReducer<R> = mergeAll(microReducers);

  return (actionType: string) => propOr(identity, actionType, reducers) as R;
}
