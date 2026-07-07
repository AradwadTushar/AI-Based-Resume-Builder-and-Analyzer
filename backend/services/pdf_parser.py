import io
from pdfminer.high_level import extract_text

def parse_pdf(pdf_bytes: bytes) -> str:
    """Extracts raw text from PDF binary data using pdfminer.six."""
    fp = io.BytesIO(pdf_bytes)
    text = extract_text(fp)
    return text.strip() if text else ""
