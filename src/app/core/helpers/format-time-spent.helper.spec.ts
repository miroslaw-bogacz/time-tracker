import { formatTimeSpent } from './format-time-spent.helper';

describe('formatTimeSpent', () => {

  describe('when call with 0sec', () => {
    it('should return 00:00:00', () => {
      const millisecond = 0;

      expect(formatTimeSpent(millisecond)).toEqual('00:00:00');
    });
  });

  describe('when call with 1sec', () => {
    it('should return 00:00:01', () => {
      const millisecond = 1000;

      expect(formatTimeSpent(millisecond)).toEqual('00:00:01');
    });
  });

  describe('when call with 1min', () => {
    it('should return 00:01:00', () => {
      const millisecond = 60000;

      expect(formatTimeSpent(millisecond)).toEqual('00:01:00');
    });
  });

  describe('when call with 1h', () => {
    it('should return 01:00:00', () => {
      const millisecond = 3600000;

      expect(formatTimeSpent(millisecond)).toEqual('01:00:00');
    });
  });

  describe('when call with 1h 1min 1sec', () => {
    it('should return 01:00:00', () => {
      const millisecond = 3661000;

      expect(formatTimeSpent(millisecond)).toEqual('01:01:01');
    });
  });

  describe('when call with 10h 10min 10sec', () => {
    it('should return 10:10:10', () => {
      const millisecond = 36610000;

      expect(formatTimeSpent(millisecond)).toEqual('10:10:10');
    });
  });

});
