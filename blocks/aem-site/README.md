# AEM Site Project

This project is built using Adobe Experience Manager (AEM) Sites as a Cloud Service, leveraging Edge Delivery Services for optimal performance and user experience. The structure of the project is designed to facilitate easy authoring and maintenance of web content.

## Project Structure

```
aem-site
├── blocks
│   ├── cardsfirst
│   │   ├── cardsfirst.js       # JavaScript logic for the "cardsfirst" block
│   │   └── cardsfirst.css      # CSS styles for the "cardsfirst" block
│   └── columnsfirst
│       ├── columnsfirst.js     # JavaScript logic for the "columnsfirst" block
│       └── columnsfirst.css    # CSS styles for the "columnsfirst" block
├── scripts
│   ├── aem.js                  # Core AEM library for page decoration logic
│   ├── scripts.js              # Global JavaScript utilities
│   └── delayed.js              # Functionality for loading non-critical resources
├── styles
│   ├── styles.css              # Global styling for the website
│   ├── lazy-styles.css         # Additional styling for below-the-fold content
│   └── fonts.css               # Font definitions
├── fonts                       # Directory for web fonts
├── icons                       # Directory for SVG icons
├── head.html                  # Global HTML head content
├── 404.html                   # Custom 404 error page
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Install Dependencies**: Run `npm install` to install all necessary packages.
2. **Start Local Development**: Use `npx -y @adobe/aem-cli up --no-open --forward-browser-logs` to start the local development server.
3. **Access the Development Server**: Open your browser and navigate to `http://localhost:3000` to view the project.
4. **Run Linting**: Before committing changes, ensure to run `npm run lint` to check for code quality.
5. **Auto-Fix Linting Issues**: Use `npm run lint:fix` to automatically fix any linting issues.

## Block Overview

### Cards First Block
- **JavaScript**: Transforms the block's structure into a list format using `<ul>` and `<li>` elements.
- **CSS**: Defines the layout and appearance of the cards.

### Columns First Block
- **JavaScript**: Similar to the "cardsfirst" block, this block will transform content into a responsive column layout.
- **CSS**: Styles specific to the "columnsfirst" block to ensure responsiveness and visual alignment.

## Performance and Accessibility
- Follow AEM Edge Delivery performance best practices to ensure optimal loading times and user experience.
- Ensure all content is accessible, following WCAG 2.1 AA guidelines.

## Contribution Guidelines
- Follow the existing code style and patterns.
- Test changes locally before committing.
- Update documentation for significant changes.

For more detailed information, refer to the individual block documentation and the AEM Edge Delivery documentation.