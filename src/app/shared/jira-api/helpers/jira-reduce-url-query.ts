import { toUrlQuery } from './to-url-query';

export function jiraReduceUrlQuery(jqlParams: any) {
  return function(type: string) {
    const urlQuery: string = toUrlQuery(jqlParams);

    return type.replace('{urlQuery}', urlQuery);
  }
};
