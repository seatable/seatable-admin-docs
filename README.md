## Seatable Admin Docs

This repository contains the SeaTable Admin documentation. The documentation is built using [MkDocs](https://www.mkdocs.org/), a fast and simple static site generator that's perfect for building project documentation. The pages are being built using Github workflows and hosted on Github Pages.

### Usage

To build and view the documentation locally, you can use the following commands:

- Clone this repository & Checkout a new branch
- Make changes and review them locally (with docker)
- Commit and push your changes
- Create a pull request


```bash
git clone <this_repo>
cd <this_repos_directory>
git checkout -b <new_branch>
```
```bash
sudo docker build -t seatable-admin-docs-local .
```
```bash
sudo docker run --rm -it -d -p 127.0.0.1:8000:8000 -v ${PWD}:/docs seatable-admin-docs-local \
--name seatable-admin-docs-local
```
`# changes in the /docs directory can be previewed at http://127.0.0.1:8000`
```bash
git add <relevant_changes> && git commit -m "<commit_message>"
```