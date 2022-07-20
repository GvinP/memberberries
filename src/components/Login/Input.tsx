import React, {ChangeEvent} from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type InputPropsType = {
    half?: boolean
    name: string
    label: string
    type?: string
    autoFocus?: boolean
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handlerShowPassword?: () => void
}

const Input = ({half, name, handleChange, label, autoFocus, type, handlerShowPassword}: InputPropsType) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField name={name}
                       label={label}
                       onChange={handleChange}
                       variant={'outlined'}
                       required
                       fullWidth
                       autoFocus={autoFocus}
                       type={type}
                /*
                // @ts-ignore */
                       InputProps={name === 'password' ? {
                           endAdornment: (
                               <InputAdornment position={"end"}>
                                   <IconButton onClick={handlerShowPassword}>
                                       {type === 'password' ? <Visibility/> : <VisibilityOff/>}
                                   </IconButton>
                               </InputAdornment>
                           )
                       } : null}
            />
        </Grid>
    );
};

export default Input;