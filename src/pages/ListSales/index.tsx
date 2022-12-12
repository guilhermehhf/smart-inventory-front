import { useEffect, useState } from "react"
import { getRequestByName, getRequestList } from "../../services/requests"
import { dateFormatter, priceFormatter } from "../../utils/formatter"
import { SearchForm } from "../ListProducts/components/SearchForm"
import { ListProductContainer, ListProductTable } from "../ListProducts/styled"
import {Venda}from './../../@types/types.d'


export  function ListSales(){
    const [listSales, setListSales] =useState<Venda[]>([])
    
    
   async function fetchListSales(){
    const  response =  (await getRequestList('sales/')).data
    setListSales(response)
 } 
 

 async function  filterListSales(query:string){
    if(query.length!){
     const productFilter=  (await getRequestByName('sales/find/', query)).data
     setListSales(productFilter)
      return
    }

    fetchListSales()
 }

    
    useEffect(()=>{
        fetchListSales()
   },[])

    return(
        <ListProductContainer>
        <SearchForm filterListProduct={filterListSales} />
        <ListProductTable>

       <tbody>{ 
        listSales.map(sale =>{
            return (
                <tr key={sale._id}>
                    <td>{sale.comprador}</td>
                    
                          
                    <td>{ dateFormatter.format( new Date ( sale.dataVenda))}</td>  
                    {/* { sale.vendasParciais.map((venda ) =>{ venda.})} */}
                    {/* <td>{"quant: "} { sale.vendasParciais[0].qtdVendida}</td>  
                    <td>{ priceFormatter.format( sale.vendasParciais[0].valorCompraProdutoUnit.$numberDecimal) }</td>  */}
                      
                </tr>
            )
            
        })}
    </tbody>
    </ListProductTable>
   </ListProductContainer>
    )
}