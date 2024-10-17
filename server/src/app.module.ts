import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HabitModule } from './habit/habit.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, HabitModule],
})
export class AppModule {}
