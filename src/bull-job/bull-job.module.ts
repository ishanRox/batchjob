import { Module } from '@nestjs/common';
import { BullJobService } from './bull-job.service';

@Module({
  providers: [BullJobService]
})
export class BullJobModule {}
