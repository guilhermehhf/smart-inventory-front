import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import React, { useState } from "react";

type SnackAlertType = {
    message:string,
    type:string
    open:boolean
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}

export function SnackAlert(props:SnackAlertType ) {
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });



    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setOpen(false);
    };

    return (
    <div>
        <Snackbar open={props.open} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.type as AlertColor || 'warning'} sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    </div>
    )
}