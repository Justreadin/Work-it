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

export interface PersonalInfoProp{
    firstname: string,
    surnname: string,
    number: string,
    country: string,
    city: string,
    dateOfBirth:string,
    gender: string,
    address:string,
    state: string,
    localGoverment: string
}

export interface ProviderProp{
    children: ReactNode
}

export type EduErrorProp = Record <keyof EduProp, string|boolean>

export interface FillProp{
    education: boolean,
    personalInfor: boolean,
    interest: boolean
}

export interface LoginDataProp{
    mail: string,
    password: string
}
