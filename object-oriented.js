const { fileContent/*, format, sort*/ } = require('./common')('Estimated Audience')

class TVReport {
  constructor(data) {
    this.dataRows = []

    // step 1 - seperate rows by newline
    const lines = fileContent.split(/\n/)
    let lineNum = 0
    let showFactory

    while (lineNum < lines.length) {
      // step 2 - cleanup and split line values
      const columns = lines[lineNum].trim().split(/\s*;\s*/)

      // step 3.1 - filter; remove rows with invalid column count
      if (TVReport.validateRow(columns)) {
        if (!showFactory) {
          this.orderDesc = TVReport.orderDesc.bind(this, columns.slice(-1))
          showFactory = (...args) => new TVShow(...columns.concat(args))
        } else {
          // step 4.1 - format each data-row into an object
          this.dataRows.push(showFactory(...columns))
        }
      }

      lineNum += 1
    }
  }

  static orderDesc(sortingColumn) {

    // step 5 - organize data for display
    return this.dataRows
      .sort((a, b) => a[sortingColumn] - b[sortingColumn]).reverse()
  }

  static validateRow(columns) {

    // step 3.2 - filter; remove rows with invalid column count
    return columns.length === 3
  }
}

class TVShow {
  // step 4.2 - format each data-row into an object
  constructor(colTitle, colNetwork, colViewers, title, network, viewers) {
    this[colTitle] = title
    this[colNetwork] = network
    this[colViewers] = parseInt(viewers.replace(/,/g, ''), 10)
  }
}

const report = new TVReport(fileContent)

console.log(report.orderDesc())
