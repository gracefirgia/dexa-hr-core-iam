import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LoginDto } from './dto/login.dto';
import { Employee } from '../employees/employees.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Employee)
    private readonly employeeModel: typeof Employee,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.employeeModel.findOne({
      where: { email },
      include: [
        {
          association: 'role',
          attributes: ['name'],
        },
      ],
      raw: true,
    });

    if (!user) throw new NotFoundException('User not found');

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new UnauthorizedException('Invalid password');

    return {
      access_token: this.jwtService.sign({ name: user.name, id: user.id, email: user.email }),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user['role.name'],
      },
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
