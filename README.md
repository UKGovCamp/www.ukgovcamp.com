# UKGovCamp Website

## Running locally

You can run this website locally to test changes before pushing them up.

This will require Node.js (we target Node.js 22, but likely any recent LTS will work too) and Git. These instructions have been tested on Linux and MacOS, Windows likely will work but I don't have a Windows machine to test with.

To clone the Git repository to your local computer:

```shell
git clone https://github.com/UKGovCamp/www.ukgovcamp.com.git
```

If you have set up an ssh key in GitHub (https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account):
```shell
git clone git@github.com:UKGovCamp/www.ukgovcamp.com.git
```

This will create a `www.ukgovcamp` directory, so navigate to it with `cd www.ukgovcamp.com`.

To run the website locally, you can use the following commands:

```shell
npm install
npm run dev
```

This will make the website available at <http://localhost:4321/>. Changes you make will automatically be rebuilt and reflected.

## Adding new pages

To add a new page, create a `.md` file in `src/pages`. See an existing page for an example, we use [GitHub Flavoured Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax), so check their documentation for how to format a page. You can also use `.astro` files if you need more complex HTML or to run code.

## How to make a new blog post

Similar to adding new pages, a blog post can be added to the `posts` directory and it will appear in the News section of the website.

The top matter of a post Markdown file should look like this:

```markdown
---
title: This is my new blog posts
author: joe.roberts
date: 2025-07-16
---
```

The `author` field should refer to a `.yaml` file in the `authors` directory, which contains metadata about authors such as name, pronouns and others to be added later.
