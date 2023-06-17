import React, {useMemo, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { v4 as uuid } from 'uuid';
import {storage} from "../firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

let quillObj;

function Editor() {
    let file;

    let onChange = (editor) => {
        console.log("Hello"+editor);
        const range = quillObj.getEditorSelection();
    };

    let uploadImage = async (imgFile, quillObj) => {
        if(imgFile == null)
            return;
        let filepath = `images/${uuid()}`;

        const imageRef = ref(storage, filepath);

        uploadBytes(imageRef, imgFile).then((response) => {
            getDownloadURL(ref(storage, filepath)).then((url) => {
                if(url == '' || url == null)
                    return;
                const range = quillObj.getEditorSelection();
                quillObj.getEditor().insertEmbed(range.index, 'image', url);

                // move cursor to the end
                quillObj.getEditor().setSelection(quillObj.getEditor().getLength(),0);
            }).catch((error) => {
                console.debug(error);
            });
        }).catch((error) => {
            console.debug(error);
        });
    };

    let imageHandler = async () => {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept','image/*');
        input.click();

        input.onchange = async () => {
            let file = input.files[0];
            let formData = new FormData();

            formData.append('image', file);

            const res = await uploadImage(file, quillObj);
        }
    };

    let modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline','strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        }
    };

    return <ReactQuill
        ref={(el) => {
            quillObj = el;
        }}
        theme="snow"
        onChange={onChange}
        modules={modules}/>;
}

export default Editor;