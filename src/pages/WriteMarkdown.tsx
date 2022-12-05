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


interface Props {
    setValueUseMarkdown: React.Dispatch<
        React.SetStateAction<string>
    >;
}

const WriteMarkdown = (props: Props) => {
    // ハイライトの設定
    marked.setOptions({
        highlight: (code: any, lang: any) => {
            return highlightjs.highlightAuto(code, [lang]).value;
        },
    });

    // 画面表示の値管理
    const [markdownValue, setMarkdownValue] = useState("");
    const onChange = (text: any) => {
        setMarkdownValue(text);
        // 送信情報に設定
        props.setValueUseMarkdown(text);
    };

    return (
        <div>
            <SimpleMDE onChange={(text) => onChange(text)} />
            <h3>プレビュー</h3>
            <div id="body" >
                <span dangerouslySetInnerHTML={{ __html: xss(marked(markdownValue)) }} />
            </div>
            <hr />
        </div>
    );
}

export default WriteMarkdown
