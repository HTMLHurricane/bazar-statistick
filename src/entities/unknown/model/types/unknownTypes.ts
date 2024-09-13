import { IParams } from '@/shared/types/types';

export interface UnknownSchema extends IParams {}

export interface UnknownCars {
    unknown_num: string;
    attend_date: string;
    attend_time: string;
    image_url: string;
}

export interface UnknownResponse {
    unknown_cars: UnknownCars[];
    total_attendance: number;
}
