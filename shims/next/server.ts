export class NextResponse extends Response {
  static json(body: any, init?: ResponseInit) {
    return new NextResponse(JSON.stringify(body), {
      ...init,
      headers: {
        'content-type': 'application/json',
        ...(init?.headers || {}),
      },
    });
  }

  static redirect(url: string | URL, status: number = 307) {
    return new NextResponse(null, {
      status,
      headers: { Location: url.toString() },
    });
  }

  static next() {
    return new NextResponse(null, { status: 200 });
  }
}

export class NextRequest extends Request {
  public nextUrl: URL;
  public cookies: {
    get: (name: string) => { name: string; value: string } | undefined;
    set: (name: string, value: string) => void;
    delete: (name: string) => void;
    getAll: () => Array<{ name: string; value: string }>;
  };

  constructor(input: RequestInfo | URL, init?: RequestInit) {
    super(input, init);
    const urlStr =
      typeof input === 'string'
        ? input
        : input instanceof URL
        ? input.toString()
        : (input as Request).url;
    this.nextUrl = new URL(urlStr, 'http://localhost:3000');
    this.cookies = {
      get: (name: string) => undefined,
      set: () => {},
      delete: () => {},
      getAll: () => [],
    };
  }
}
