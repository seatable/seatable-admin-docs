## Seatable Admin Docs Repository

Welcome to the SeaTable Admin Docs Repository! 🌊🔍✨

This repository serves as the foundational source for the SeaTable Admin Manual available at https://admin.seatable.com. The admin manual is generated with the help of MkDocs Material and is a comprehensive guide and resource hub for administrators to install, configure and maintain their own SeaTable Server.

This repository contains the SeaTable Admin documentation. The documentation is built using , a fast and simple static site generator. The pages are being built using Github workflows and hosted on Github Pages.

## Content of the Admin Docs

- Installation
- Configuration
- Technical Descriptions
- Maintenance like Backup, Restore and Cleanup

## How to participate

Please fell free to particiate in the admin manual by creating pull requests. Before you do this, please test your changes in a local copy of this manual. Here is how you can do this.

> :warning: Docker is required
>
> We use Docker to create this local admin manual copy. You have to install docker first, if you don't have it already on your local machine. Use this one line command to easily install it on a linux machine:
>
> `curl -fsSL get.docker.com | bash`

### Step 1: Clone this repository and checkout a new branch

```bash
git clone https://github.com/seatable/seatable-admin-docs
cd seatable-admin-docs
git checkout -b <new_branch>
# please replace <new_branch> with something short like "fix_typo_saml_auth"
```

### Step 2: Generate your local version of the admin manual

We developed a tiny bash script to generate the local copy of the admin manual.

```bash
./preview.sh
```

Initiate your browser and access http://127.0.0.1:8000 to view a local copy of the manual. Any modifications made locally will be instantly reflected in this version. You don't even have to restart docker or reload the page.

The manual can be found within the `docs` folder. For comprehensive guidance on utilizing [MKDocs](https://www.mkdocs.org/user-guide/) or [MkDocs Material](https://squidfunk.github.io/mkdocs-material/), refer to their respective manuals for detailed instructions.

### Step 3: Create a pull request

The last step is to create a pull request will your proposed changes.

```bash
git add .
git commit -m "<commit_message>"
git push
```

### Step 4: Stop the docker container with your local admin manual copy

```bash
./preview.sh -stop
```

## Feedback and Support

Feel free to raise issues or reach out with any questions, feedback, or suggestions. We're here to support your SeaTable admin endeavors! We welcome contributions and feedback from the SeaTable community.

Another source of information is the [SeaTable community forum](https://forum.seatable.com). A lot of questions regarding the installation, configuration and maintenance was already raised and answered there.
