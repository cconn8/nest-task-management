export interface Task {
    id          : string;
    title       : string;
    descrtipion : string;
    status      : TaskStatus;
}


export enum TaskStatus {
    OPEN        = 'OPEN',
    IN_PROGRESS = 'IN',
    DONE        = 'DONE',
}