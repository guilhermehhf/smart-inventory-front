import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { SelectLabelsShipment } from "../SelectItemShipment";

type PartialSalesProps = {
  remessa: string;
  quantidavendida: number;
  preço?: number;
};
interface PartialSales {
  remessa: string;
  quantidavendida: number;
  preço?: number;
}

// props: PartialSalesProps
export function PartialSale() {
  const [inputFields, setInputFields] = useState<PartialSales[]>([
    { remessa: "", quantidavendida: 0, preço: 0 },
  ]);

  const handleFormChange = (
    index: number,
    event: React.FormEvent<HTMLInputElement>
  ) => {
    let { id, value } = event.currentTarget;
    let data = [...inputFields] as any;

    data[index][id] = value;
    setInputFields(data);
    console.log(index, id, value);
    console.log(inputFields);
  };

  const onChangeShipment = (index: number,event: React.FormEvent<HTMLInputElement>) => {
    let { id, value } = event.currentTarget;
    let data = [...inputFields] as any;

    data[index][id] = value;
    setInputFields(data);
    console.log(index, id, value);
    console.log(inputFields);
  };

  const addFields = () => {
    console.log("tentando adicionar fields");
    let newfield = { remessa: "", quantidavendida: 0, preço: 0 };

    setInputFields([...inputFields, newfield]);
  };

  const removeFields = (index: number) => {
    console.log(index);
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  return (
    <>
        <Typography variant="h6">Vendas Parciais:</Typography>
        {inputFields.map((input, index) => {
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
                <SelectLabelsShipment endpoint='/shipment/' index={index} label='Produto' onChange={onChangeShipment}/>
                <TextField
                  margin="normal"
                  required
                  label="Quantidade Vendida"
                  id="quantidadevendida"
                  onChange={(ev) =>
                    handleFormChange(
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
                  id="preço"
                  inputProps={{ min: "0", max: "10" }}
                  fullWidth
                  onChange={(ev) =>
                    handleFormChange(
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
                  onClick= {() => removeFields(index)}
                >X</Button>
              </Box>
          );
        })}

      <Button
        sx={{ mt: 3, mb: 2 }}
        variant="contained"
        color="success"
        onClick= {addFields}
      >Adicionar mais...</Button>
    </>
  );
}
