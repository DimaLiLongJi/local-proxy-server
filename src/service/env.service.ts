import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as projectConfig from '../../project.config.json';

@Injectable()
export class EnvService {
  getProxyUrl(reqUrl: string): string {
    let proxyUrl = null;
    let findUrl = null;

    projectConfig.server.proxy.forEach((uri) => {
      if (reqUrl.indexOf(uri.baseUrl) === 0) {
        findUrl = uri;
      }
    });

    if (!findUrl) {
      throw new HttpException({
        status: HttpStatus.EXPECTATION_FAILED,
        error: '请去 project.config.json 的 server.proxy 配置下代理',
      }, 404);
    }

    proxyUrl = reqUrl.match(`^${findUrl.baseUrl}/(.*)`)[1];
    console.log('本地代理地址：', reqUrl, proxyUrl);
    console.log('代理目标地址：', `${findUrl.target}/${proxyUrl}`);
    return `${findUrl.target}/${proxyUrl}`;
  }
}
