import { Body, Controller, Delete, Get, Param, Post, Patch, Query} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';


@Controller('/tasks')
export class TasksController {
    constructor(private tasksService : TasksService) {}

    @Get()
    getTasks(@Query() filterDto : GetTasksFilterDto) : Task[] {
        //If filters defined, search for filtered tasks
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        }
        //otherwise, return all tasks
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id : string) : Task {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    createTask( @Body() createTaskDto : CreateTaskDto) : Task {
        return this.tasksService.createTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id : string) : string {
        return this.tasksService.deleteTaskById(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id : string,
        @Body('status') status : TaskStatus,
    ): Task {

        return this.tasksService.updateTaskStatus(id, status);

    }

}
