const electron = window.require('electron');
const { ipcRenderer } = electron;
const path = window.require('path')
const data = [{ type: 'text', value: 'This is sample thermal print' }, {
    type: 'barCode',
    value: 'HB4587896',
    height: 12,                     // height of barcode, applicable only to bar and QR codes
    width: 1,                       // width of barcode, applicable only to bar and QR codes
    displayValue: true,             // Display value below barcode
    fontsize: 8,
}, {
    type: 'qrCode',
    value: 'https://github.com/Hubertformin/electron-pos-printer',
    height: 55,
    width: 55,
    style: 'margin: 10 20px 20 20px'
}, {
    type: 'table',
    style: 'border: 1px solid #ddd',
    value: 'table',           // style the table
    // list of the columns to be rendered in the table header
    tableHeader: [{ type: 'text', value: 'Animal' }, { type: 'image', path: path.join(__dirname, 'icons/animal.png') }],
    // multi dimensional array depicting the rows and columns of the table body
    tableBody: [
        [{ type: 'text', value: 'Cat' }, { type: 'image', path: './animals/cat.jpg' }],
        [{ type: 'text', value: 'Dog' }, { type: 'image', path: './animals/dog.jpg' }],
        [{ type: 'text', value: 'Horse' }, { type: 'image', path: './animals/horse.jpg' }],
        [{ type: 'text', value: 'Pig' }, { type: 'image', path: './animals/pig.jpg' }],
    ],
    // list of columns to be rendered in the table footer
    tableFooter: [{ type: 'text', value: 'Animal' }, 'Image'],
    // custom style for the table header
    tableHeaderStyle: 'background-color: #000; color: white;',
    // custom style for the table body
    tableBodyStyle: 'border: 0.5px solid #ddd',
    // custom style for the table footer
    tableFooterStyle: 'background-color: #000; color: white;',
},]
export function printData(data) {
    console.log('printing......', data)
    ipcRenderer.send('print', JSON.stringify(data))
}

export default function send(sql) {
    return new Promise((resolve) => {
        ipcRenderer.once('asynchronous-reply', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('asynchronous-message', sql);
    });
}
