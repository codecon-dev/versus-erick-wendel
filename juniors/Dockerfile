FROM python:3.13-slim

WORKDIR /app
COPY . .

# Instala as dependências só se você tiver um requirements.txt.
RUN if [ -f requirements.txt ]; then pip install --no-cache-dir -r requirements.txt; fi

ENV PORT=3000
EXPOSE 3000

# Troque pelo arquivo que sobe o seu servidor.
CMD ["python", "main.py"]
