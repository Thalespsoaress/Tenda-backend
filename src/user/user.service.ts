import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    // email ou phone já usados?
    const exists = await this.repo.findOne({
      where: [{ email: dto.email }, { phone: dto.phone }],
    });
    if (exists) throw new ConflictException('Email ou telefone já em uso');

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hash = await bcrypt.hash(dto.password, saltRounds);

    const user = this.repo.create({
      name: dto.name,
      email: dto.email,
      password: hash,
      phone: dto.phone,
      dateOfBirth: new Date(dto.dateOfBirth),
      role: dto.role ?? 'client',
    });

    const saved = await this.repo.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safe } = saved;
    return safe;
  }

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<User> {
    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        id,
      );
    if (!isUUID) throw new NotFoundException('ID inválido');

    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async remove(id: string): Promise<{ message: string }> {
    const res = await this.repo.delete(id);
    if (!res.affected) throw new NotFoundException('Usuário não encontrado');
    return { message: 'Usuário removido com sucesso' };
  }

  async findOneByEmailWithPassword(email: string): Promise<User | null> {
    const user = await this.repo.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });

    return user;
  }
}
