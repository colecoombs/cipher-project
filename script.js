function encrypt() {
    const cipher = document.getElementById('cipherSelect').value;
    const key = parseInt(document.getElementById('keyInput').value);
    const text = document.getElementById('inputText').value;
  
    let result = '';
    if (cipher === 'caesar') {
      result = caesarCipher(text, key);
    } else if (cipher === 'scytale') {
      result = scytaleCipherEncrypt(text, key);
    }
    document.getElementById('outputText').value = result;
  }
  
  function decrypt() {
    const cipher = document.getElementById('cipherSelect').value;
    const key = parseInt(document.getElementById('keyInput').value);
    const text = document.getElementById('inputText').value;
  
    let result = '';
    if (cipher === 'caesar') {
      result = caesarCipher(text, -key);
    } else if (cipher === 'scytale') {
      result = scytaleCipherDecrypt(text, key);
    }
    document.getElementById('outputText').value = result;
  }
  
  function caesarCipher(text, shift) {
    return text.replace(/[a-z]/gi, (char) => {
      const base = char >= 'a' ? 97 : 65;
      return String.fromCharCode((char.charCodeAt(0) - base + shift + 26) % 26 + base);
    });
  }
  
// Encrypt with Scytale Cipher
function scytaleCipherEncrypt(text, key) {
    const cleanText = text.replace(/\s/g, '');
    const rows = Math.ceil(cleanText.length / key);
    let result = '';
  
    console.log(`Encrypting "${text}" with key = ${key}`);
    console.log(`Clean text: "${cleanText}"`);
    console.log(`Rows: ${rows}, Columns (key): ${key}`);
  
    for (let col = 0; col < key; col++) {
      for (let row = 0; row < rows; row++) {
        const idx = row * key + col;
        if (idx < cleanText.length) {
          result += cleanText[idx];
          console.log(`Reading index ${idx}: "${cleanText[idx]}"`);
        }
      }
    }
  
    console.log(`Encrypted result: "${result}"`);
    return result;
  }
  
  
  // Decrypt with Scytale Cipher
  function scytaleCipherDecrypt(text, key) {
    const numCols = Math.ceil(text.length / key);
    const numRows = key;
    const totalChars = text.length;
    const shortCols = (numCols * numRows) - totalChars;
  
    console.log(`Decrypting "${text}" with key = ${key}`);
    console.log(`Rows (key): ${numRows}, Cols: ${numCols}`);
    console.log(`Total characters: ${totalChars}, Short columns: ${shortCols}`);
  
    let result = new Array(totalChars);
    let index = 0;
  
    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row < numRows; row++) {
        const pos = row * numCols + col;
        if (col === numCols - 1 && row >= numRows - shortCols) continue;
        if (index < totalChars) {
          result[pos] = text[index];
          console.log(`Placing "${text[index]}" at result[${pos}]`);
          index++;
        }
      }
    }
  
    const finalResult = result.join('');
    console.log(`Decrypted result: "${finalResult}"`);
    return finalResult;
  }
  
  
  
  