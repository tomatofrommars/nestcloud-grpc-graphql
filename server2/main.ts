import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestCloud } from '@nestcloud/core';

async function bootstrap() {
    // const app = await NestFactory.create(AppModule);
    // await app.connectMicroservice({
    //     options: {
    //         url: `0.0.0.0:8500`,
    //     },
    // });
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: 'school',
            protoPath: join(__dirname, './school/school.proto'),
        },
    });
    // await app.startAllMicroservicesAsync();
    await app.listen(null);
}

bootstrap();
