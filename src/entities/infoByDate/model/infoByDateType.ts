export interface CarsInfoByNumImage {
    time: string;
    image: string;
}

export interface InfoByDateResponse {
    cars: CarsInfoByNumImage [],
    overall_count: number
}