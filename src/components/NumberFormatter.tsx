import { useState, useEffect } from 'react';

type FormatType = 'plain' | 'single-quote' | 'double-quote';

const NumberFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [formatType, setFormatType] = useState<FormatType>('plain');
  const [separator, setSeparator] = useState(',');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const formatNumbers = () => {
    const numbers = input
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    let formattedOutput = '';
    switch (formatType) {
      case 'plain':
        formattedOutput = numbers.join(separator);
        break;
      case 'single-quote':
        formattedOutput = numbers.map(num => `'${num}'`).join(separator);
        break;
      case 'double-quote':
        formattedOutput = numbers.map(num => `"${num}"`).join(separator);
        break;
    }

    setOutput(formattedOutput);
  };

  // Format numbers whenever input, format type, or separator changes
  useEffect(() => {
    formatNumbers();
  }, [input, formatType, separator]);

  // Handle toast timeout
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleFormatButtonClick = (type: FormatType) => {
    setFormatType(type);
  };

  const triggerToast = (message: string) => {
    setToastMessage(null); // Force re-render if message is same to restart animation if CSS keyframe relies on mounting, though simple text change works too. 
    // Actually CSS animation runs on mount. 
    // Ideally we'd remove and re-add element, but for now simple state switch:
    setTimeout(() => setToastMessage(message), 10);
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      triggerToast('Output copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleClear = () => {
    setInput('');
    triggerToast('Input cleared!');
  }

  return (
    <div className="three-column-layout">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast">
          {toastMessage}
        </div>
      )}

      {/* Left Section - Input */}
      <div className="input-section">
        <h2>Input</h2>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your input here"
          className="input-box"
        />
      </div>

      {/* Middle Section - Controls */}
      <div className="controls-section">
        <div className="format-options">
          <h3>Select Format:</h3>
          <button
            className={`format-button ${formatType === 'single-quote' ? 'active' : ''}`}
            onClick={() => handleFormatButtonClick('single-quote')}
          >
            <span>Single Quote ('28500265'{separator}'28500265')</span>
          </button>
          <button
            className={`format-button ${formatType === 'double-quote' ? 'active' : ''}`}
            onClick={() => handleFormatButtonClick('double-quote')}
          >
            <span>Double Quote ("28500265"{separator}"28500265")</span>
          </button>
        </div>

        <div className="separator-options">
          <h3>Separator:</h3>
          <input
            type="text"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="separator-input"
            placeholder="Enter separator (e.g. , )"
          />
        </div>

        <button onClick={handleCopy} className="copy-button">
          <span>Copy Output</span>
        </button>
        <button onClick={handleClear} className="clear-button">
          <span>Clear</span>
        </button>
      </div>

      {/* Right Section - Output */}
      <div className="output-section">
        <h2>Formatted Output</h2>
        <textarea
          value={output}
          readOnly
          className="output-box"
        />
      </div>
    </div>
  );
};

export default NumberFormatter; 