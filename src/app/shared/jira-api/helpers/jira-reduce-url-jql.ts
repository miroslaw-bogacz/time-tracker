
export function jiraReduceUrlJql(jqlParams: any) {
  return function(type: string) {
    const jql: string = jqlParams;

    return type.replace('{jql}', jqlParams);
  };
}
