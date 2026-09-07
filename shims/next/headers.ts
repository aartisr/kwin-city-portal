export function cookies() {
  return {
    get: (_name: string) => undefined,
    set: (_name: string, _value: string) => {},
    delete: (_name: string) => {},
    getAll: () => [],
  };
}

export function headers() {
  return new Headers();
}
