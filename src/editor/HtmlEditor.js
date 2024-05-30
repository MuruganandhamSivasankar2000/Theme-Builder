import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from './useLocalStorage'
import TakeHtmleditor from './TakeHtmleditor';

function HtmlEditor() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')
// const[sendCss,setSendCss]=useState('');
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log(html);
        console.log(css);
      setSrcDoc(`
      <html>
      <script>${js}</script>
    </html>
      `)
    }, 250)
    

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
    <div className='cnt-editor'>
      <div className="cnt-htmlcss pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      {/* <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div> */}
      <div style={{width:'100%'}}>

      <TakeHtmleditor html={html} css={css} />
      </div>
      </div>
    </>
  )
}

export default HtmlEditor;