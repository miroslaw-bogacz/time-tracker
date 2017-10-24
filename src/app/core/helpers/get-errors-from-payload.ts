import { propOr } from 'ramda';

export function getErrorsFromPayload(payload: any): string[] {
  const errors = propOr([], 'errorMessages', payload);
  return [ ...( errors.length ? errors : [ errors ] ) ];
}
