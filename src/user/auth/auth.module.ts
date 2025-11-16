import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SignOptions } from 'jsonwebtoken';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret || secret.trim().length === 0) {
          throw new Error('JWT_SECRET não definido. Configure no .env');
        }

        const expiresEnv = configService.get<string>('JWT_EXPIRES_IN') ?? '1d';
        let expiresIn: SignOptions['expiresIn'];

        if (/^\d+$/.test(expiresEnv)) {
          expiresIn = Number(expiresEnv);
        } else {
          // Aqui fazemos cast seguro para StringValue
          expiresIn = expiresEnv as SignOptions['expiresIn'];
        }

        return {
          secret,
          signOptions: { expiresIn },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
