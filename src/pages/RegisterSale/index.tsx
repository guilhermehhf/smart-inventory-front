import React, { useState } from "react";
import { Campo } from "../../components/campo";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { getRequest } from "../../services/requests.js";
import { Regex } from "../../utils/regex.js";
import { SnackAlert } from "../../components/alert";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { PartialSale } from "../../components/PartialSale";
import { SelectChangeEvent } from "@mui/material/Select";
import { postRequestSale } from "../../services/requests";

const regex2 = new Regex();
interface PartialSales {
  refDaRemessa: string;
  qtdVendida: number;
  valorCompraProdutoUnit?: number;
}


interface Sale{
  comprador: string;
  data: Date;
  partialsales: PartialSales[]
}

export function RegisterSale() {
  var today = new Date();
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(today.getDay()+"/"+today.getMonth()+"/"+today.getFullYear())
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };


  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState({
    message: "",
    type: "",
  });
  const [sale, setSale] = useState<Sale>({
    comprador: "",
    data: new Date,
    partialsales: [{ refDaRemessa: "", qtdVendida: 0, valorCompraProdutoUnit: 0 }]
  });

  function onChange(ev: React.FormEvent<HTMLInputElement>) {
    let { id, value } = ev.currentTarget;
    
    setSale({ ...sale, [id]: value });
    console.log(sale);
  }

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    console.log(sale);

    
    postRequestSale(sale.comprador, sale.data, sale.partialsales)
        .then((response) => {
          console.log("Venda: ", response.data);
          setSnack({ message: 'Venda adicionada com sucesso!', type: 'success' })
        })
        .catch((error) =>{
          setSnack({ message: 'Houve um erro com o banco de dados e a venda não foi adicionada!', type: 'error' })
          console.log(error)
        } );

    setOpen(true);
  }
    


// ################ ################ ################ ################ ################

  const [inputFields, setInputFields] = useState<PartialSales[]>([
    { refDaRemessa: "", qtdVendida: 0, valorCompraProdutoUnit: 0 },
  ]);

  const handleFormChange = (
    index: number,
    event: React.FormEvent<HTMLInputElement>
  ) => {
    let { id, value } = event.currentTarget;
    let data = [...sale.partialsales] as any

    data[index][id] = value;
    setSale({...sale, ['partialsales']: data})
    console.log(index, id, value);
  };

  const onChangeShipment = (index: number,event: SelectChangeEvent) => {
    let { value } = event.target;
    let data = [...sale.partialsales] as any

    data[index]['refDaRemessa'] = value;
    setSale({...sale, ['partialsales']: data})
  };

  const addFields = () => {
    console.log("tentando adicionar fields");
    let newfield = { refDaRemessa: "", qtdVendida: 0, valorCompraProdutoUnit: 0 };
    
    setSale({...sale, ['partialsales']: [...sale.partialsales, newfield]});
    console.log(sale)
    
  };

  const removeFields = (index: number) => {
    console.log(index);

    let data = [...sale.partialsales] as any
    data.splice(index, 1);
    setSale({...sale, ['partialsales']: data})
  };


 // ################ ################ ################ ################ ################ ################ ################




  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          placeContent: "center",
          alignItems: "center",
          padding: "40px",
          border: 1.5,
          borderRadius: 4,
          borderColor: "#80EACA",
          bgcolor: "#fff",
        }}
      >
        <Typography variant="h5">Registrar Venda</Typography>
        <Box
          onSubmit={onSubmit}
          component="form"
          sx={{ mt: 1 }}
          noValidate
          autoComplete="off"
        >
          <Campo text="Comprador" onChange={onChange} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                label="Date"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} fullWidth required margin="normal"/>}
                
            />
          </LocalizationProvider>
          
        <PartialSale handleFormChange = {handleFormChange} onChangeShipment={onChangeShipment} addFields={addFields} removeFields={removeFields} inputFields={sale.partialsales}/>
          
          <Button
            sx={{ mt: 3, mb: 2 }}
            variant="contained"
            type="submit"
            fullWidth
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
      <SnackAlert
        open={open}
        setOpen={setOpen}
        message={snack.message}
        type={snack.type}
      />
    </Container>
  );
}
