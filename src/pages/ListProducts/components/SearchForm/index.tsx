import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styled";

interface SearchFormProps{
    filterListProduct:(query:string)=>void
}

export function SearchForm({filterListProduct}:SearchFormProps) {

    const {register,handleSubmit,formState:{isSubmitting}}=useForm()
    function  handleSearchForm(data){
        filterListProduct(data.query)
    }


        return(
            <SearchFormContainer onSubmit={handleSubmit(handleSearchForm)} >
                <input type="text" placeholder="Busque por Produto" 
                {...register('query')}/>

                <button type="submit">
                        <MagnifyingGlass size={20} />
                        Buscar
                </button>
            </SearchFormContainer>
        )
}