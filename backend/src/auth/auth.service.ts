import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any | null> {
	  console.log("hey");
    const user = await this.usersService.findOne(username);

    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }


  async signup(username: string, password: string): Promise<{ access_token: string }> {
	  console.log( "service : ",username,password);
    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    const existingUser = await this.usersService.findOne(username);
    if (existingUser) {
		console.log(existingUser);
    	const payload = { username: existingUser.username, sub: existingUser.id };
    	return {
    	  access_token: this.jwtService.sign(payload),
    	};
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await this.usersService.create({
      username,
      password: hashedPassword,
    });

    const payload = { username: newUser.username, sub: newUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

