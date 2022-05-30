import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, StorageReference } from "firebase/storage";
import { useState, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

interface UploadProps {
    onFileUploaded?: (item: StorageReference) => void;
}

const Upload = ({ onFileUploaded }: UploadProps) => {
    const [progresspercent, setProgresspercent] = useState(0);
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [filename, setFilename] = useState<string | undefined>(undefined);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
        e.preventDefault()
        const storage = getStorage();
        const auth = getAuth();
        // @ts-ignore
        const file = e.target[0]?.files[0]
        if (!file) return;

        const uid = await auth.currentUser?.uid;
        const storageRef = ref(storage, `/files/${uid}/${file.name}`);

        setUploading(true);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                setUploading(false);
                toast.error(error.message);
            },
            () => {
                setUploading(false);
                onFileUploaded?.(uploadTask.snapshot.ref);
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFilename(undefined);
                    if(inputRef.current) {
                        inputRef.current.value = "";
                    }
                    toast.success("Uploaded successfully");
                });
            }
        );
    }, [inputRef, onFileUploaded]);

    const handleFileChange = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }, [inputRef]);

    const onFileChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
        if (e.target.files) {
            const file = e.target.files[0];

            if (file) {
                setFilename(file.name);
            }
        }
    }, []);

    return (
        <StyledUpload>
            <StyledUploadForm onSubmit={handleSubmit} className='form'>
                <input type='file' style={{ display: 'none' }} ref={inputRef} onChange={onFileChange} />
                <ChangeFileButton onClick={handleFileChange}>{filename || 'Set file' }</ChangeFileButton>
                <UploadButton disabled={uploading} type='submit'>{!uploading ? "Upload" : `Uploading (${progresspercent}%)` }</UploadButton>
            </StyledUploadForm>
        </StyledUpload>
    );
}

const StyledUpload = styled.div`
    margin: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const StyledUploadForm = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const ChangeFileButton = styled.button`
    background-color: #f5f5f5;
    border: 1px solid #00000018;
    color: black;
    cursor: pointer;
    padding: 10px 30px;
    border-radius: 5px;
`;

const UploadButton = styled.button<{ disabled: boolean }>`
    background-color: #4CAF50;
    border: 1px solid #00000018;
    color: white;
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
    padding: 10px 30px;
    border-radius: 5px;
    margin-left: 10px;

    opacity: ${({ disabled }) => disabled ? 0.5 : 1};

    &:hover {
        background-color: #3e8e41;
    }
`;

export default Upload;