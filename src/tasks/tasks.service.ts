import { Injectable } from '@nestjs/common';
import { Task , TaskStatus} from './tasks.model';
import { v4  as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { title } from 'process';

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getAllTasks() : Task [] { //create a method to read the tasks - this keeps the tasks array private to prevent it being access / mutated
        return this.tasks;
    }

    getTaskById(id : string) : Task {
        return this.tasks.find((task) => task.id === id)
    }

    createTask(createTaskDto : CreateTaskDto) : Task {
        const { title, description } = createTaskDto;

        const task : Task = {
            id : uuid(),
            title : title,
            descrtipion : description,
            status : TaskStatus.OPEN
        };

        this.tasks.push(task);

        return task; //send back to controller
    }

    deleteTaskById(id : string) : string {
        this.tasks = this.tasks.filter((task) => task.id !== id)
        return "item deleted!"

    }

    updateTaskStatus(id : string, status : TaskStatus)  {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }


    //get body paramters
    //check for matches
    getTasksWithFilters(getTasksFilterDto : GetTasksFilterDto) : Task []{
        
        const { status, search } = getTasksFilterDto;
        let tasks = this.getAllTasks();

        if(status) {
            tasks = tasks.filter((task) => task.status === status)
        }

        if(search) {
            tasks = tasks.filter((task) => {
                const titleMatches = task.title?.toLowerCase().includes(search.toLowerCase());
                const descriptionMatches = task.descrtipion?.toLowerCase().includes(search.toLowerCase());
                
                return titleMatches || descriptionMatches;
            });
        }

        return tasks
    }

}
