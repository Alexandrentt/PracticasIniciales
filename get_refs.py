import re

with open("constants.ts", "r", encoding="utf-8") as f:
    content = f.read()

sections = re.finditer(r"const (content\d+_\d+): TopicContent(.*?)\n};", content, flags=re.DOTALL)
for match in sections:
    name = match.group(1)
    body = match.group(2)
    refs_match = re.search(r"references:\s*\[(.*?)\]", body, flags=re.DOTALL)
    if refs_match:
        refs_str = refs_match.group(1)
        count = refs_str.count("{")
        print(f"{name}: {count} references")
    else:
        print(f"{name}: NO references defined")
