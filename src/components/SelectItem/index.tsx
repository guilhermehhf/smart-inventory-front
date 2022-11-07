import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { getRequest } from '../../services/requests';
import { Categoria } from '../../@types/types';

export function SelectLabels(props: { endpoint:string , label:string, onChange: any }) {
   //Atualizar com o banco posteriormente
   const [data, setData] = useState<Categoria[]>();

   useEffect(() => {
      async function apiCalls() {
        getRequest(`${props.endpoint}`)
          .then((response) => {
            console.log("categorias: ", response.data);
            setData(response.data);
          })
          .catch((error) => console.log(error));
      }
      apiCalls();
    }, []);

   return (
      <>
         <FormControl
            margin="normal"
            fullWidth
            required
         >
            <InputLabel id="Label">{props.label}</InputLabel>
            {data &&(
            <Select
               labelId="obra"
               id="obraSelect"
               label="Obra"
               onChange={props.onChange}
            >
               {
                  data.map(element=>(
                     <MenuItem value={element.nome}>{element.nome}</MenuItem>
                  ))
               }
            </Select>
            )}
         </FormControl>
      </>
   );
}