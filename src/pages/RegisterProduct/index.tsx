import React, { useState } from "react";
import { Campo } from "../../components/campo";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { postRequest, postRequestProduct } from '../../services/requests.js';
import { Regex } from '../../utils/regex.js'
import { SnackAlert } from '../../components/alert'
import { SelectLabelsCategory } from "../../components/SelectItemCategory";
import { SelectChangeEvent } from "@mui/material";

const regex2 = new Regex()

export function RegisterProduct() {
   const [open, setOpen] = useState(false);
   const [snack, setSnack] = useState({
      message: '',
      type: ''
   })
   const [campos, setCampos] = useState({
      nome: '',
      códigodoproduto: '',
      marca: '',
      categoria: ''
   })

   function onChange(ev: React.FormEvent<HTMLInputElement>) {
      let { id, value } = ev.currentTarget
      setCampos({ ...campos, [id]: value })
      console.log(campos)
   }

   function onChangeCategoria(ev: SelectChangeEvent) {
      console.log(ev.target.value)
      console.log(ev)
      setCampos({ ...campos, ['categoria']: ev.target.value })
   }

   function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
      ev.preventDefault()
      console.log(campos)
      const nameTest = regex2.minMaxTest(4,25,campos['nome'])
      const codigoDoProdutoTest = regex2.minMaxTest(4,32, campos['códigodoproduto'])
      const marcaTest = regex2.minMaxTest(4,25, campos['marca'])

      if (nameTest && codigoDoProdutoTest && marcaTest) {
         postRequestProduct(campos.nome, campos.códigodoproduto, campos.marca, campos.categoria)
         .then((response) => {
           console.log("Produto: ", response.data);
           setSnack({ message: 'Produto adicionado com sucesso!', type: 'success' })
           
         })
         .catch((error) =>{
           setSnack({ message: 'Houve um erro com o banco de dados e o Produto não foi adicionada!', type: 'error' })
           console.log(error)
         } );
        
     } else {
        setSnack({ message: 'Todos os campos precisam ser preenchidos', type: 'error' })
     }
      setOpen(true)
   }

   return (


         <Container component="main" maxWidth="sm" sx={{  display: "flex", flex: 1, justifyContent:"center", alignItems:"center" }}>
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding:'40px',
                  border: 1.5,
                  borderRadius: 4,
                  borderColor: '#80EACA',
                  bgcolor: '#fff'
               }}
            >
               <Typography variant='h5'>Registrar Produto</Typography>
               <Box
                  onSubmit={onSubmit}
                  component="form"
                  sx={{ mt: 1 }}
                  noValidate
                  autoComplete="off"
               >
                  <Campo text='Código do Produto' onChange={onChange} />
                  <Campo text='Nome' onChange={onChange} />
                  <SelectLabelsCategory endpoint='/inventoryCategory/' label='Categorias' onChange={onChangeCategoria} />
                  <Campo text='Marca' onChange={onChange} />
                  <Button sx={{ mt: 3, mb: 2 }} variant="contained" type="submit" fullWidth>Cadastrar</Button>
               </Box>
            </Box>
            <SnackAlert open={open} setOpen={setOpen} message={snack.message} type={snack.type} />
         </Container>

   )
}