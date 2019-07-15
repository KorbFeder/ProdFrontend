export interface TrainingsPlan {
    id: number;
    phase: number;
    dayNr: number;
    muscle: string;
    exercise: string;
    amountOfSets: number;
    repetitions: number;
    pauseInbetween: number;
    startingWeight: number;
    repetitionsDone: number[];
    weightsUsed: number[];
}
