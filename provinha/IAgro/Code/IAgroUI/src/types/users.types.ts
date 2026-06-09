import type { BaseModel } from "./base.types";

export type UserRole = "Reader" | "Manager" | "Admin";

export interface Company extends BaseModel {
    name: string;
    cnpj: string;
    country: string;
    users: Omit<User, "company">;
}

export interface CompanyCreation extends Omit<Company, keyof BaseModel | "users"> {}

export interface User extends BaseModel {
    company: Company;
    role: UserRole;
    email: string;
}

export interface UserCreation {
    email: string;
    password: string;
    companyId: string;
}