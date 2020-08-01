import {Controller, Get, Param, Query} from '@nestjs/common';
import { GrpcClient, RpcClient, Service } from '@nestcloud/grpc';
import { join } from 'path';

import { SchoolService } from './interfaces/school-service.interface';
import {GetSchoolResponse, RenameResponse} from './interfaces/schroll.interface';

@Controller('/school')
export class SchoolController {
    @RpcClient({
        service: 'rpc-server',
        package: 'school',
        protoPath: join(__dirname, './interfaces/school-service.proto'),
    })
    private readonly client: GrpcClient;
    @Service('SchoolService', {
        service: 'rpc-server',
        package: 'school',
        protoPath: join(__dirname, './interfaces/school-service.proto'),
    })
    private schoolService: SchoolService;

    @Get('/get/:id')
    async get(@Param('id') id: number) {
        return this.schoolService.get({ id }).toPromise();
    }

    @Get('/rename')
    async rename(@Query('id') id: number, @Query('name') name: string) {
        console.log(id, name)
        const data = await this.schoolService.rename({ id, name }).toPromise();
        console.log(data);
        return data;
    }
}
