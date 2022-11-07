import { Categoria } from "../@types/types"
import { api } from "./api" 

export async function getRequest(endpoint: string) {
    return await api.get(endpoint, {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        }
    })
}

export async function postRequestCategory(endpoint: string, nome: string) {
    return await api.post(endpoint, {
        data: nome,
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        }
    })
}

export async function postRequest(endpoint: string) {
    return await api.post(endpoint, {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        }
    })
}