import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function SelectLabels(props: { list:Array<string>, label:string, onChange: any }) {
   //Atualizar com o banco posteriormente
   return (
      <div>
         <FormControl
            margin="normal"
            fullWidth
            required
         >
            <InputLabel id="obraLabel">{props.label}</InputLabel>
            <Select
               labelId="obra"
               id="obraSelect"
               label="Obra"
               onChange={props.onChange}
            >
               {
                  props.list.map(element=>(
                     <MenuItem value={element}>{element}</MenuItem>
                  ))
               }
            </Select>
         </FormControl>
      </div>
   );
}