import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request as ExpressRequest } from 'express'

@Controller('page')
export class PageController {

  @Get('*')
  @Render('index')
  pageGet(
    @Req() req: ExpressRequest,
  ): Object {
    const path = req.url.match(/^\/page\/([^\/]+)[^\/]*/)[1];
    console.log('访问到的页面路径', req.url, path);
    return {
      path
    };
  }
}
