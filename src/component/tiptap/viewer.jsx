"use client"
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Viewer = ({className, content})=>{
    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        immediatelyRender: false,
        editable: false, // 읽기 전용
    });

    return (
        <EditorContent editor={editor} />
    )
}

export default Viewer