import { Box } from "@mui/material";
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          placeContent: "center",
          alignItems: "center",
          padding: "40px",
          gap: 0.5
        }}
      >
        {inputFields.map((input, index) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                placeContent: "center",
                alignItems: "center",
                border: 1.5,
                borderRadius: 4,
                borderColor: "#000",
                bgcolor: "#fff",
                gap: 0.5,
                key:{index}
              }}
              >
                <SelectLabelsShipment endpoint='/shipment/' index={index} label='Produtos' onChange={onChangeShipment}/>
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
      </Box>
      <Button
        sx={{ mt: 3, mb: 2 }}
        variant="contained"
        color="success"
        onClick= {addFields}
      >Adicionar mais...</Button>
    </>
  );
}
