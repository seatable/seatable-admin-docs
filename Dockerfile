FROM squidfunk/mkdocs-material

RUN pip install --no-cache-dir \
  'mkdocs-redirects' \
  'mkdocs-git-revision-date-localized-plugin';

ENTRYPOINT ["mkdocs"]

