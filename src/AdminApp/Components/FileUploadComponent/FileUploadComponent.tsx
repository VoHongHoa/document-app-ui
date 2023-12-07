import React, { useState, ChangeEvent } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import {
  UploadTaskSnapshot,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../../firebase";
interface IFileUploadProps {
  url?: string;
  handleAfterUpload: (url: string) => void;
}

export default function FileUploadComponent(props: IFileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const storageRef = ref(storage, `/documents/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      uploadTask.on(
        "state_changed",
        (snapshot: UploadTaskSnapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            props.handleAfterUpload(url);
          });
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Input
        inputProps={{
          accept: ".pdf, .doc, .docx",
          id: "contained-button-file",
        }}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="contained-button-file">
        <Button
          disabled={uploadProgress > 98 || props.url ? true : false}
          variant="contained"
          component="span"
        >
          Choose File
        </Button>
      </label>
      <span style={{ marginLeft: "8px" }}>
        {selectedFile && `Selected File: ${selectedFile.name}`}
      </span>
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedFile || uploadProgress > 98}
        >
          Upload
        </Button>
        {uploadProgress > 0 && (
          <div style={{ marginTop: "16px" }}>
            <Typography variant="body2">
              Upload Progress: {uploadProgress.toFixed(2)}%
            </Typography>
            <LinearProgress variant="determinate" value={uploadProgress} />
          </div>
        )}
      </div>
    </div>
  );
}
