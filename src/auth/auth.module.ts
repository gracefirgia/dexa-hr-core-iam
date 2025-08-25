import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from '../employees/employees.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { EmployeeToken } from 'src/employee_token/employee_token.model';
import { FirebaseAdminService } from 'src/firebase_admin/firebase_admin.service';
import { EmployeeTokenService } from 'src/employee_token/employee_token.service';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([Employee, EmployeeToken]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, FirebaseAdminService, EmployeeTokenService],
})
export class AuthModule {}
