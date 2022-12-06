import React, { useEffect, useState } from "react";
import { Campo } from "../../components/campo";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getRequestList, postRequestShipment } from "../../services/requests.js";
import { Regex } from "../../utils/regex.js";
import { SnackAlert } from "../../components/alert";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { InputLabel, Select, SelectChangeEvent, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Categoria, Produto } from "../../@types/types";
import { SelectLabelsCategory } from "../../components/SelectItemCategory";
import { SelectLabelsProduct } from "../../components/SelectItemProduct";

const regex2 = new Regex();

export function RegisterShipment() {
  var today = new Date();
  const [open, setOpen] = useState(false);

  const [snack, setSnack] = useState({
    message: "",
    type: "",
  });

  const [campos, setCampos] = useState({
    preço: 0,
    produto: '',
    quantidadecomprada: 0,
    quantidadeatual: 0,
    data: new Date()
    
  });

  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(today.getDay()+"/"+today.getMonth()+"/"+today.getFullYear())
  );
  

  // useEffect(() => {
  //   async function apiCalls() {
  //     getRequestList(`/inventoryCategory/`)
  //       .then((response) => {
  //         console.log("categorias: ", response.data);
  //         setCategorias(response.data);
  //       })
  //       .catch((error) => console.log(error));
  //   }
  //   apiCalls();
    
  // }, []);



  // let categoriaInput = ''
  // let categoriaPosMatch=[];
  // useEffect(() => {
  //   if(categorias){
  //     for(let i=0; categorias.length>i;i++){
  //       let res = categorias[i].nome.startsWith(categoriaInput)
  //       if(res){
  //           categoriaPosMatch.push(i);
  //       }
  //     }
  //   }
  // }, [categoriaInput]);



  // let productInput = ''
  // let productPosMatch=[];
  // useEffect(() => {
  //   if(categorias){
  //     for(let i=0; categorias.length>i;i++){
  //       let res = categorias[i].nome.startsWith(productInput)
  //       if(res){
  //         productPosMatch.push(i);
  //       }
  //     }
  //   }
  // }, [productInput]);





  
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  function onChangeProduto(ev: SelectChangeEvent) {
    console.log(ev.target.value)
    setCampos({ ...campos, ['produto']: ev.target.value })
  }

  function onChange(ev: React.FormEvent<HTMLInputElement>) {
    let { id, value } = ev.currentTarget;
    
    setCampos({ ...campos, [id]: value });
    console.log(campos);
  }

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {

    ev.preventDefault();
    console.log(campos);

    const produtoTest = campos.produto != ''
    const preçoTest = campos["preço"] > 0;
    const quantidadeCompradaTest = campos["quantidadecomprada"] > 0;
    const quantidadeAtualTest = campos["quantidadeatual"] >= campos["quantidadecomprada"];

    if (produtoTest && preçoTest && quantidadeCompradaTest && quantidadeAtualTest) {
      postRequestShipment(campos.produto, campos.quantidadecomprada, campos.quantidadeatual, campos.data, campos["preço"])
         .then((response) => {
           console.log("Remessa: ", response.data);
           setSnack({ message: 'Remessa adicionada com sucesso!', type: 'success' })
           
         })
         .catch((error) =>{
           setSnack({ message: 'Houve um erro com o banco de dados e o Remessa não foi adicionada!', type: 'error' })
           console.log(error)
         } );
    } else {
        setSnack({ message: 'Todos os campos precisam ser preenchidos', type: 'error' })
    }
    setOpen(true);
  }

  return (
    <Container
      component="main"
      maxWidth="sm"
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
        <Typography variant="h5">Register Shipment</Typography>
        <Box
          onSubmit={onSubmit}
          component="form"
          sx={{ mt: 1, width: '100%'}}
          noValidate
          autoComplete="off"
        >
          <SelectLabelsProduct endpoint='/products/' label='Produtos' onChange={onChangeProduto}></SelectLabelsProduct>
          <Campo text="Preço" onChange={onChange} type="number"/>
          <Campo text="Quantidade Comprada" onChange={onChange} type="number"/>
          <Campo text="Quantidade Atual" onChange={onChange} type="number"/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                label="Date"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} fullWidth required margin="normal"/>}
            />
          </LocalizationProvider>
          <Button
            sx={{ mt: 3, mb: 2 }}
            variant="contained"
            type="submit"
            fullWidth
          >
            Register
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
