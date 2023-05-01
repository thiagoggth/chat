import { Readable } from 'stream';

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: Readable;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

export interface HttpRequest {
  params?: any;
  body?: any;
  query?: any;
  headers?: any;
  files?: File[];
}

export interface SocketRequest {
  handshake: {
    auth: { [x: string]: any };
  };
  request: {
    headers: { [x: string]: any };
  };
}

export interface HttpResponse {
  status: number;
  body: any;
}
