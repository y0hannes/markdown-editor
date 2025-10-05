import { useState } from 'react';
import { marked } from 'marked';
import './App.css';

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(
    '# Hello Markdown\nStart typing...'
  );
  const [copyMarkdownLabel, setCopyMarkdownLabel] =
    useState<string>('Copy Markdown');
  const [copyHtmlLabel, setCopyHtmlLabel] = useState<string>('Copy HTML');

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopyMarkdownLabel('Copied');
      setTimeout(() => {
        setCopyMarkdownLabel('Copy Markdown');
      }, 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyHTML = async () => {
    try {
      const html = await marked(markdown);
      await navigator.clipboard.writeText(html);
      setCopyHtmlLabel('Copied');
      setTimeout(() => {
        setCopyHtmlLabel('Copy HTML');
      }, 1000);
    } catch (err) {
      console.error('Failed to copy HTML:', err);
    }
  };

  return (
    <div className='container'>
      <div className='interaction'>
        <a
          href='https://github.com/y0hannes/markdown-editor'
          className='github-link'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='GitHub Repository'
        >
          <i className='fab fa-github'></i>
        </a>
        <div className='button-group'>
          <button onClick={() => setMarkdown('')}>Clear All</button>
          <button onClick={copyMarkdown}>{copyMarkdownLabel}</button>
          <button onClick={copyHTML}>{copyHtmlLabel}</button>
        </div>
      </div>

      <div className='main'>
        <div className='editor-wrapper'>
          <div className='line-numbers' aria-hidden='true'>
            {markdown.split('\n').map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
          <textarea
            className='editor'
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            onScroll={(e) => {
              const gutter = document.querySelector(
                '.line-numbers'
              ) as HTMLDivElement;
              if (gutter) {
                gutter.scrollTop = (e.target as HTMLTextAreaElement).scrollTop;
              }
            }}
          />
        </div>

        <div
          className='preview'
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        />
      </div>
    </div>
  );
};

export default App;
