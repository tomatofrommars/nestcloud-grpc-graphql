import { BootModule } from '@nestcloud/boot';
import { NEST_BOOT, NEST_CONSUL } from '@nestcloud/common';
import { ConsulModule } from '@nestcloud/consul';
import { LoadbalanceModule } from '@nestcloud/loadbalance';
import { ServiceModule } from '@nestcloud/service';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@nestjs/terminus';
import { SchoolResolver } from './provider/school.resolver';
import { SchoolController } from './school.controller';

@Module({
    imports: [
        BootModule.register(__dirname, `config.yaml`),
        ConsulModule.register({ dependencies: [NEST_BOOT] }),
        ServiceModule.register({ dependencies: [NEST_BOOT, NEST_CONSUL] }),
        LoadbalanceModule.register({ dependencies: [NEST_BOOT] }),
        TerminusModule.forRootAsync({
            useFactory: () => ({ endpoints: [{ url: '/health', healthIndicators: [] }] }),
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
        }),
    ],
    controllers: [SchoolController],
    providers: [SchoolResolver],
})
export class AppModule {
}
