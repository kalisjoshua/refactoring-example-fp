const { fileContent/*, format, sort*/ } = require('./common')('Estimated Audience')

class TVReport {
  constructor(data) {
    this.dataRows = []

    // step 1 - seperate rows by newline
    const lines = fileContent.split(/\n/)
    let lineNum = 0
    let titles = false

    while (lineNum < lines.length) {
      // step 2 - cleanup and split line values
      const columns = lines[lineNum].trim().split(/\s*;\s*/)

      // step 3.1 - filter; remove rows with invalid column count
      if (TVReport.validateRow(columns)) {
        if (!titles) {
          TVShow.columns(...columns)
          titles = true
        } else {
          // step 4 - format each data-row into an object
          this.dataRows.push(new TVShow(...columns))
        }
      }

      lineNum += 1
    }
  }

  static validateRow(columns) {

    // step 3.2 - filter; remove rows with invalid column count
    return columns.length === 3
  }

  orderDesc() {

    // step 5 - organize data for display
    return this.dataRows.sort((a, b) => a.compare(b)).reverse()
  }
}

class TVShow {
  constructor(title, network, viewers) {
    this[this.columns.title] = title
    this[this.columns.network] = network
    this[this.columns.viewers] = parseInt(viewers.replace(/,/g, ''), 10)
  }

  static columns(title, network, viewers) {
    this.prototype.columns = { title, network, viewers }
  }

  // reimplement the - in a non-reusable way - the sorting functionality
  compare(otherShow) {

    return this[this.columns.viewers] - otherShow[this.columns.viewers]
  }
}

const report = new TVReport(fileContent)

console.log(report.orderDesc())
