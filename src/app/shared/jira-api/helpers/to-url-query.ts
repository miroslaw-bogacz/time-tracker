export function toUrlQuery(data: any) {
  return Object.keys(data || {})
    .reduce(
      (previous, key) => previous + `&${key}=${data[ key ]}`,
      '',
    )
    .replace(/^&/, '');
}
