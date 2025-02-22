type HttpRequest = {
    method: string;
    params: any;
    body: any;
    query: any;
}

type HttpResponse = {
    json(data: any): void;
    status(code: number): HttpResponse;
    send(data?: any): void;
}

type HttpAdapter = {
    request: HttpRequest;
    response: HttpResponse
}
