# Weekly Performance Report Generator — AO AI Solutions

## Setup

```bash
pip install reportlab --break-system-packages
```

## Usage

### Interactive Mode (recommended)
```bash
python3 generate-report.py
```
You'll be prompted to enter each metric manually.

### CSV Mode
```bash
python3 generate-report.py --csv my-data.csv
```
CSV must have headers matching the metric names (see `config.json` for field names).

## Configuration
Edit `config.json`:
- `report_recipients` — email addresses to receive the weekly report
- `smtp` — Gmail settings (use an App Password, not your regular password)
- `targets` — adjust your weekly performance targets

## Gmail App Password Setup
1. Go to myaccount.google.com → Security → 2-Step Verification → App passwords
2. Create a new App password for "Mail"
3. Copy the 16-character password into `config.json`

## Output
Reports are saved to `./reports/week-N-report-YYYYMMDD.pdf`
