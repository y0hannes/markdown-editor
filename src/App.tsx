import { useState } from 'react';
import { marked } from 'marked';
import './App.css';

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(
    '# Hello Markdown\nStart typing...'
  );

  return (
    <div className='container'>
      <div className='interaction'>
        <button onClick={() => setMarkdown('')}> Clear All</button>
      </div>
      <div className='main'>
        <textarea
          className='editor'
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
        <div
          className='preview'
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        />
      </div>
    </div>
  );
};

export default App;
