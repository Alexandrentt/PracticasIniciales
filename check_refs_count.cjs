const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'constants.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Rough extraction of content sections and their references
const sections = content.match(/const (content\d+_\d+): TopicContent = {[\s\S]*?};/g);

if (sections) {
    sections.forEach(section => {
        const nameMatch = section.match(/const (content\d+_\d+)/);
        const name = nameMatch ? nameMatch[1] : 'unknown';
        
        const refsMatch = section.match(/references: \[([\s\S]*?)\]/);
        if (refsMatch) {
            const refs = refsMatch[1].split('},').filter(r => r.trim() !== '');
            console.log(`${name}: ${refs.length} references`);
            if (refs.length <= 3) {
                console.log(`  LOW: ${name}`);
            }
        } else {
            console.log(`${name}: NO references array found`);
        }
    });
} else {
    console.log('No sections found');
}
