import { Logger, ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import {
    FastifyAdapter,
    NestFastifyApplication,
} from "@nestjs/platform-fastify"

import { AppModule } from "./app.module"
import { corsConfig } from "./config/cors.config"

const DEFAULT_PORT = 3000

async function bootstrap() {
    const port = process.env.PORT ?? DEFAULT_PORT
    const logger = new Logger("Main")

    const adapter = new FastifyAdapter()
    adapter.enableCors(corsConfig)
    logger.log("CORS is enabled.")

    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        adapter
    )
    app.useGlobalPipes(new ValidationPipe())

    logger.log(`Listening on port ${port}.`)
    await app.listen(3000, "0.0.0.0")
}
bootstrap()
