import { useEffect, useState } from "react"
import { Categoria, Produto } from "../../@types/types"
import {  getRequestById, getRequestByName, getRequestList } from "../../services/requests"
import { SearchForm } from "./components/SearchForm"
import { ListProductContainer, ListProductTable } from "./styled"
import { Paper,Table,TableBody,TableHead,TableRow,TableCell,TableContainer,}from '@mui/material'

 interface ProdutoProps {
    _id: number;
    codigoDoProduto: string;
    nome: string;
    categoriaReferencia: string;
    categoriaProduto: string;
    marca: string;
}

 interface CategoriaProps {
    _id: string;
    nome: string;
    produtosRemessa: string;
    produtos:Produto[];
    qtdTotoalProdutosCategoria: number;
    qtdTiposProdutos: number;
    qtdTiposDeProdutosCategoria: number;
}


export   function ListProducts(){
   const [listProducts, setListProducts] =useState<ProdutoProps[]>([])
   const [listCategory, setListCategory] =useState<CategoriaProps[]>([])

   async function fetchListProducts(){
       const  response =  (await getRequestList('products/')).data
       console.log(response)
       setListProducts(response)
    } 


    
    async function fetchListCategory(){
        const  response =  (await getRequestList('inventoryCategory/')).data
        console.log(response)
        setListCategory(response)
    }
    
   async function  filterListProduct(query:string){
        if(query.length!){
         const productFilter=  (await getRequestByName('products/find/', query)).data
          setListProducts(productFilter)
          return
        }

          fetchListProducts()
     }
    

    useEffect(()=>{fetchListCategory(),fetchListProducts()},[])


        return (
                  <ListProductContainer>
                    <SearchForm filterListProduct={filterListProduct} />
                    <ListProductTable>

                   <tbody>{ 
                    listProducts.map(product =>{
                        return (
                            <tr key={product._id}>
                                <td>{product.codigoDoProduto}</td>
                                <td> {
                                      listCategory.find(categoria=>categoria._id===product.categoriaReferencia)?.nome                                    
                                    }</td>
                                <td>{product.nome}</td>  
                                <td>{product.marca}</td>  
                                  
                            </tr>
                        )
                        
                    })}
                </tbody>
                </ListProductTable>
               </ListProductContainer>

    )
}