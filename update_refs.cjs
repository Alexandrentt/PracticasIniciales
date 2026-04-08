const fs = require('fs');
const path = require('path');

function getFiles(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getFiles(fullPath, filesList);
        } else {
            if (fullPath.match(/\.(txt|md|html)$/i)) {
                filesList.push(fullPath);
            }
        }
    }
    return filesList;
}

const allFiles = getFiles('drive-download-20260405T164349Z-1-001');

const referencesMap = {};

for (const file of allFiles) {
    // Extract module and topic from path (e.g. "1.1", "1,4")
    const match = file.match(/(\d+)[\.,](\d+)/);
    if (!match) continue;
    
    let moduleNum = match[1];
    let topicNum = match[2];
    
    const content = fs.readFileSync(file, 'utf8');
    
    let refs = [];
    let capturing = false;
    
    const lines = content.split('\n');
    for (let line of lines) {
        let clean = line.trim();
        // Detect start of references
        if ((clean.toLowerCase().includes('bibliográfic') || clean.toLowerCase().includes('bibliografí') || clean.toLowerCase().includes('fuentes de consulta') || clean.toLowerCase().includes('referencias')) && (clean.startsWith('#') || clean.startsWith('<h') || clean.match(/^\d+\./) || clean.startsWith('**'))) {
            capturing = true;
            continue;
        }
        
        if (capturing) {
            // Stop conditions
            if ((clean.startsWith('#') || clean.startsWith('<h') || clean.startsWith('<footer') || clean.toLowerCase().includes('realizado por') || clean.toLowerCase().includes('palabras clave')) && !clean.match(/^\d+\./)) {
                capturing = false;
                continue;
            }
            
            // Clean HTML
            let noHtml = clean.replace(/<[^>]+>/g, '').trim();
            noHtml = noHtml.replace(/^[-*📚✔️■●✖]+/, '').trim();
            noHtml = noHtml.replace(/&copy;/g, '').trim();
            
            if (noHtml.length > 10 && !noHtml.toLowerCase().includes('realizado por') && !noHtml.toLowerCase().includes('universidad de san carlos')) {
                refs.push(noHtml);
            }
        }
    }
    
    if (refs.length > 0) {
        const key = `content${moduleNum}_${topicNum}`;
        referencesMap[key] = refs;
    }
}

console.log(`Found references for ${Object.keys(referencesMap).length} sub-modules.`);
for (const key in referencesMap) {
    console.log(`\n=== ${key} ===`);
    referencesMap[key].forEach(r => console.log(`  - ${r}`));
}

// Now update constants.ts
let constantsCode = fs.readFileSync('constants.ts', 'utf8');

for (const key in referencesMap) {
    const refs = referencesMap[key];
    
    // Find the declaration of the variable `const ${key}: TopicContent = {`
    const varDefRegex = new RegExp(`const\\s+${key}\\s*(?::\\s*TopicContent)?\\s*=\\s*\\{[\\s\\S]*?\\n\\};`, 'g');
    
    // Actually, we can just find 'references: [' inside the block
    let newRefsStr = 'references: [\n';
    for (const r of refs) {
        // Escape quotes
        const safeR = r.replace(/"/g, '\\"');
        newRefsStr += `    { \n      citation: "${safeR}"\n    },\n`;
    }
    newRefsStr += '  ],';
    
    // Replace inside the specific variable block using string manipulation to be safe
    const searchString = `const ${key}: TopicContent`;
    const searchString2 = `const ${key} : TopicContent`;
    const searchString3 = `const ${key} =`;
    
    let startIndex = constantsCode.indexOf(searchString);
    if (startIndex === -1) startIndex = constantsCode.indexOf(searchString2);
    if (startIndex === -1) startIndex = constantsCode.indexOf(searchString3);
    
    if (startIndex !== -1) {
        const nextConst = constantsCode.indexOf('const content', startIndex + 10);
        let blockEnd = nextConst !== -1 ? nextConst : constantsCode.length;
        
        let block = constantsCode.substring(startIndex, blockEnd);
        
        // replace references array in this block
        block = block.replace(/references:\s*\[[\s\S]*?\],/, newRefsStr);
        
        constantsCode = constantsCode.substring(0, startIndex) + block + constantsCode.substring(blockEnd);
        console.log(`Updated ${key} in constants.ts`);
    } else {
        console.log(`Could not find definition for ${key} in constants.ts`);
    }
}

fs.writeFileSync('constants_updated.ts', constantsCode, 'utf8');
console.log('constants_updated.ts has been created.');
