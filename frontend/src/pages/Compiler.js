import React, { useState } from 'react';
import AceEditor from 'react-ace';
import axios from 'axios';
import { toast } from 'react-toastify';

// Import Ace Editor modes and themes
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

const Compiler = () => {
  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`);
  const [language, setLanguage] = useState('java');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const languageIds = {
    c: 50,
    cpp: 54,
    java: 62,
    python: 71,
    javascript: 63,
  };

  const languageExamples = {
    c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    python: `print("Hello, World!")`,
    javascript: `console.log("Hello, World!");`
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(languageExamples[newLanguage]);
    setOutput('');
  };

  const handleRun = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to run');
      return;
    }

    setLoading(true);
    setOutput('Running code...');

    try {
      const res = await axios.post('http://localhost:5000/api/compile', {
        language_id: languageIds[language],
        source_code: code,
        stdin: input,
      });

      const result = res.data;

      if (result.stdout) {
        setOutput(result.stdout.trim());
      } else if (result.stderr) {
        setOutput(`Error: ${result.stderr}`.trim());
      } else if (result.compile_output) {
        setOutput(`Compilation Error: ${result.compile_output}`.trim());
      } else if (result.message) {
        setOutput(result.message.trim());
      } else {
        setOutput('Code executed successfully (no output)');
      }
    } catch (err) {
      console.error('Compiler error:', err);
      setOutput('Error: Failed to compile/run code. Please try again.');
      toast.error('Failed to run code');
    }
    setLoading(false);
  };

  const clearCode = () => {
    setCode(languageExamples[language]);
    setOutput('');
  };

  const clearOutput = () => {
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Online Code Compiler</h1>
              <p className="text-gray-600">Write, compile, and run code in multiple programming languages</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
              <span className="font-medium">{language.toUpperCase()} Editor</span>
              <button
                onClick={clearCode}
                className="text-gray-300 hover:text-white text-sm underline"
              >
                Clear
              </button>
            </div>
            <div className="h-96">
              <AceEditor
                mode={language === 'cpp' ? 'c_cpp' : language}
                theme="github"
                value={code}
                onChange={setCode}
                name="code-editor"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                  fontSize: 14,
                  showPrintMargin: false,
                  showGutter: true,
                  highlightActiveLine: true,
                }}
                width="100%"
                height="100%"
                className="rounded-b-lg"
              />
            </div>
          </div>

          {/* Input/Output Panel */}
          <div className="space-y-6">
            {/* Input */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-800 text-white px-4 py-3">
                <span className="font-medium">Input (Optional)</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input for your program..."
                className="w-full h-32 p-4 border-0 resize-none focus:ring-0"
                style={{ minHeight: '128px' }}
              />
            </div>

            {/* Output */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
                <span className="font-medium">Output</span>
                <button
                  onClick={clearOutput}
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Clear
                </button>
              </div>
              <div className="h-32 bg-gray-900 text-green-400 p-4 font-mono text-sm overflow-auto">
                {output || 'Output will appear here...'}
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRun}
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 btn-primary animate-fade-in-up animate-delay-300 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 transform hover:scale-105 shadow-lg animate-pulse-gentle'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner mr-2"></div>
                  Running...
                </div>
              ) : (
                '🚀 Run Code ▶️'
              )}
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Supported Languages</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'C', icon: '⚙️' },
              { name: 'C++', icon: '🔧' },
              { name: 'Java', icon: '☕' },
              { name: 'Python', icon: '🐍' },
              { name: 'JavaScript', icon: '⚡' }
            ].map(lang => (
              <div key={lang.name} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">{lang.icon}</div>
                <div className="font-medium text-gray-800">{lang.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;