export interface TodoInterface {
    id?: number;
    isDone: number;
    todoMsg: string;
    importance: number;
    endDate?: Date;
    details?: string;
    imgUrl?: string;
}
