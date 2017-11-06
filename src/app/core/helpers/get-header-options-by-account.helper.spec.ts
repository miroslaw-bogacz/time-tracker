import { getHeaderOptionsByAccount } from './get-header-options-by-account.helper';
import { IAccount } from '../../account/models/i-account.model';
import { IJiraRequestOptions } from '../../shared/jira-api/models/jira-request-options.interface';

describe('getHeaderOptionsByAccount', () => {

  describe('when has been call without port', () => {

    it ('should return value', () => {
      const mockedInput: IAccount = {
        www: 'http://www.example.com',
        username: 'test-username',
        auth: 'Basic Auth',
        token: 'test-token',
      };

      const mockedResult: IJiraRequestOptions = <IJiraRequestOptions>{
        protocol: 'http',
        port: null,
        domain: 'www.example.com',
        authentication: mockedInput.auth,
        token: mockedInput.token,
      };

      const result: IJiraRequestOptions = getHeaderOptionsByAccount(mockedInput);

      expect(result).toEqual(mockedResult);
    });

  });

  describe('when has been call with port', () => {

    it ('should return value', () => {
      const mockedInput: IAccount = {
        www: 'http://www.example.com:8080',
        username: 'test-username',
        auth: 'Basic Auth',
        token: 'test-token',
      };

      const mockedResult: IJiraRequestOptions = <IJiraRequestOptions>{
        protocol: 'http',
        port: 8080,
        domain: 'www.example.com',
        authentication: mockedInput.auth,
        token: mockedInput.token,
      };

      const result: IJiraRequestOptions = getHeaderOptionsByAccount(mockedInput);

      expect(result).toEqual(mockedResult);
    });

  });

});
