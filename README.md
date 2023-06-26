# JNC-API
This code is a JavaScript function that fetches data from a JSON file and dynamically creates HTML elements based on the retrieved data. It specifically targets books authored by "Miya Kazuki".

### Usage

To use this code, follow these steps:

1. Include the JavaScript code in your project.
2. Call the `newFunction()` function to execute the code.

```javascript
newFunction();
```

### Function Description

The `newFunction()` function performs the following tasks:

1. Waits for the DOM to be fully loaded.
2. Fetches JSON data from the file "en.json".
3. Parses the JSON data and retrieves the latest book titles.
4. Iterates through the book data and checks if the author is "Miya Kazuki".
5. If the author matches, it creates a new `<div>` element with the class name "book".
6. Inside the book element, it creates:
   - An `<h2>` element for the book title.
   - An `<img>` element for the book cover, with the source and alt attributes set.
   - A `<p>` element for the book description.
   - A `<p>` element for the book author.
7. Appends the created elements to the "books" container element.

Note: Ensure that you have an HTML element with the id "books" in your HTML file to contain the dynamically created book elements.

### Dependencies

This code depends on the availability of a file named "en.json" in the same directory. The JSON file should have the necessary data structure with the latest book titles.

### Error Handling

If any error occurs during the fetching or processing of the JSON data, it will be logged to the console.

Feel free to modify and adapt this code to suit your specific requirements.
