import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { listAll, getStorage, ref, ListResult, StorageReference, getDownloadURL, deleteObject } from "firebase/storage";
import useAuth from "src/utils/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownloadAlt, faShareAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Upload from "./Upload";
import { toast } from "react-toastify";

interface ListItemProps {
    item: StorageReference;
    onDelete: (item: StorageReference) => void;
}

const ListItem = ({ item, onDelete }: ListItemProps) => {
    const [downloadURL, setDownloadURL] = useState<string | undefined>(undefined);

    useEffect(() => {
        getDownloadURL(item).then((url) => {
            setDownloadURL(url);
        });
    }, [item])

    return <StyledListItem>
        {item.name}
        <Actions>
            <FontAwesomeIcon icon={faShareAlt} onClick={() => downloadURL && navigator.clipboard.writeText(downloadURL).then(() => toast.success('Successfuly copied link to clipboard')).catch(e => toast.error(e.message))}/>
            <DownloadButton href={downloadURL} download={item.name}><FontAwesomeIcon icon={faCloudDownloadAlt} /></DownloadButton>
            <DeleteButton icon={faTrashAlt} onClick={
                () => {
                    deleteObject(item)
                    .then(() => {
                        toast.success('Successfuly deleted file ' + item.name)
                        onDelete(item);
                    })
                    .catch(e => toast.error(e.message))
                }}
            />
        </Actions>
    </StyledListItem>
}

const StyledListItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const DownloadButton = styled.a`
    color: #447e7c;
`;

const DeleteButton = styled(FontAwesomeIcon)`
    color: #ac0000;
`;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > * {
        cursor: pointer;
    }

    >*:not(:last-child) {
        margin-right: 10px;
    }
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [list, setList] = useState<ListResult>();
    const auth = useAuth();

    useEffect(() => {
        if (!auth) return;

        const storage = getStorage();
        const listRef = ref(storage, `files/${auth.uid}`);

        listAll(listRef).then(setList);
    }, [auth]);

    const onFileUploaded = useCallback((file: StorageReference) => {
        setList((list) => (list ? { ...list, items: list?.items ? [file, ...list.items.filter((i) => i.name !== file.name)] : [file] } : { items: [file], prefixes: [] }));
    }, [])

    const onFileDeleted = useCallback((file: StorageReference) => {
        setList((list) => (list ? { ...list, items: list?.items ? [...list.items.filter((i) => i.name !== file.name)] : [] } : { items: [], prefixes: [] }));
    }, [])

    return <>
        <StyledTitle>Upload</StyledTitle>
        <Upload onFileUploaded={onFileUploaded} />
        <StyledTitle>Files</StyledTitle>
        {list && (list.items.length === 0 ? <p>You have no uploaded file</p> : <StyledList>
            {list.items.map((item) => <ListItem  onDelete={onFileDeleted} key={item.name} item={item} />)}
        </StyledList>)}
    </>
}

const StyledList = styled.ul`
    padding: 10px;
    list-style: none;
`;

const StyledTitle = styled.h2`
    margin: 20px 0;
`;