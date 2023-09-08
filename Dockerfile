FROM squidfunk/mkdocs-material

RUN pip install --no-cache-dir \
  mkdocs-git-revision-date-localized-plugin

EXPOSE 8000

ENTRYPOINT ["mkdocs"]
CMD ["serve", "--dev-addr=0.0.0.0:8000"]

# build with: docker build -t squidfunk/mkdocs-material .
# start with: docker run --rm -it -p 127.0.0.1:8000:8000 -v ${PWD}:/docs christophdb/mkdocs-material