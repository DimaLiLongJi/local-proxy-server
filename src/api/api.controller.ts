import { Controller, Get, UseInterceptors, Post, Put, Delete, Patch, HttpService, Headers, Body, Req } from '@nestjs/common';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { EnvService } from '../service/env.service';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request as ExpressRequest } from 'express';

@UseInterceptors(LoggingInterceptor)
// @Controller('api')
@Controller()
export class ApiController {
  constructor(
    private readonly httpService: HttpService,
    private readonly envService: EnvService,
  ) { }

  @Get('*')
  proxyGet(
    @Req() req: ExpressRequest,
    @Headers() headers: any,
  ): Observable<AxiosResponse<any>> {
    return this.httpService.get(this.envService.getProxyUrl(req.url), {
      headers: {
        'cookie': headers.cookie,
        'user-agent': headers['user-agent'],
        'content-type': headers['content-type'],
      },
    }).pipe(map(response => {
      console.log(`请求 ${req.url} 的响应：`, response.data);
      return response.data;
    }));
  }

  @Post('*')
  proxyPost(
    @Req() req: ExpressRequest,
    @Headers() headers: any,
    @Body() body: any = {},
  ): Observable<AxiosResponse<any>> {
    return this.httpService.post(this.envService.getProxyUrl(req.url), body, {
      headers: {
        'cookie': headers.cookie,
        'user-agent': headers['user-agent'],
        'content-type': headers['content-type'],
      },
    }).pipe(map(response => {
      console.log(`请求 ${req.url} 的响应：`, response.data);
      return response.data;
    }));
  }

  @Put('*')
  proxyPut(
    @Req() req: ExpressRequest,
    @Headers() headers: any,
    @Body() body: any = {},
  ): Observable<AxiosResponse<any>> {
    return this.httpService.put(this.envService.getProxyUrl(req.url), body, {
      headers: {
        'cookie': headers.cookie,
        'user-agent': headers['user-agent'],
        'content-type': headers['content-type'],
      },
    }).pipe(map(response => {
      console.log(`请求 ${req.url} 的响应：`, response.data);
      return response.data;
    }));
  }

  @Patch('*')
  proxyPatch(
    @Req() req: ExpressRequest,
    @Headers() headers: any,
    @Body() body: any = {},
  ): Observable<AxiosResponse<any>> {
    return this.httpService.patch(this.envService.getProxyUrl(req.url), body, {
      headers: {
        'cookie': headers.cookie,
        'user-agent': headers['user-agent'],
        'content-type': headers['content-type'],
      },
    }).pipe(map(response => {
      console.log(`请求 ${req.url} 的响应：`, response.data);
      return response.data;
    }));
  }

  @Delete('*')
  proxyDelete(
    @Req() req: ExpressRequest,
    @Headers() headers: any,
  ): Observable<AxiosResponse<any>> {
    return this.httpService.delete(this.envService.getProxyUrl(req.url), {
      headers: {
        'cookie': headers.cookie,
        'user-agent': headers['user-agent'],
        'content-type': headers['content-type'],
      },
    }).pipe(map(response => {
      console.log(`请求 ${req.url} 的响应：`, response.data);
      return response.data;
    }));
  }
}
