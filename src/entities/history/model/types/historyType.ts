import { GeneralData, Top10Data } from '@/entities/main'

export interface HistorySchema {
    date: string | null;
    dateMonth: string | null;
}


export interface HistoryDataResponse {
    id: number;
    top10: Top10Data[];
    general_count: number;
    overall_count: number;
    date: string;
    general: GeneralData[];
    general_attendances_count: number | null;
    created_at?: string;
    updated_at?: string;
}
