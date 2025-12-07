'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {useEffect} from "react";

const Editor = ({id, name, setValue, className}) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
        immediatelyRender: false,
        onUpdate: ({ editor })=>{
            const content = editor.getHTML();
            setValue("content", content, { shouldValidate: true })
        },
        editorProps:{
            attributes:{
                id: id,
                name: name,
                class: className
            }
        }
    });

    return (
        <>
            <EditorContent editor={editor} />
        </>
    )
}

export default Editor