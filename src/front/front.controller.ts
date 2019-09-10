import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import * as projectConfig from '../../project.config.json';

@Controller(projectConfig.front.router.baseUrl)
export class FrontController {

  @Get('*')
  @Render('index')
  pageGet(@Req() req: ExpressRequest): {
    path: string,
  } {
    const reg = new RegExp(`^${projectConfig.front.router.baseUrl}\/([^\/]+)[^\/]*`);
    console.log(77777, reg);
    const path = req.url.match(reg)[1];
    console.log('访问到的页面路径', req.url, path);
    return {
      path,
    };
  }
}
