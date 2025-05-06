import { ReactNode } from "react"
export interface EduProp{
    highestDegree:  string,
    nameOfSchool:  string,
    startDate: string,
    endDate:  string,
    schooling: boolean,
    schoolState:  string,
    schoolCountry:  string,
}

export type PersonalInfoProp = {
    firstname: string;
    surname: string;
    number: string;
    email?: string;  // Add email here
    country: string;
    city: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    state: string;
    localGovernment: string;  // Note the spelling here
  };
  

export interface ProviderProp{
    children: ReactNode
}

export type EduErrorProp = Record <keyof EduProp, string|boolean>

export interface FillProp{
    education: boolean,
    personalInfor: boolean,
    interest: boolean
}