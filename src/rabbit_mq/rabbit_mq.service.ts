import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitMqService {
  private readonly client = ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'logging_queue',
      queueOptions: { durable: true },
    },
  });

  emit(pattern: string, data: any) {
    return this.client.emit(pattern, data);
  }
}
