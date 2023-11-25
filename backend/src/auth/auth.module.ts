import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './strategy'; 
import { JwtStrategy } from './jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RecipesService } from 'src/recipes/recipes.service';


@Module({
  imports: [
    PassportModule,
	PassportModule.register({
		secret: process.env.secret,
		signOptins: {expriresin: "1h"}
	}),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAuthGuard,
    LocalAuthGuard,
    LocalStrategy,    JwtStrategy,
    UsersService,
	RecipesService
  ],
})
export class AuthModule {}
