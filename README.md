# WSI-Products

This is a website based on the guidelines for the WSI coding assessment.

## Technologies Used

- Vanilla JavaScript
- Handlebars
- Materialize

## Features Implemented

- Responsive product grid for both desktop and mobile
- Product saving using localStorage
- Product persistence and rendering when changing sections (Reload and closing browser)
- DOM manipulation built in vanilla JavaScript
- Sass implementation

## Future Features

- SWAPPING BETWEEN LOCALSTORAGE AND SESSION STORAGE - Implementation for this is mostly done in the branch `optional-features`, with only the `add` and `remove` functionality not fully completed.
- SUCCESS MESSSAGING ON SAVE - Although I did not get to this portion, my implementation would have been to set an event listener using `window.addEventListener('storage', () => {...});` and using event to toggle a floating messaging on the top right that would fade in 5 seconds.
