import React, { useState } from "react";
// import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { marked } from "marked";
import DOMPurify from "dompurify";
import highlightjs from "highlight.js";
import "highlight.js/styles/github.css";
import dynamic from "next/dynamic"
import xss from "xss";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });


const WriteMarkdown = () => {
    // ハイライトの設定
    marked.setOptions({
        highlight: (code: any, lang: any) => {
            return highlightjs.highlightAuto(code, [lang]).value;
        },
    });

    const [markdownValue, setMarkdownValue] = useState("");

    const onChange = (text: any) => {
        setMarkdownValue(text);
    };

    return (
        <div>
            <SimpleMDE onChange={(text) => onChange(text)} />
            <div id="body" >
                <span dangerouslySetInnerHTML={{ __html: xss(marked(markdownValue)) }} />
            </div>
        </div>
    );
}

export default WriteMarkdown
