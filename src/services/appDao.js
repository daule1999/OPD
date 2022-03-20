const sqlite3 = window.require('sqlite3')
const Promise = window.require('bluebird');
// const dbPath = path.join(app.getPath("userData"), "sample.db")
const fs = window.require('fs')
const path = window.require('path')
class AppDAO {
  constructor(dbFilePath) {
    // const dbDirectory = isDev
    // ? 
    // const dbDirectory = app.getAppPath() + "\\database"
    // : app.getAppPath().replace("app.asar", "localStorage");

    // if (!fs.existsSync(dbDirectory)) fs.mkdirSync(dbDirectory);

    // const dbAddress = dbDirectory + "\\client_db.db";
    const isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    console.log(fs, " fs ", "path ", path, "dbFilePath ", ":memory:")
    const filePath = isDev ? dbFilePath : path.join(window.__dirname, "..", "..", "..", "..", "..", "..", "..", "database.sqlite3")
    console.log(filePath)
    this.db = new sqlite3.Database(filePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database ', filePath)
      }
    })
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log('Error running sql ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve({ id: this.lastID })
        }
      })
    })
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
}

export default AppDAO