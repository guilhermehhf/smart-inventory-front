import React, { useState } from "react";
import { Campo } from "../components/campo";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { myFetch } from '../utils/request.js';
import { Regex } from '../utils/regex.js'
import { SnackAlert } from '../components/alert'

const regex = new Regex()

export function Register() {

   const [open, setOpen] = useState(false);
   const [snack, setSnack] =  useState({
      message: '',
      type: ''
   })
   const [campos, setCampos] = useState({
      nome: '',
      email: '',
      senha: '',
      confirmarsenha: ''
   })

   function onChange(ev: React.FormEvent<HTMLInputElement>) {
      let { id, value } = ev.currentTarget

      setCampos({ ...campos, [id]: value })
      console.log(id, value)
   }

   function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
      ev.preventDefault()
      console.log(campos)
      const emailTest = regex.emailTest(campos['email'])
      const nomeTest = regex.minMaxTest(3,30,campos['nome'])
      const senhaTest = regex.minMaxTest(6,12,campos['senha'])
      const confirmarSenhaTest = campos['senha'] == campos['confirmarsenha']

      if (emailTest && nomeTest && senhaTest && confirmarSenhaTest) {
         setSnack({message: 'Usuário criado com sucesso',type: 'success'})
         myFetch(`http://localhost:8081/users/${campos['nome']}/${campos['email']}/${campos['senha']}`, 'POST')
      }else{
         setSnack({message: 'Algum dos campos está inválido!',type: 'error'})
      }
      setOpen(true)
   }

   return (
         <Container component="main" maxWidth="sm" sx={{ display: "flex",flex: 1, justifyContent:"center", alignItems:"center" }}>
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
               <Typography variant='h5'>Cadastro</Typography>
               <Box
                  onSubmit={onSubmit}
                  component="form"
                  sx={{ mt: 1 }}
                  noValidate
                  autoComplete="off"
               >

                  <Campo text='Nome' onChange={onChange} />
                  <Campo text='Email' onChange={onChange} />
                  <Campo text='Senha' onChange={onChange} type='password' />
                  <Campo text='Confirmar Senha' onChange={onChange} type='password' />
                  <Button sx={{ mt: 3, mb: 2 }} variant="contained" type="submit" fullWidth>Cadastrar-se</Button>
               </Box>
            </Box>
            <SnackAlert open = {open} setOpen = {setOpen} message = {snack.message} type= {snack.type}/>
         </Container>
   )
}