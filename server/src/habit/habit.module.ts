import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { HabitController } from "./habit.controller";
import { HabitService } from "./habit.service";

@Module({
    providers: [PrismaService, HabitService],
    controllers: [HabitController]
})
export class HabitModule {}
