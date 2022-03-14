const { ipcMain } = require('electron');
const { PosPrinter } = require('electron-pos-printer')
// const sqlite3 = require('sqlite3');
// const database = new sqlite3.Database('./public/db.sqlite3', (err) => {
//     if (err) console.error('Database opening error: ', err);
// });

ipcMain.on('asynchronous-message', (event, arg) => {
    const sql = arg;
    database.all(sql, (err, rows) => {
        event.reply('asynchronous-reply', (err && err.message) || rows);
    });
});
ipcMain.on('print', (event, arg) => {
    const data = JSON.parse(arg)
    PosPrinter.print(data, {
        printerName: 'XPC-80',
        silent: true,
        preview: true
    })
        .catch(err => console.error(err))

})
