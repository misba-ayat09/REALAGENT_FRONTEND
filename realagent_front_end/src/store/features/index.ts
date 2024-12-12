import { PATH_AUTH } from "../../router/route";

export interface HasStatusCode{
   statusCode: number;
}

export interface HasStatusText{ 
    status:"SUCCCESS" | "NOT_SUCCESS";
}

 

export interface HasIdentitySignatures {
    updatedAt: string,
    createdAt:string,
    version: number,
    __v: number
}

export interface HasId {
    _id: string
}

const currentPath = window.location.pathname.toLocaleLowerCase()
const errorAlertRestrictedRoutes = [PATH_AUTH.signIn, PATH_AUTH.signUp]  
export const isErrorAlertPermitted = !errorAlertRestrictedRoutes.map(path => path.toLocaleLowerCase()).includes(currentPath) && location.pathname !== '/' 