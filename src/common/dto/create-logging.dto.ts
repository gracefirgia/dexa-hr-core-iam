export class CreateLogDto {
  requester_id: string;
  service: string;
  endpoint: string;
  method: string;
  request: any;
  response: any;
  response_code?: string;
  response_status?: string;
  latency: number;
}