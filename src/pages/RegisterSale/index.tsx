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

const regex2 = new Regex();

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
  const [campos, setCampos] = useState({
    name: "",
    quantity: "",
    type: "",
  });

  function onChange(ev: React.FormEvent<HTMLInputElement>) {
    let { id, value } = ev.currentTarget;
    
    setCampos({ ...campos, [id]: value });
    console.log(campos);
  }

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    console.log(campos);
    const nameTest = regex2.emailTest(campos["name"]);
    const quantityTest = regex2.minMaxTest(6, 12, campos["quantity"]);
    const typeTest = regex2.minMaxTest(6, 12, campos["type"]);

    if (nameTest && quantityTest && typeTest) {
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
        <Typography variant="h5">Register Sale</Typography>
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
          
        <PartialSale/>
          
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
