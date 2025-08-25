import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from './roles/roles.module';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeesModule } from './employees/employees.module';
import { EmployeeDetailsModule } from './employee_details/employee_details.module';
import { AuthModule } from './auth/auth.module';
import { AttendancesModule } from './attendances/attendances.module';
import { DataChangeRequestsModule } from './data_change_requests/data_change_requests.module';
import { FirebaseAdminService } from './firebase_admin/firebase_admin.service';
import { EmployeeTokenModule } from './employee_token/employee_token.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadModels: true,
        synchronize: false,
        logging: false,
      }),
    }),
    RolesModule,
    DepartmentsModule,
    EmployeesModule,
    EmployeeDetailsModule,
    AuthModule,
    AttendancesModule,
    DataChangeRequestsModule,
    EmployeeTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAdminService],
})
export class AppModule {}
