import TextField from '@mui/material/TextField';
import { useState } from 'react';

type PartialSalesProps = {
    text: string
    onChange: any
    type?:string
}



export function PartialSale(props: PartialSalesProps) {
    const [inputFields, setInputFields] = useState([
        { name: '', age: '' }
      ])


      function handleFormChange(event: React.FormEvent<HTMLInputElement>) {
         let data = [...inputFields];
         // data[index][event.target.name] = event.currentTarget.value;
         setInputFields(data);
      }
      
      return (
        <div className="App">
          <form>
            {inputFields.map((input, index) => {
              return (
                <div key={index}>
                  <input
                    name='name'
                    placeholder='Name'
                    value={input.name}
                    onChange={handleFormChange}
                  />
                  <input
                     name='age'
                     placeholder='Age'
                     value={input.age}
                     onChange={handleFormChange}
                  />
                </div>
              )
            })}
          </form>
        </div>
      );
}