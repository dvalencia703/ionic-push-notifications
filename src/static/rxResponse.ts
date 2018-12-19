export class rxResponse {
  error: any;
  message: string;
}

export class rxResponseNotification extends rxResponse {
  data: any = null;
}
