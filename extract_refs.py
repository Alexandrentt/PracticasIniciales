import os
import re

base_dir = "drive-download-20260405T164349Z-1-001"

for root_dir, dirs, files in os.walk(base_dir):
    # sort files to process them in order
    files.sort()
    for file in files:
        if file.endswith(('.txt', '.md', '.html', '.HTML')):
            path = os.path.join(root_dir, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                
                # Check for "Bibliograf" or "Fuentes de Consulta"
                if "bibliograf" in content.lower() or "fuentes de consulta" in content.lower() or "referencias" in content.lower():
                    lines = content.split('\n')
                    capturing = False
                    refs = []
                    for line in lines:
                        clean_line = line.strip()
                        if re.search(r'(?i)(bibliograf|fuentes de consulta|referencias)', clean_line) and re.search(r'^(#|\<h|\d\.)', clean_line) or re.search(r'^\*{2}Referencias', clean_line):
                            capturing = True
                            continue
                        
                        if capturing:
                            # stop capturing on next major heading or footer
                            if re.search(r'^(#|\<h|\d\.\s*[A-Z]|<footer|Realizado por|Palabras Clave)', clean_line) and not re.search(r'^\d+\.', clean_line):
                                capturing = False
                                break
                            
                            if clean_line and len(clean_line) > 10 and not clean_line.startswith('<'):
                                # strip html tags
                                stripped = re.sub(r'<[^>]+>', '', clean_line).strip()
                                # strip markdown list chars
                                stripped = re.sub(r'^[-*]\s*', '', stripped)
                                # strip emoji
                                stripped = re.sub(r'[📚✔️■●✖]', '', stripped).strip()
                                stripped = stripped.replace("&copy;", "")
                                if len(stripped) > 10 and "Realizado por" not in stripped and "Universidad de San Carlos" not in stripped and "Centro Universitario" not in stripped:
                                    refs.append(stripped)
                                
                    if refs:
                        print(f"=== {file} === ")
                        for r in refs:
                            print(f" - {r}")
                        print("\n")
