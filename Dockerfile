FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY data/ ./data/
COPY images/ ./images/
COPY pre-process/ ./pre-process/
COPY bless_u-chatbot-100.ipynb .

EXPOSE 7860

# Default command - launch Jupyter to run the Gradio notebook
CMD ["jupyter", "notebook", "--ip=0.0.0.0", "--port=7860", "--no-browser", "--allow-root"]
