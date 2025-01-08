# Personal Blog

## Overview

Build a personal blog to write and publish articles on various topics. The blog will have two sections: a guest section and an admin section.

### Guest Section — Pages accessible to anyone:
- **Home Page**: Displays a list of articles.
- **Article Page**: Displays the content of a specific article along with the publication date.

### Admin Section — Pages for admin access only:
- **Dashboard**: Displays a list of published articles with options to add, edit, or delete articles.
- **Add Article Page**: A form to add a new article with fields like title, content, and date of publication.
- **Edit Article Page**: A form to edit an existing article with fields like title, content, and date of publication.

## How to Implement

### Storage
Use the filesystem to store articles. Each article is saved as a separate file in a directory. The file should contain:
- Title
- Content
- Date of Publication

You can use JSON or Markdown format for storing articles.

### Backend
You can use any programming language to build the backend. This project doesn't require an API; instead, render HTML pages directly from the server. The server will handle form submissions and serve content to the frontend.

### Frontend
For the frontend, use HTML and CSS (no need for JavaScript). Use a templating engine to render articles on the frontend.

### Authentication
Implement basic authentication for the admin section:
- Use HTTP basic authentication or hardcode a username and password in the code.
- Create a simple login page that will create a session for the admin.

## Additional Features (optional)
Once completed, you can extend the project by adding:
- Comments
- Categories
- Tags
- Search functionality
