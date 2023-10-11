FROM squidfunk/mkdocs-material

COPY requirements.txt .
RUN pip install -r ./requirements.txt

EXPOSE 8000

ENTRYPOINT ["mkdocs"]
CMD ["serve", "--dev-addr=0.0.0.0:8000"]
