"use client";

import { toast } from "sonner";
import config from "@/lib/config";
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
    const response = await fetch("/api/auth/imagekit");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, token, expire } = data;
    return { signature, token, expire };
  } catch (error: any) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

const FileUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filepath: string } | null>(null);
  const onError = (error: any) => {
    toast.error(
      "Image uploaded failed. Your image could not be uploaded. Please try again."
    );
  };

  const onSuccess = (res: any) => {
    const filePath = res.filePath || res.url?.replace(urlEndpoint, "");
    setFile({ filepath: filePath });
    onFileChange(res.filePath);
    toast("Image uploaded successfully: " + res.filePath);
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-file.jpg"
      />
      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
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
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default FileUpload;
