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

export async function getRequestUser(endpoint: string) {
    return await api.get(endpoint)
}

export async function postRequestUser(email: string, senha: string) {
    return await api.post('/users/', {
        "email": email,
        "password": senha
    })
}

export async function postRequestProduct(nome: string, codigoDoProduto: string, marca: string, categoriaId: string) {
    return await api.post('/products/', {
        "nome": nome,
        "codigoDoProduto": codigoDoProduto,
        "marca": marca,
        "categoriaReferencia": categoriaId
    })
}

export async function postRequestCategory( nome: string) {
    return await api.post('/inventoryCategory/', {
        "nome": nome
    })
}

export async function postRequestShipment( produto_id: string, qtdComprada: number, qtdAtual: number, data: Date, precoUnid: number) {
    return await api.post('/shipment/', {
        "refProduto": produto_id,
        "qtdComprada": qtdComprada,
        "qtdAtual": qtdAtual,
        "dataAquisicao": data,
        "precoUnit": precoUnid,
    })
}
export async function postRequestSale( comprador: string,  data: Date, vendaParciais: any[]) {
    console.log(comprador,data,vendaParciais)
    return await api.post('/sales/', {
        "comprador": comprador,
        "dataVenda": data,
        "vendas": vendaParciais
    })
}

export async function postRequest(endpoint: string) {
    return await api.post(endpoint, {
    })
}

export async function getRequestByName(endpoint: string,query:string) {
    return await api.get(endpoint+query)
}

