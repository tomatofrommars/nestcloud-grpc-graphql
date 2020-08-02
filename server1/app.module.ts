import { BootModule } from '@nestcloud/boot';
import { NEST_BOOT, NEST_CONSUL } from '@nestcloud/common';
import { ConsulModule } from '@nestcloud/consul';
import { LoadbalanceModule } from '@nestcloud/loadbalance';
import { ServiceModule } from '@nestcloud/service';
import { Module } from '@nestjs/common';
import { SchoolModule } from './school/school.module';

@Module({
    imports: [
        BootModule.register(__dirname, `config.yaml`),
        ConsulModule.register({ dependencies: [NEST_BOOT] }),
        ServiceModule.register({ dependencies: [NEST_BOOT, NEST_CONSUL] }),
        LoadbalanceModule.register({ dependencies: [NEST_BOOT] }),
        SchoolModule,
    ],
})
export class AppModule {
}
