import React, { useEffect, useRef, useState } from 'react';
import load from 'load-script';

const DEFAULT_SCRIPT = 'https://cdn.ckeditor.com/4.17.2/standard/ckeditor.js';

export default function Ckeditor({ defaultContent, config, scriptUrl = DEFAULT_SCRIPT, isScriptLoaded = false, className, onReady, events = {} }) {
    const ref = useRef(null);
    const [isMounting, setMounting] = useState(false);
    const [isLoaded, setLoaded] = useState(isScriptLoaded);
    const [editor, setEditor] = useState(null);

    const initCKEditor = () => {
        if (isMounting) {
            return;
        }

        setLoaded(true);

        if (!window.CKEDITOR) {
            console.log('CKEDITOR is not loaded!');
            return;
        }

        const _editor = window.CKEDITOR.appendTo(ref.current, config, defaultContent);
        setEditor(_editor);

        if (typeof onReady === 'function') {
            onReady(_editor);
        }

        for (let event in events) {
            let eventHandler = events[event];

            _editor.on(event, eventHandler);
        }
    };

    useEffect(() => {
        if (isLoaded) {
            initCKEditor();
        } else {
            load(scriptUrl, initCKEditor);
        }

        return () => {
            setMounting(true);
            editor && editor.destroy();
        };

    }, []);

    return (
        <div className={className} ref={ref} />
    );
};
