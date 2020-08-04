import { BootModule } from '@nestcloud/boot';
import { BOOT, CONSUL } from '@nestcloud/common';
import { ConsulModule } from '@nestcloud/consul';
import { LoadbalanceModule } from '@nestcloud/loadbalance';
import { ServiceModule } from '@nestcloud/service';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@nestjs/terminus';
import * as path from 'path';

import { SchoolResolver } from './provider/school.resolver';
import { SchoolController } from './school.controller';

@Module({
    imports: [
        BootModule.forRoot({
            filePath: path.resolve(__dirname, 'config.yaml'),
        }),
        ConsulModule.forRootAsync({ inject: [BOOT] }),
        ServiceModule.forRootAsync({ inject: [BOOT, CONSUL] }),
        LoadbalanceModule.forRootAsync({ inject: [BOOT] }),
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
        }),
    ],
    controllers: [SchoolController],
    providers: [SchoolResolver],
})
export class AppModule {}
