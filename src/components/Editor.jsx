'use client'
import React, {useMemo, useState} from 'react';
// import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import dynamic from "next/dynamic";
// import '@/public/quill.snow.css'
const Editor = (props) => {
    const [value, setValue] = useState('');
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { ssr: false }),[]);
    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [
                    { 'align': '' }, // 왼쪽 정렬
                    { 'align': 'center' }, // 가운데 정렬
                    { 'align': 'right' }, // 오른쪽 정렬
                    { 'align': 'justify' } // 양쪽 정렬
                ],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {}
        }
    };

    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike',
        'align', 'link', 'image'
    ];

    return (<ReactQuill className={`${props.className}`} theme="snow" value={props.contents} onChange={props.setContents} modules={modules} formats={formats} />);
}

export default Editor