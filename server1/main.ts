import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { NestCloud } from '@nestcloud/core';

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
