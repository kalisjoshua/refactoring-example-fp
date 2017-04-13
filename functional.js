const { fileContent, format, sort } = require('./common')('Estimated Audience')

const allRows = fileContent
  // step 1 - seperate rows by newline
  .split(/\n/)
  // step 2 - cleanup and split line values
  .map(row => row.trim().split(/\s*;\s*/))
  // step 3 - filter; remove rows with invalid column count
  .filter(columns => columns.length === 3)

const dataRows = allRows
  .slice(1)
  // step 4 - format each data-row into an object
  .map(format.bind(null, allRows[0]))
  // step 5 - organize data for display
  .sort(sort).reverse()

console.log(dataRows)
