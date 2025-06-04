import { useState, useEffect } from 'react';

type FormatType = 'plain' | 'single-quote' | 'double-quote';

const NumberFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [formatType, setFormatType] = useState<FormatType>('plain');
  const [showToast, setShowToast] = useState(false);

  const formatNumbers = () => {
    const numbers = input
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    let formattedOutput = '';
    switch (formatType) {
      case 'plain':
        formattedOutput = numbers.join(', ');
        break;
      case 'single-quote':
        formattedOutput = numbers.map(num => `'${num}'`).join(', ');
        break;
      case 'double-quote':
        formattedOutput = numbers.map(num => `"${num}"`).join(', ');
        break;
    }

    setOutput(formattedOutput);
  };

  // Format numbers whenever input or format type changes
  useEffect(() => {
    formatNumbers();
  }, [input, formatType]);

  const handleFormatButtonClick = (type: FormatType) => {
    setFormatType(type);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="three-column-layout">
      {/* Toast Notification */}
      {showToast && (
        <div className="toast">
          Output copied to clipboard!
        </div>
      )}

      {/* Left Section - Input */}
      <div className="input-section">
        <h2>Input Numbers</h2>
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
            <span>Single Quote ('28500265', '28500265')</span>
          </button>
          <button
            className={`format-button ${formatType === 'double-quote' ? 'active' : ''}`}
            onClick={() => handleFormatButtonClick('double-quote')}
          >
            <span>Double Quote ("28500265", "28500265")</span>
          </button>
        </div>
        <button onClick={handleCopy} className="copy-button">
          <span>Copy Output</span>
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