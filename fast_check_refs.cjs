const fs = require('fs');

const content = fs.readFileSync('constants.ts', 'utf8');

const lines = content.split('\n');
let currentContent = null;
let inReferences = false;
let refCount = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^const (content\d+_\d+)/);
    if (match) {
        currentContent = match[1];
        inReferences = false;
        refCount = 0;
    }

    if (currentContent && line.includes('references: [')) {
        inReferences = true;
    }

    if (inReferences) {
        if (line.includes('{ citation:')) {
            refCount++;
        }
        if (line.includes('],')) {
            console.log(`${currentContent}: ${refCount} references`);
            inReferences = false;
            currentContent = null;
        }
    }
}
