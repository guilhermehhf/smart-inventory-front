import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Grid, Typography } from '@mui/material';

export default function CheckboxLabels(props: { list: Array<any>, handleChange: any }) {


   return (
      <div>
         <FormGroup>
            <Typography sx={{ mt: 3, mb: 2 }}>Tipos</Typography>
            {
               props.list.map((tipo, index) => (
                  <FormControlLabel
                     key={index}
                     control={
                        <Checkbox checked={tipo.checked} onChange={props.handleChange(index)} name={tipo.checkName.toLowerCase()} />
                     }
                     label={tipo.checkName}
                  />
               ))
            }
         </FormGroup>


      </div>

   );
}