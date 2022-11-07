import React, { useEffect, useState } from "react";
import { Campo } from "../../components/campo";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getRequest } from "../../services/requests.js";
import { Regex } from "../../utils/regex.js";
import { SnackAlert } from "../../components/alert";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Categoria } from "../../@types/types";

const regex2 = new Regex();

export function RegisterShipment() {
  var today = new Date();
  const [categorias, setCategorias] = useState<Categoria[]>()
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState({
    message: "",
    type: "",
  });
  const [campos, setCampos] = useState({
    name: "",
    quantity: 0,
    type: "",
  });
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(today.getDay()+"/"+today.getMonth()+"/"+today.getFullYear())
  );
  


  


  useEffect(() => {
    async function apiCalls() {
      getRequest(`/inventoryCategory/`)
        .then((response) => {
          console.log("categorias: ", response.data);
          setCategorias(response.data);
        })
        .catch((error) => console.log(error));
    }
    apiCalls();
    
  }, []);


  let categoriaInput = ''
  let categoriaPosMatch=[];
  useEffect(() => {
    if(categorias){
      for(let i=0; categorias.length>i;i++){
        let res = categorias[i].nome.startsWith(categoriaInput)
        if(res){
            categoriaPosMatch.push(i);
        }
      }
    }
  }, [categoriaInput]);

  
  let productInput = ''
  let productPosMatch=[];
  useEffect(() => {
    if(categorias){
      for(let i=0; categorias.length>i;i++){
        let res = categorias[i].nome.startsWith(productInput)
        if(res){
          productPosMatch.push(i);
        }
      }
    }
  }, [productInput]);



  

  
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  function onChange(ev: React.FormEvent<HTMLInputElement>) {
    let { id, value } = ev.currentTarget;
    
    setCampos({ ...campos, [id]: value });
    console.log(campos);
  }

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    console.log(campos);
    const nameTest = regex2.minMaxTest(4, 25, campos["name"]);
    const quantityTest = campos["quantity"];
    const typeTest = regex2.minMaxTest(4, 25, campos["type"]);

    if (nameTest && quantityTest != 0 && typeTest) {
      setSnack({ message: "Produto adicionado com sucesso!", type: "success" });
    } else {
      setSnack({
        message: "Todos os campos precisam ser preenchidos",
        type: "error",
      });
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
        <Typography variant="h5">Register Transaction</Typography>
        <Box
          onSubmit={onSubmit}
          component="form"
          sx={{ mt: 1 }}
          noValidate
          autoComplete="off"
        >
          <Campo text="Name" onChange={onChange} />
          <Campo text="Type" onChange={onChange} />

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
