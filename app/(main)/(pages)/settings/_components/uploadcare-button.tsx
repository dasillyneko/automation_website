'use client'
import React, { useState } from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import { useRouter } from 'next/navigation';

type Props = {
  onUpload?: (files: any[]) => void;
};

const UploadCareButton = ({ onUpload }: Props) => {
  // Retrieve your public key from environment variables
  const pubKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || 'default_key';

  // State to store the list of successfully uploaded files
  const [files, setFiles] = useState<any[]>([]);

  // Event handler for changes in the uploader
  const handleChangeEvent = (e: any) => {
    // Filter for files that have been successfully uploaded
    const successfulFiles = e.allEntries.filter(
      (file: any) => file.status === 'success'
    );
    setFiles(successfulFiles);

    // If an onUpload callback is provided, call it with the uploaded files
    if (onUpload) {
      onUpload(successfulFiles);
    }
  };

  return (
    <div>
      <FileUploaderRegular pubkey={pubKey} onChange={handleChangeEvent}/>
    </div>
  );
};

export default UploadCareButton;
