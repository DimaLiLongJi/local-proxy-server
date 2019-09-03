import { Module, HttpModule } from '@nestjs/common';
import { ApiController } from './api.controller';
import { EnvService } from '../service/env.service';

@Module({
  imports: [HttpModule],
  providers: [EnvService],
  controllers: [ApiController]
})
export class ApiModule { }
