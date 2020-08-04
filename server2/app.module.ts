import { BootModule } from '@nestcloud/boot';
import { BOOT, CONSUL } from '@nestcloud/common';
import { ConsulModule } from '@nestcloud/consul';
import { LoadbalanceModule } from '@nestcloud/loadbalance';
import { ServiceModule } from '@nestcloud/service';
import { Module } from '@nestjs/common';
import { SchoolModule } from './school/school.module';
import * as path from 'path';

@Module({
    imports: [
        BootModule.forRoot({
            filePath: path.resolve(__dirname, 'config.yaml'),
        }),
        ConsulModule.forRootAsync({ inject: [BOOT] }),
        ServiceModule.forRootAsync({ inject: [BOOT, CONSUL] }),
        LoadbalanceModule.forRootAsync({ inject: [BOOT] }),
        SchoolModule,
    ],
})
export class AppModule {}
