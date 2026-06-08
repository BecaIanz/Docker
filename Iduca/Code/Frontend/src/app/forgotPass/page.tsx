"use client"

import { ROUTES } from "@/src/constants/routes";
import { Box, Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, SnackbarCloseReason, TextField } from "@mui/material";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ForgotPass = () => {
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [openReturn, setOpenReturn] = useState(false);
    const [messageReturn, setMessageReturn] = useState("");
    const [values, setValues] = useState(["", "", "", "", ""]);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [passAgain, setPassAgain] = useState("");
    const [page, setPage] = useState(1);

    const router = useRouter();

    // Função do retorno fofinho do canto
    const handleClose = ( event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason ) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenReturn(false);
      };

    // Função de confirmar email
    const confirmEmail = async () => {
        // try {
            // const response = await axios.post("http://localhost:8080/user/forgotPass", {
            //     email: email,
            // });
    
            // if (!response.data.reponse) {
                // setMessageReturn("Email não encontrado!");
                // setOpenReturn(true);

            // }
            // else {
                setMessageReturn("Email confirmado!");
                setOpenReturn(true);
                setPage(2);
            // }
        // } catch (error) {
            // console.error(error);
            // setMessageReturn("Ocorreu um erro ao confirmar email, tente novamente mais tarde!");
            // setOpenReturn(true);
        // }
    }

    
    const resendCode = async () => {
        // try {
            // const response = await axios.post("http://localhost:8080/user/confirmCode", {
            //     code: code,
            // });
    
            // if (!response.data.reponse) {
                // setMessageReturn("Código errado!");
                // setOpenReturn(true);

            // }
            // else {
                setMessageReturn("O código foi reenviado, veja seu e-mail!");
                setOpenReturn(true);
                setPage(2);
            // }
        // } catch (error) {
            // console.error(error);
            // setMessageReturn("Ocorreu um erro ao confirmar email, tente novamente mais tarde!");
            // setOpenReturn(true);
        // }
    }

    const confirmCode = async () => {
        // try {
            // const response = await axios.post("http://localhost:8080/user/confirmCode", {
            //     code: code,
            // });
    
            // if (!response.data.reponse) {
                // setMessageReturn("Código errado!");
                // setOpenReturn(true);

            // }
            // else {
                setMessageReturn("Código confirmado!");
                setOpenReturn(true);
                setPage(3);
            // }
        // } catch (error) {
            // console.error(error);
            // setMessageReturn("Ocorreu um erro ao confirmar email, tente novamente mais tarde!");
            // setOpenReturn(true);
        // }
    }

    const resetPass = async () => {
        if (pass != passAgain) {
            setMessageReturn("Os campos precisam ser iguais!");
            setOpenReturn(true); 
        }
        else {
            // try {
                // const response = await axios.post("http://localhost:8080/user/confirmCode", {
                //     code: code,
                // });
        
                // if (!response.data.reponse) {
                    // setMessageReturn("Código errado!");
                    // setOpenReturn(true);
    
                // }
                // else {
                    setMessageReturn("Senha redefinida com sucesso!");
                    setOpenReturn(true);
                    router.push(ROUTES.home);
                // }
            // } catch (error) {
                // console.error(error);
                // setMessageReturn("Ocorreu um erro ao confirmar email, tente novamente mais tarde!");
                // setOpenReturn(true);
            // }
        }

    }

    // Função para fazer o negócio de quando digita, ele muda pro próximo campo
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const newValues = [...values];
        newValues[index] = event.target.value;

        if (event.target.value.length === 1 && index < 4) {
            document.getElementById(`input-${index + 1}`)?.focus();
        }

        setValues(newValues);
    };

    // Coisas pra fazer o olhinho funcionar
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

    const handleMouseDownPassword1 = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword1 = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // Coisas pra fazer o olhinho funcionar
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    const handleMouseDownPassword2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className="w-screen h-screen gap-5 flex flex-col items-center p-2 md:py-20 py-10">
            <div className="flex flex-col items-center">
                <h1 className="text-5xl text-(--text)" style={{ fontFamily: 'var(--jura)'}}>Iduca</h1>
                <p className="text-(--gray) text-center">Plataforma de treinamento corporativo</p>
            </div>
            <div className="w-full gap-8 px-5 py-5 rounded-2xl border border-(--stroke) bg-(--card) shadow-(--shadow) md:max-w-lg flex flex-col">
                {page == 1 ? (
                    <>
                        <div className="flex flex-col gap-1">
                            <h1 className="font-semibold text-2xl text-(--text)">Confirmar E-mail</h1>
                            <p className="text-(--gray)">Digite seu e-mail para enviarmos um código para recuperação da sua conta</p>
                        </div>
                        <div className="w-full flex flex-col gap-4">
                            <TextField onChange={ (e) => setEmail(e.target.value) } label="E-mail corporativo" variant="outlined" />
                        </div>
                        <div className="bg-(--normalBlue) flex items-center justify-center w-full rounded-2xl hover:bg-(--normalBlueHover)">
                            <Button className="w-full" onClick={confirmEmail} disableElevation variant="contained" sx={{boxShadow: 'var(--shadow)', backgroundColor: "inherit"}}>Confirmar e-mail</Button>
                        </div>
                    </>
                ) : page == 2 ? (
                    <>
                        <div className="flex flex-col gap-1">
                            <h1 className="font-semibold text-2xl text-(--text)">Código de recuperação</h1>
                            <p className="text-(--gray)">Digite o código de 5 números que foi enviado no seu e-mail</p>
                        </div>
                        <div className="w-full flex flex-col gap-4">
                            <div className="flex w-full gap-1 md:justify-around justify-center text-center">
                                {values.map((value, index) => (
                                    <TextField
                                        key={index}
                                        id={`input-${index}`}
                                        value={value}
                                        onChange={(e) => handleChange(e, index)}
                                        variant="outlined"
                                        sx={{ maxWidth: "60px" }}
                                    />
                                ))}
                            </div>
                            <div className="flex flex-col gap-1">
                                <button onClick={resendCode} className="self-end text-(--normalBlue) hover:text-(--normalBlueHover) cursor-pointer">Reenviar código</button>
                            </div>
                        </div>
                        <div className="bg-(--normalBlue) flex items-center justify-center w-full rounded-2xl hover:bg-(--normalBlueHover)">
                            <Button className="w-full" onClick={confirmCode} disableElevation variant="contained" sx={{boxShadow: 'var(--shadow)', backgroundColor: "inherit"}}>Confirmar código</Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col gap-1">
                            <h1 className="font-semibold text-2xl text-(--text)">Redefinir sua senha</h1>
                            <p className="text-(--gray)">Digite sua nova senha nos dois campos abaixo</p>
                        </div>
                        <div className="w-full flex flex-col gap-4">
                        <FormControl  variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                            <OutlinedInput onChange={ (e) => setPass(e.target.value) } type={showPassword1 ? 'text' : 'password'} endAdornment={ <InputAdornment position="end"> <IconButton aria-label={ showPassword1 ? 'hide the password' : 'display the password' } onClick={handleClickShowPassword1} onMouseDown={handleMouseDownPassword1} onMouseUp={handleMouseUpPassword1} edge="end" > {showPassword1 ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment> } label="Password" />
                        </FormControl>
                        <FormControl  variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Repita a senha</InputLabel>
                            <OutlinedInput onChange={ (e) => setPassAgain(e.target.value) } type={showPassword2 ? 'text' : 'password'} endAdornment={ <InputAdornment position="end"> <IconButton aria-label={ showPassword2 ? 'hide the password' : 'display the password' } onClick={handleClickShowPassword2} onMouseDown={handleMouseDownPassword2} onMouseUp={handleMouseUpPassword2} edge="end" > {showPassword2 ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment> } label="Password" />
                        </FormControl>
                            <div className="flex flex-col gap-1">
                            </div>
                        </div>
                        <div className="bg-(--normalBlue) flex items-center justify-center w-full rounded-2xl hover:bg-(--normalBlueHover)">
                            <Button className="w-full" onClick={resetPass} disableElevation variant="contained" sx={{boxShadow: 'var(--shadow)', backgroundColor: "inherit"}}>Entrar</Button>
                        </div>
                    </>
                ) }
                <Divider />
                <div className="flex gap-1 justify-center w-full">
                    <h1 className="text-(--text)">Lembrou sua senha?</h1>
                    <Link className="self-center text-(--normalBlue) hover:text-(--normalBlueHover)" href={ROUTES.login}>Faça login</Link>
                </div>

            </div>
            <Snackbar open={openReturn} autoHideDuration={5000} onClose={handleClose} message={messageReturn} />
        </div>
    )
}

export default ForgotPass;