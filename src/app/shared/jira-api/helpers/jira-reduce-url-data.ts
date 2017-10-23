export function jiraReduceUrlData(data: string) {
  return function (type) {
    return (type.match(/({.*?})/g) || []).reduce((previous, current) => {
      const key: string = current.replace(/[{}]/g, '');
      const value = data && data[ key ];

      return !!value ? previous.replace(/({.*?})/, value) : previous;
    }, type);
  };
}
