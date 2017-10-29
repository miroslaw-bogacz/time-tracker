import { propOr } from 'ramda';

export const getErrorsFromPayload: (payload: any) => string[] = propOr([], 'errorMessages');
