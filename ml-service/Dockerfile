# Use Python as base
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first
COPY requirements.txt .

# Install Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy all Python code
COPY . .

# Start Flask AI service
CMD ["python", "app.py"]

# Flask runs on port 8000
EXPOSE 8000
