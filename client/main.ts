import { NestFactory } from '@nestjs/core';
import { BOOT, IBoot } from '@nestcloud/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const boot = app.get<IBoot>(BOOT);
    await app.listen(boot.get('service.port', 3000));
}

bootstrap();