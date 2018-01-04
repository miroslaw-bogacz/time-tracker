import { getErrorsFromPayload } from './get-errors-from-payload';

describe('getErrorsFromPayload', () => {

  describe('when call with payload with errors', () => {
    it('should return array errors', () => {
      const payload = { errorMessages: [ 'error 1', 'error 2' ] };
      const result = getErrorsFromPayload(payload);

      expect(result).toEqual(payload.errorMessages);
    });
  });

  describe('when call without payload errors', () => {
    it('should return empty array', () => {
      const payload = {};
      const result = getErrorsFromPayload(payload);

      expect(result).toEqual([]);
    });
  });

});
