const { fileContent, format, sort } = require('./common')('Estimated Audience')

const pipe = (...args) => ({
  into: (fn, ...more) => pipe(fn(...args.concat(more))),
  value: args[0],
})

const dataRows = pipe(fileContent)
  // step 1 - seperate rows by newline
  .into(val => val.split('\n'))
  // step 2 - cleanup and split line values
  .into(rows => rows.map(line => line.trim().split(/\s*;\s*/)))
  // step 3 - filter; remove rows with invalid column count
  .into(columns => columns.filter(col => col.length === 3))
  // step 4 - format each data-row into an object
  .into(([titles, ...rows]) => rows.map(row => format(titles, row)))
  .value
  // step 5 - organize data for display
  .sort(sort).reverse()

console.log(dataRows)
