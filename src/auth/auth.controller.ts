import { Controller, Post, Body, Res, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.gurad';
import { UpdatePasswordDto } from './dto/update-password';
import { User } from 'src/common/decorators/user.decorator';
import { FirebaseAdminService } from 'src/firebase_admin/firebase_admin.service';
import { EmployeeTokenService } from 'src/employee_token/employee_token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly firebaseAdminService: FirebaseAdminService,
    private readonly employeeTokenService: EmployeeTokenService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, user } = await this.authService.login(loginDto);

    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });

    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(
    @Body() updateDto: UpdatePasswordDto,
    @User('id') userId: string,
    @User('name') name: string
  ) {
    const request = await this.authService.updatePassword(userId, updateDto);
    if (request) {
      const tokens = await this.employeeTokenService.findAll()

      const notificationPromises = tokens.map((t) =>
        this.firebaseAdminService.sendNotification(
          t.fcm_token,
          'User Password Changed',
          `Employee ${name} has successfully changed their password!`
        ),
      );
      await Promise.all(notificationPromises);
    }
    return this.authService.updatePassword(userId, updateDto);
  }
}
