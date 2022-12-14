import { Categoria } from "../@types/types"
import { api } from "./api" 


export async function getRequestList(endpoint: string) {
    return await api.get(endpoint)
}
export async function getRequestById(endpoint: string, id: string) {
    return await api.get(endpoint+"?id="+id)
}
export async function putRequestById(endpoint: string, id: string) {
    return await api.put(endpoint+"?id="+id)
}
export async function deleteRequestById(endpoint: string, id: string) {
    return await api.delete(endpoint+"?id="+id)
}



export async function postRequestUser(email: string, senha: string) {
    return await api.post('/users/', {
        "email": email,
        "password": senha
    })
}

export async function postRequestProduct(nome: string, codigoDoProduto: string, marca: string) {
    return await api.post('/products/', {
        "nome": nome,
        "codigoDoProduto": codigoDoProduto,
        "marca": marca,
        "categoriaReferencia": "6375efd34154183c6771b073"
    })
}

export async function postRequestCategory( nome: string) {
    return await api.post('/inventoryCategory/', {
        "nome": nome
    })
}

export async function postRequest(endpoint: string) {
    return await api.post(endpoint, {
    })
}