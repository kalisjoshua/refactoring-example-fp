const { fileContent, format, sort } = require('./common')('Estimated Audience')

const compose = (...fns) =>
  fns.reduceRight((g, f) => (...args) => f(g(...args)))

const composition = compose(
  // step 5 - organize data for display
  rows => rows.sort(sort).reverse(),
  // step 4 - format each data-row into an object
  ([titles, ...rows]) => rows.map(row => format(titles, row)),
  // step 3 - filter; remove rows with invalid column count
  columns => columns.filter(col => col.length === 3),
  // step 2 - cleanup and split line values
  rows => rows.map(line => line.trim().split(/\s*;\s*/)),
  // step 1 - seperate rows by newline
  val => val.split('\n')
)

const dataRows = composition(fileContent)

console.log(dataRows)
