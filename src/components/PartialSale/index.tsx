import { Box, SelectChangeEvent, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { SelectLabelsShipment } from "../SelectItemShipment";


interface PartialSales {
  remessa: string;
  quantidadevendida: number;
  preço?: number;
}

// props: PartialSalesProps
export function PartialSale(props:{handleFormChange:any, onChangeShipment: any,addFields: any, removeFields:any, inputFields: any[]}) {
  

  return (
    <>
        <Typography variant="h6">Vendas Parciais:</Typography>
        {props.inputFields.map((input, index) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                placeContent: "center",
                alignItems: "center",
                
                gap: 0.5,
                key:{index}
              }}
              >
                <SelectLabelsShipment endpoint='/shipment/' index={index} label='Produto' onChange={(ev: SelectChangeEvent) => props.onChangeShipment(index,ev)}/>
                <TextField
                  margin="normal"
                  required
                  label="Quantidade Vendida"
                  id="qtdVendida"
                  fullWidth
                  onChange={(ev) =>
                    props.handleFormChange(
                      index,
                      ev as React.ChangeEvent<HTMLInputElement>
                    )
                  }
                  type="number"
                />
                
                <TextField
                  margin="normal"
                  required
                  label="Preço"
                  id="valorCompraProdutoUnit"
                  inputProps={{ min: "0", max: "10" }}
                  fullWidth
                  onChange={(ev) =>
                    props.handleFormChange(
                      index,
                      ev as React.ChangeEvent<HTMLInputElement>
                    )
                  }
                  type="number"
                />
                <Button
                  sx={{ mt: 3, mb: 2 }}
                  variant="contained"
                  color='error'
                  onClick= {() => props.removeFields(index)}
                >X</Button>
              </Box>
          );
        })}

      <Button
        sx={{ mt: 3, mb: 2 }}
        variant="contained"
        color="success"
        onClick= {props.addFields}
      >Adicionar mais...</Button>
    </>
  );
}
