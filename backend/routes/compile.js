const express = require('express');
const axios = require('axios');

const router = express.Router();

// Enhanced mock compiler that can execute basic code patterns
const mockCompile = (language, code, input) => {
  // Basic error checking
  if (!code || code.trim().length === 0) {
    return {
      stdout: null,
      stderr: "Error: Empty code",
      compile_output: "No code provided",
      status: { description: "Compilation Error" }
    };
  }

  try {
    switch (language) {
      case 'java':
        return executeJavaCode(code, input);
      case 'python':
        return executePythonCode(code, input);
      case 'javascript':
        return executeJavaScriptCode(code, input);
      case 'c':
        return executeCCode(code, input);
      case 'cpp':
        return executeCppCode(code, input);
      default:
        return {
          stdout: null,
          stderr: "Unsupported language",
          compile_output: "Language not supported",
          status: { description: "Runtime Error" }
        };
    }
  } catch (error) {
    return {
      stdout: null,
      stderr: `Runtime Error: ${error.message}`,
      compile_output: null,
      status: { description: "Runtime Error" }
    };
  }
};

// Java code execution simulation
function executeJavaCode(code, input) {
  let output = '';

  // Extract all System.out.println statements
  const printMatches = code.match(/System\.out\.println\((.*?)\);/g);
  if (printMatches) {
    const outputs = printMatches.map(match => {
      const content = match.match(/System\.out\.println\((.*?)\);/);
      if (content) {
        const arg = content[1].trim();
        // Handle string literals
        if (arg.startsWith('"') && arg.endsWith('"')) {
          return arg.slice(1, -1);
        }
        // Handle variables (simplified)
        if (arg === 'input' && input) {
          return input;
        }
        // Handle basic expressions
        if (arg.includes('+')) {
          try {
            // Simple arithmetic
            return eval(arg.replace(/"/g, ''));
          } catch {
            return arg;
          }
        }
        return arg;
      }
      return '';
    });
    output = outputs.join('\n');
  }

  // Handle System.out.print (without newline)
  const printMatches2 = code.match(/System\.out\.print\((.*?)\);/g);
  if (printMatches2 && !printMatches) {
    const outputs = printMatches2.map(match => {
      const content = match.match(/System\.out\.print\((.*?)\);/);
      if (content) {
        const arg = content[1].trim();
        if (arg.startsWith('"') && arg.endsWith('"')) {
          return arg.slice(1, -1);
        }
        return arg;
      }
      return '';
    });
    output = outputs.join('');
  }

  // Basic validation
  if (!code.includes('public class') || !code.includes('public static void main')) {
    return {
      stdout: null,
      stderr: "Error: Invalid Java class structure",
      compile_output: "Missing main method or class declaration",
      status: { description: "Compilation Error" }
    };
  }

  return {
    stdout: output || null,
    stderr: null,
    compile_output: null,
    status: { description: "Accepted" }
  };
}

// Python code execution simulation
function executePythonCode(code, input) {
  let output = '';

  // Extract all print statements
  const printMatches = code.match(/print\((.*?)\)/g);
  if (printMatches) {
    const outputs = printMatches.map(match => {
      const content = match.match(/print\((.*?)\)/);
      if (content) {
        const arg = content[1].trim();
        // Handle string literals
        if (arg.startsWith('"') && arg.endsWith('"')) {
          return arg.slice(1, -1);
        }
        if (arg.startsWith("'") && arg.endsWith("'")) {
          return arg.slice(1, -1);
        }
        // Handle input() calls
        if (arg === 'input()' && input) {
          return input;
        }
        // Handle basic expressions
        try {
          return eval(arg);
        } catch {
          return arg;
        }
      }
      return '';
    });
    output = outputs.join('\n');
  }

  return {
    stdout: output || null,
    stderr: null,
    compile_output: null,
    status: { description: "Accepted" }
  };
}

// JavaScript code execution simulation
function executeJavaScriptCode(code, input) {
  let output = '';

  // Extract all console.log statements
  const logMatches = code.match(/console\.log\((.*?)\);?/g);
  if (logMatches) {
    const outputs = logMatches.map(match => {
      const content = match.match(/console\.log\((.*?)\);?/);
      if (content) {
        const arg = content[1].trim();
        // Handle string literals
        if (arg.startsWith('"') && arg.endsWith('"')) {
          return arg.slice(1, -1);
        }
        if (arg.startsWith("'") && arg.endsWith("'")) {
          return arg.slice(1, -1);
        }
        // Handle basic expressions
        try {
          return eval(arg);
        } catch {
          return arg;
        }
      }
      return '';
    });
    output = outputs.join('\n');
  }

  return {
    stdout: output || null,
    stderr: null,
    compile_output: null,
    status: { description: "Accepted" }
  };
}

// C code execution simulation
function executeCCode(code, input) {
  let output = '';

  // Extract all printf statements
  const printfMatches = code.match(/printf\((.*?)\);/g);
  if (printfMatches) {
    const outputs = printfMatches.map(match => {
      const content = match.match(/printf\((.*?)\);/);
      if (content) {
        const arg = content[1].trim();
        // Handle string literals
        if (arg.startsWith('"') && arg.endsWith('"')) {
          return arg.slice(1, -1);
        }
        return arg;
      }
      return '';
    });
    output = outputs.join('');
  }

  return {
    stdout: output || null,
    stderr: null,
    compile_output: null,
    status: { description: "Accepted" }
  };
}

// C++ code execution simulation
function executeCppCode(code, input) {
  let output = '';

  // Extract all cout statements
  const coutMatches = code.match(/cout\s*<<\s*(.*?);/g);
  if (coutMatches) {
    const outputs = coutMatches.map(match => {
      const content = match.match(/cout\s*<<\s*(.*?);/);
      if (content) {
        const arg = content[1].trim();
        // Handle string literals
        if (arg.startsWith('"') && arg.endsWith('"')) {
          return arg.slice(1, -1);
        }
        if (arg === 'endl') {
          return '\n';
        }
        return arg;
      }
      return '';
    });
    output = outputs.join('');
  }

  return {
    stdout: output || null,
    stderr: null,
    compile_output: null,
    status: { description: "Accepted" }
  };
}

// Compile code
router.post('/', async (req, res) => {
  const { language_id, source_code, stdin } = req.body;

  // Map language IDs to language names
  const languageMap = {
    50: 'c',      // C
    54: 'cpp',    // C++
    62: 'java',   // Java
    71: 'python', // Python
    63: 'javascript' // JavaScript
  };

  const language = languageMap[language_id] || 'python';

  try {
    // For demonstration, use mock compiler
    // To use real Judge0 API, uncomment the code below and add API key
    /*
    const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;
    const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', {
      language_id,
      source_code,
      stdin: stdin || '',
    }, {
      headers: {
        'X-RapidAPI-Key': JUDGE0_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      params: {
        base64_encoded: false,
        wait: true,
      },
    });

    res.json(response.data);
    */

    // Mock response for demonstration
    setTimeout(() => {
      const result = mockCompile(language, source_code, stdin);
      res.json(result);
    }, 1000); // Simulate processing time

  } catch (err) {
    console.error('Compiler error:', err.message);
    res.status(500).json({
      stdout: null,
      stderr: "Failed to compile/run code",
      compile_output: "Internal server error",
      status: { description: "Internal Error" },
      message: "Error: Failed to compile/run code. Please try again."
    });
  }
});

module.exports = router;