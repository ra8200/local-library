"use client";

import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import ImageKit from "imagekit";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";

const { 
  env: { 
      imagekit: { publicKey, urlEndpoint },
  }, 
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if(!response.ok) {
      const errorText = await response.text();

      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    const { signature, token, expire } = data;

    return { signature, token, expire };

  } catch (error: any) {
    console.log(error);
    throw new Error(`Authentication failed: ${error.message}`);
  }
}

const ImageUpload = ({ 
  onFileChange 
}: { 
  onFileChange: (filePath: string) => void;
}) => {
  const IkUploadRef = useRef(null);
  const [file, setFile] = useState<{ filepath: string } | null >(null)

  const onError = (error: any) => {
    console.log("Error");

    toast({
      title: "Image uploaded failed.",
      description: "Your image could not be uploaded. Please try again.",
      variant: "destructive",
    });
  }

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: "Image uploaded successfully",
      description: `${res.filePath} uploaded successfully`,
    });
  }

  return (
    <ImageKitProvider 
      publicKey={publicKey} 
      urlEndpoint={urlEndpoint} 
      authenticator={authenticator}
    >
      <IKUpload 
        className="hidden"
        ref={IkUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-file.jpg"
      />
      <button className="upload-btn" onClick={(e) => {
        e.preventDefault();

        if(IkUploadRef.current) {
          // @ts-ignore
          IkUploadRef.current?.click();
        }
      }} >
        <Image 
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a File</p>

        {file && <p className="upload-filename">{file.filepath}</p>}
      </button>

      {file && (
        <IKImage 
          alt={file.filepath}
          path={file.filepath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload;
