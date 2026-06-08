"use client";

import { useState } from "react";
import { CuteButton } from "./cuteButton";
import { Button, Typography, Box } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from '@mui/icons-material/Close';

interface IPdfUploader {
  pdfId: number;
}

export function PdfUploader({ pdfId }: IPdfUploader) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (selected && selected.type !== "application/pdf") {
      setStatus("Só PDF, por favor!");
      setFile(null);
      return;
    }
    setStatus("");
    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando...");
    // Vou colocar a lógica depois, to com preguiça agr
    setTimeout(() => {
      setStatus("Upload feito com sucesso!");
      setFile(null);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-center w-full">
      <input
        id="file-upload"
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {!file ? (
      <label htmlFor="file-upload" className="flex w-full items-center justify-center">
        <Button
          variant="outlined"
          component="span"
          className="w-full max-w-72 h-40 flex flex-col justify-center items-center gap-2"
        >
          <div className="bg-(--blueOpacity) p-3 rounded-full animate-pulse">
            <UploadFileIcon sx={{ fontSize: 50 }} />
          </div>

          <Typography variant="body2">Selecionar PDF</Typography>
        </Button>
      </label>

      ) : 
        <div
          className="flex items-center gap-2 p-4 border border-(--stroke) rounded-xl bg-(--lightGray) shadow"
        >
            <PictureAsPdfIcon sx={{ fontSize: 45, color: "var(--text)" }} />
            <Typography variant="body2" className="text-center text-(--text)">
              {file.name}
            </Typography>
          <Button sx={{ alignSelf: "center" }} onClick={() => setFile(null)}>
            <CloseIcon sx={{ color: "var(--text)" }}/>
          </Button>
        </div>
      
      }

      <CuteButton type text="Enviar arquivo" classname="justify-center" />

      {status && <p className="text-(--text)">{status}</p>}
    </form>
  );
}
