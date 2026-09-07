export class ImageResponse extends Response {
  constructor(_element: any, _options?: any) {
    super('mock-image-response', {
      headers: { 'content-type': 'image/png' },
    });
  }
}
