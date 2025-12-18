
import os
import re

def to_pascal_case(text):
    return ''.join(x.title() for x in text.split('-'))

def populate_empty_components(root_dir):
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith('.component.ts'):
                filepath = os.path.join(dirpath, filename)
                if os.path.getsize(filepath) == 0:
                    basename = filename.replace('.component.ts', '')
                    class_name = to_pascal_case(basename) + 'Component'
                    selector = 'app-' + basename
                    
                    content = f"""import {{ Component }} from '@angular/core';
import {{ CommonModule }} from '@angular/common';

@Component({{
  selector: '{selector}',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">{class_name}</h1>
      <p class="text-gray-600">This feature is under construction.</p>
    </div>
  `
}})
export class {class_name} {{}}
"""
                    with open(filepath, 'w') as f:
                        f.write(content)
                    print(f"Populated {filepath}")

if __name__ == "__main__":
    populate_empty_components('/home/jonas-dev/Bureau/Tourno/frontend/src/app/features')
