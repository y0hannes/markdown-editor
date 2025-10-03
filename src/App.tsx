import { useState } from 'react'
import { marked } from 'marked'
import './App.css'

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('# Hello Markdown\nStart typing...')

  return (
    <div className="container">
      <textarea
        className="editor"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <div
        className="preview"
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      />
    </div>
  )
}

export default App
