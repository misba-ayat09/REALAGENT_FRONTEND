import { Config } from "../../../config";
import { Slug } from "../../../services";


export interface AIEmailGenerationRequest {
    user_content: string;
}

export interface TemplateType{
    subject:string,
    body:string
}
export interface AIEmailGenerationResponse {
    templates: TemplateType[]
}

export const generateAIEmail = async (body: AIEmailGenerationRequest) => {
    try {
        // fetch()
        const url = Config.AI_EMAIL_AGENT + Slug.GENERATE_AI_EMAIL
        const response = await fetch(url, {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify(body),
        })
        const data:AIEmailGenerationResponse = await response.json();
        return data 
    } catch (error) {
        console.log(error);
    }
}