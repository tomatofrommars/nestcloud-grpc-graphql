import { Controller, Get, OnModuleInit, Param, Query } from '@nestjs/common';
import { join } from 'path';

import { SchoolService } from './interfaces/school-service.interface';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';

@Controller('/school')
export class SchoolController implements OnModuleInit {
    private schoolService: SchoolService;

    @Client({
        transport: Transport.GRPC,
        options: {
            package: 'school',
            protoPath: join(__dirname, './interfaces/school-service.proto'),
        },
    })
    client: ClientGrpc;

    onModuleInit() {
        this.schoolService = this.client.getService<SchoolService>('SchoolService');
    }

    @Get('/get/:id')
    async get(@Param('id') id: number) {
        return this.schoolService.get({ id }).toPromise();
    }

    @Get('/rename')
    async rename(@Query('id') id: number, @Query('name') name: string) {
        console.log(id, name);
        const data = await this.schoolService.rename({ id, name }).toPromise();
        console.log(data);
        return data;
    }
}
