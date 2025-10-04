import { useState } from 'react';
import { marked } from 'marked';
import './App.css';

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(
    '# Hello Markdown\nStart typing...'
  );

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      alert('Markdown copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyHTML = async () => {
    try {
      const html = await marked(markdown);
      await navigator.clipboard.writeText(html);
      alert('Rendered HTML copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy HTML:', err);
    }
  };

  return (
    <div className='container'>
      <div className='interaction'>
        <button onClick={() => setMarkdown('')}>Clear All</button>
        <button onClick={copyMarkdown}>Copy Markdown</button>
        <button onClick={copyHTML}>Copy HTML</button>
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
