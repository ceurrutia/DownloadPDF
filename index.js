const express = require('express')
const PDFDocument = require('pdfkit')
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

    doc.pipe(res)
    doc.fontSize(25).text("Hi there, this is a pdf document download from website")
    doc.end()
})

const PORT = 3000
app.listen(PORT, ()=> {
    console.log(`Server running on port: ${PORT}`)
})