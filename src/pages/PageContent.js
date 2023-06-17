import React from 'react';
import Editor from '../components/Editor'

function PageContent(props) {
    return (
        <>
            <input type="text" placeholder="Page Title"/>
            <Editor/>
        </>
    );
}

export default PageContent;