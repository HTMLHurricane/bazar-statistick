import { IParams } from '@/shared/types/types';

export interface MainShema extends IParams {
    filter: IFilter;
    isModalVisible: boolean;
}

export type IFilter = 'day' | 'week' | 'month';

export interface GeneralData {
    attend_id: number;
    car_number: string;
    attend_date: string;
    attend_time: string;
    image_url: string;
}

export interface Top10Data extends GeneralData {
    attend_count: number;
}

export interface GraphicData {
    time?: string;
    weekday?: string;
    day?: string;
    count: number;
}

export interface AllCars {
    attend_id: number;
    car_number: string;
    attend_date: string;
    attend_time: string;
    image_url: string;
    attend_count: number;
}

export interface AttendanceResponse {
    general: GeneralData[];
    top10: Top10Data[];
    total_cars: number;
    general_count: number,
    graphic: GraphicData[];
}
