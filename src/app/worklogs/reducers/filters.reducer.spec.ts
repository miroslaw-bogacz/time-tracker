import * as filtersActions from '../actions/filters.actions';
import { filtersReducer } from './filters.reducer';

describe('filtersReducer', () => {

  describe('when reducer doesnt get any params', () => {

    it('shoud return default state', () => {

      const emptyAction = { type: '' } as any;
      expect(filtersReducer(undefined, emptyAction)).toEqual({ model: {} })

    });

  });

  describe('when reducer get UPDATE action with out state', () => {

    it('should return value with new element from payload', () => {

      const state = { model: {} };
      const actionPayload = { keywords: 'test keywords' };
      const action = new filtersActions.Update(actionPayload);
      const result = filtersReducer(state, action);
      const expected = { model: actionPayload };

      expect(result).toEqual(expected);

    });

  });

  describe('when reducer get UPDATE action', () => {

    it('should return value with new element from payload', () => {

      const state = { model: {} };
      const actionPayload = { keywords: 'test keywords' };
      const action = new filtersActions.Update(actionPayload);
      const result = filtersReducer(state, action);
      const expected = { model: actionPayload };

      expect(result).toEqual(expected);

    });

  });

  describe('when reducer get UPDATE action', () => {

    it('should return value with updated element from payload', () => {

      const state = { model: { keywords: 'old value' } };
      const actionPayload = { keywords: 'new value' };
      const action = new filtersActions.Update(actionPayload);
      const result = filtersReducer(state, action);
      const expected = { model: actionPayload };

      expect(result).toEqual(expected);

    });

  });

});


