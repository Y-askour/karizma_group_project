import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { LoggerMiddleware } from './common/utils/logger';

@Module({
  imports:
	  [
	  	AuthModule,
	  	PrismaModule,
	  	PassportModule.register({
			secret: process.env.secret,
			signOptins: {expriresin: "1h"}
		}),
  ],
})

export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
