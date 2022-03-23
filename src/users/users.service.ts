import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { bcryptCompare, bcryptPassword } from './bcrypt/bcrypt';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exist = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (exist) throw new ConflictException('User already exist');
    createUserDto.password = await bcryptPassword(createUserDto.password);
    const user = await this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async loginUser(login: LoginUserDto) {
    const user = await this.usersRepository.findOne({
      where: { email: login.email },
    });
    if (!user) throw new ConflictException('User does not exist');
    const compare = await bcryptCompare(login.password, user.password);
    if (!compare) throw new ConflictException('Password is incorrect');
    const { password, ...result } = user;
    return result;
  }

  async findAll() {
    const users = await this.usersRepository.find({
      relations: ['role'],
    });
    return users.map((user) => {
      const { password, ...result } = user;
      return result;
    });
  }

  async findByDirectory() {
    const users = await this.usersRepository.find({
      where: {
        role: 5,
      },
      relations: ['role'],
    });
    return users.map((user) => {
      const { password, ...result } = user;
      return result;
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new ConflictException('User does not exist');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new ConflictException('User does not exist');
    await this.usersRepository.update(id, updateUserDto);
    return 'User updated successfully';
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new ConflictException('User does not exist');
    await this.usersRepository.remove(user);
    return 'User removed successfully';
  }
}
