# SQLQuickView

## Overview

SQLQuickView is a user-friendly SQL table management and querying tool designed to simplify the management of SQL databases. It provides an intuitive interface for interacting with your tables, executing queries, and exporting query results.

## Features

SQLQuickView offers the following features tailored to meet the requirements of users:

- **Schema View**: Easily explore the schema of selected tables.

- **Export to CSV**: Export query results to CSV format for convenient data retrieval.

- **Popular Query Options**: Access common queries with a single click.

- **Recent Queries**: Keep track of and re-run your recently executed queries.

- **TextArea Shortcuts**: Utilize shortcuts like `/SELECT` and `SHIFT+ENTER` for a streamlined querying experience.Also you can navigate through your recent queries using `UP ARROW`and `DOWN ARROW`

## Technology Stack

SQLQuickView is built using the following technologies:

- JavaScript Library: [React.js]
- Major Plugins/Packages: [[react-split-pane](https://www.npmjs.com/package/split-pane-react), [React-vertualised](https://www.npmjs.com/package/react-virtualized), [papaparse](https://www.npmjs.com/package/papaparse)]
- Frontend: [Custom CSS]
- Hosted On: [Netlify]

## Performance

**Page Load Time:**
The average page load time for SQLQuickView is approximately [603] ms. Measured this time using [[GTMetrix](https://gtmetrix.com/)]

**Lighthouse Performance Scores:**
![Lighthouse Performance Report](https://raw.githubusercontent.com/pritamkushwah04/SQLQuikView/master/public/Image/Lighthouse%20Performance%20Report.png)


## Optimizations

To enhance the performance and decrease the load time of SQLQuickView, we have implemented the following optimizations:

- **Code Splitting**: Employed code splitting techniques to split our JavaScript bundle into smaller chunks, improving initial load times.

- **Lazy Loading**: Table component lazy-loaded to reduce the initial load time.

- **Caching Strategies**: Cached the parsedData using the useMemo Hook.

- **ReactVirtualised**: Used React-virtualized to render the table optimally by only rendering the visible rows in the window.


## Handling Large Data Sets

SQLQuickView is designed to efficiently handle large data sets (tested up to 1,00,000 cells) without overloading the browser or causing crashes. Our optimized data fetching and rendering strategies ensure a smooth user experience, even when working with extensive data.

## Brownie Points

SQLQuickView takes pride in its ability to render a large amount of rows without breaking the browser or causing crashes. The performance optimizations and efficient data handling techniques make working with extensive data a breeze.

