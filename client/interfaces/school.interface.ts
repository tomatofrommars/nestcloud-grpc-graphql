export interface School {
    id: number;
    name: string;
}

export interface GetSchoolRequest {
    id: number;
}

export interface GetSchoolResponse {
    school: School;
}

export interface RenameResponse {
    result: string;
}
