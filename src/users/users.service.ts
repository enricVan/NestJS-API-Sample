import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'johndoe@gmail.com', role: 'ADMIN' },
    { id: 2, name: 'Jane Doe', email: 'janedoe@gmail.com', role: 'ENGINEER' },
    { id: 3, name: 'Jim Doe', email: 'jimdoe@gmail.com', role: 'INTERN' },
    { id: 4, name: 'Jill Doe', email: 'jilldoe@gmail.com', role: 'INTERN' },
    { id: 5, name: 'Jack Doe', email: 'jackdoe@gmail.com', role: 'ENGINEER' },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException(`No user with role ${role} found`);
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === +id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const newUser = { id: this.users.length + 1, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === +id);
    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
    return this.users[userIndex];
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== +id);

    return removedUser;
  }
}
