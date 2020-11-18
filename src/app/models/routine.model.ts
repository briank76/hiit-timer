export interface Routine {
    id:          number;
    title:       string;
    step:        number;
    repeat:      number;
    isCompleted: boolean;
    workout:     Workout[];
}

export interface Workout {
    title: string;
    time:  number;
    step: number;
}
