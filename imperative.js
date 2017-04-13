const { fileContent, format, sort } = require('./common')('Estimated Audience')

// step 1 - seperate rows by newline
const lines = fileContent.split(/\n/)

let lineNum = 0
const dataRows = []
let titles

function validateRow(columns) {

  // step 3.2 - filter; remove rows with invalid column count
  return columns.length === 3
}

while (lineNum < lines.length) {
  // step 2 - cleanup and split line values
  const columns = lines[lineNum].trim().split(/\s*;\s*/)

  // step 3.1 - filter; remove rows with invalid column count
  if (validateRow(columns)) {
    if (!titles) {
      titles = columns
    } else {
      // step 4 - format each data-row into an object
      dataRows.push(format(titles, columns))
    }
  }

  lineNum += 1
}

// step 5 - organize data for display
dataRows.sort(sort).reverse()

console.log(dataRows)
