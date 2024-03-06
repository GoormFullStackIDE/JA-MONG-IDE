import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';
import tomorrowTheme from 'monaco-themes/themes/Tomorrow.json';

function App() {
  const [code, setCode] = useState('// 여기에 코드를 작성하세요.\n');
  const [language, setLanguage] = useState('javascript');

  const onLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const onChange = (newValue, e) => {
    setCode(newValue);
  };

  const sendCodeToServer = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/code', { code, language });
      console.log('Server response:', response.data);
      handleEditorChange();
    } catch (error) {
      console.error('Error sending code to server:', error);
    }
  };

  const handleEditorChange = (value) => {
    console.log('here is the current model value:', value);
  }

  return (
    <div>
      <MonacoEditor
        width="800"
        height="600"
        language={language}
        theme="light"
        value={code}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          automaticLayout: true,
          fontSize: 16,
          minimap: { enabled: true },
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
          }
        }}
        onChange={onChange}
      />
      <button onClick={sendCodeToServer}>코드 제출</button>
    </div>
  );
}

export default App;