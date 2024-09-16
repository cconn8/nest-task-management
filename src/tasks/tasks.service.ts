import { Injectable } from '@nestjs/common';
import { Task , TaskStatus} from './tasks.model';
import { v4  as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getAllTasks() : Task [] { //create a method to read the tasks - this keeps the tasks array private to prevent it being access / mutated
        return this.tasks;
    }

    createTask(createTaskDto : CreateTaskDto) : Task {
        const { title, description } = createTaskDto;
        const task : Task = {
            id : uuid(),
            title : '',
            descrtipion : '',
            status : TaskStatus.OPEN
        };

        this.tasks.push(task);

        return task; //send back to controller
    }
}
