import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: Repository<Task>) { }

  async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create(createTaskDto);
    await this.tasksRepository.save(createTaskDto);
    return task;
  }

  async findAll() {
    return this.tasksRepository.find();
  }

  async findOne(id: number) {
    const task = this.tasksRepository.findOne(id);
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.tasksRepository.update({ id }, updateTaskDto);
    return this.tasksRepository.find(id);
  }

  async remove(id: number) {
    await this.tasksRepository.delete({ id });
    return { deleted: true };
  }
}
