const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'contenido-academico');

function readDir(directory) {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            readDir(fullPath);
        } else if (file.endsWith('.md')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const lines = content.split('\n');
            let found = false;
            lines.forEach((line, index) => {
                if (line.toLowerCase().includes('bibliografía') || line.toLowerCase().includes('referencias')) {
                    console.log(`\n--- Found in ${fullPath} (Line ${index + 1}) ---`);
                    console.log(lines.slice(index).join('\n'));
                    found = true;
                }
            });
        }
    });
}

readDir(dir);
