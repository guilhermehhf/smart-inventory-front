import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { getRequestList } from '../../services/requests';
import { Produto } from '../../@types/types';

export function SelectLabelsProduct(props: { endpoint:string , label:string, onChange: any }) {

   const ITEM_HEIGHT = 48;
   const ITEM_PADDING_TOP = 8;
   const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
   id: 'produto'
   };

   
   const [data, setData] = useState<Produto[]>();
   useEffect(() => {
      async function apiCalls() {
        getRequestList(`${props.endpoint}`)
          .then((response) => {
            console.log("produtos: ", response.data);
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
            <Select
               defaultValue=""
               labelId={props.label}
               id={props.label+'Select'}
               label={props.label}
               onChange={props.onChange}
               MenuProps={MenuProps}
            >
               <MenuItem disabled value="">
                  <em>Produto</em>
               </MenuItem>
               {data && (
                  data.map(element=>(
                     <MenuItem key={element._id}value={element._id}>{element.nome}</MenuItem>
                  ))
               )}
            </Select>
         </FormControl>
      
         
      </>
   );
}