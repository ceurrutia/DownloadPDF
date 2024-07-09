const express = require('express')
const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')
const app = express()

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))

app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/download', (req, res) =>{
    const doc = new PDFDocument()
    const fileName = 'downloadedFile.pdf'

    res.setHeader('Content-disposition', `attachment; filename=${fileName}`)
    res.setHeader('Content-type', 'application/pdf')

    const filePath = path.join(__dirname, 'elcollar.txt')

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err)
            res.status(500).send('Error reading the file')
            return;
        }

        //Para generar el pdf con contenido que esta ene l html

        doc.pipe(res)
        doc.fontSize(14).text(data, {
            width: 400,
            align: 'left'
        })
        doc.end()
    })

    //levantar en .pdf un texto plano
    //doc.pipe(res)
    //doc.fontSize(25).text("Hi there, this is a pdf //document download from website")
    //doc.end()
})

const PORT = 3000
app.listen(PORT, ()=> {
    console.log(`Server running on port: ${PORT}`)
})