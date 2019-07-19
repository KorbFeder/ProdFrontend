export interface TodoInterface {
    id?: number;
    isDone: boolean;
    todoMsg: string;
    importance: number;
    endDate?: Date;
    details?: string;
    imgUrl?: string;
}
