import type { BaseModel } from "./base.types";

export interface LocationPoint {
    latitude: number; 
    longitude: number;
}

export interface Field extends BaseModel {
    nickname: string;
    crop: string;
    area: number;
    locationPoints: LocationPoint[];
}

export interface FieldCreation extends Omit<Field, keyof BaseModel> {
    companyId: string;
}
