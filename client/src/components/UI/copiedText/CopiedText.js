import React, { useState } from 'react';
import { useClipboard } from 'use-clipboard-copy';
import s from './CopiedText.module.scss'

const CopiedText = ({text}) => {
    const [copied, setCopied] = useState(false)

    const clipboard = useClipboard()

    const copy = (text) => {
        clipboard.copy(text)
        setCopied(true)
        setTimeout(() => { setCopied(false) }, 700)
    }

    return (
        <div>
            {
                copied ?
                <p>Скопировано!</p>
                :
                <p className={s.textDecoration} onClick={() => copy(text)}>{text}</p>
            }
        </div>
    );
};

export default CopiedText;