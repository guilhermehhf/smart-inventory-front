import TextField from '@mui/material/TextField';

type CampoProps = {
    text: string
    onChange: any
    type?:string
}


export function Campo(props: CampoProps) {
    let id:string = props.text.toLocaleLowerCase().replace(/ /g, '')

    return( 
        <TextField
            margin="normal"
            fullWidth
            required
            id={id}
            label={props.text}
            onChange = {props.onChange}
            type={props.type}
        />
    )
}