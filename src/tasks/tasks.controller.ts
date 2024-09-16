import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService) {}

    @Get()
    getAllTasks() : Task[] {  // get all tasks returns (:) type of Task array ([])
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask( @Body() createTaskDto : CreateTaskDto) : Task {
        return this.tasksService.createTask(createTaskDto)
    }

}
