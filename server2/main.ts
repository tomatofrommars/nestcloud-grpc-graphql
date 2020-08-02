import { NestCloud } from '@nestcloud/core';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = NestCloud.create(await NestFactory.create(AppModule));
    await app.connectMicroservice({
        transport: Transport.GRPC,
        options: {
            url: `0.0.0.0:${NestCloud.global.boot.get('service.port')}`,
            package: 'school',
            protoPath: join(__dirname, './school/school.proto'),
        },
    });
    await app.startAllMicroservicesAsync();
    await app.listen(null);
}

bootstrap();
