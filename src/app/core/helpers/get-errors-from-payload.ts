import { propOr } from 'ramda';

export function getErrorsFromPayload(payload): any[] {
  const errors = propOr([], 'errorMessages', payload);
  return [ ...( errors.length ? errors : [ errors ] ) ];
}
