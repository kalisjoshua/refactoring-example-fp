const fileContent = require('fs').readFileSync('./tv-shows.csv', 'utf8')

function add(obj, prop, value, isNumber) {
  obj[prop] = isNumber ? +(value.replace(/,/g, '')) : value

  return obj
}

function factory(str) {
  const api = {
    fileContent,
    format: formatRowData.bind(null, str),
    sort: (a, b) => a[str] - b[str],
  }

  return api
}

function formatRowData(col, titles, row) {

  return row
    .reduce((acc, val, i) => add(acc, titles[i], val, titles[i] === col), {})
}

module.exports = factory
