"""Build the current report from the canonical HTML template."""
from pathlib import Path
root=Path(__file__).resolve().parents[1]
(root/'index.html').write_text((root/'research/report-template.html').read_text())
print('Report generated from the current template.')
