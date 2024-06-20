'use client'
import React, { useState } from 'react';


function UploadPage() {
  const [file, setFile] = useState<File| null>();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    console.log("Selected file from the handler:", selectedFile);
    setFile(selectedFile);
    // console.log(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError('No file selected');
      return;
    }

    setUploading(true);
    setError(null);
    setResponse(null);

    const formData = new FormData();

    formData.append('file', file);
    // console.log("file here", file);
    console.log(file);
    console.log(formData);

    try {
      const res = await fetch('/api/uploadserver', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      console.log("formdata",formData);
      const data = await res.json();
      console.log("API response data:", data);
      // data.url has the image upload url

      setResponse(data);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload a Video</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={!file || uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h2>Upload Successful</h2>
          <p>Public ID: {response.public_id}</p>
          <p>URL: <a href={response.secure_url}>{response.secure_url}</a></p>
        </div>
      )}
    </div>
  );
}

export default UploadPage;
