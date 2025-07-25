import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ content, className = '' }) => {
  const customComponents = {
    // Headings
    h1: ({ children }) => (
      <h1 className="text-2xl font-heading font-bold text-foreground mb-4 mt-6 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-heading font-semibold text-foreground mb-3 mt-5 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-heading font-medium text-foreground mb-2 mt-4 first:mt-0">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-heading font-medium text-foreground mb-2 mt-3 first:mt-0">
        {children}
      </h4>
    ),
    
    // Paragraphs
    p: ({ children }) => (
      <p className="text-muted-foreground mb-3 leading-relaxed font-body">
        {children}
      </p>
    ),
    
    // Lists
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1 text-muted-foreground ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed font-body">
        {children}
      </li>
    ),
    
    // Emphasis
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground">
        {children}
      </em>
    ),
    
    // Code
    code: ({ children, inline }) => {
      if (inline) {
        return (
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-data text-accent">
            {children}
          </code>
        );
      }
      return (
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
          <code className="text-sm font-data text-foreground">
            {children}
          </code>
        </pre>
      );
    },
    
    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 my-4 italic text-muted-foreground bg-muted/30 py-2 rounded-r">
        {children}
      </blockquote>
    ),
    
    // Links
    a: ({ href, children }) => (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/60 transition-colors"
      >
        {children}
      </a>
    ),
    
    // Horizontal rules
    hr: () => (
      <hr className="border-border my-6" />
    ),
  };

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown components={customComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;