describe('Upload and download', () => {
  const path = require("path")
  const downloadsFolder = Cypress.config("downloadsFolder");
  beforeEach(function () {

    cy.visit('/upload-download')
  })

  it('1. Check all page, that visible', () => {
    cy.get('.main-header').should( 'have.text','Upload and Download')
    cy.get('#downloadButton').should('have.text', 'Download')
    cy.get('label.form-file-label').should('have.text', 'Select a file')
    cy.get('#uploadFile').should('be.visible')
  })

  it('2. Check button Download to computer', function () {


    cy.get('[id="downloadButton"]')
      .should('be.visible').click()
    cy.readFile(path.join(downloadsFolder, "sampleFile.jpeg")).should("exist")
    // cy.readFile('cypress\\downloads\\sampleFile.jpeg')
    //   .should('exist').wait(6000)
  })
  it('4. Check Select file-download from computer', function () {

    // # 1
    cy.get('[id="uploadFile"]').attachFile('images/pizza.png')
    cy.get('[id="uploadedFilePath"]').should('exist')
    //
    // # 2
    // cy.fixture('images/pizza.png').as('photo')
    // cy.get('input[type="file"]').then(function (input) {
    //   const blob = Cypress.Blob.base64StringToBlob(this.photo, 'images/png')
    //
    //   const file = new File([blob], 'images/pizza.png',{
    //     type: 'image/jpeg'
    //   })
    //   const data = new DataTransfer()
    //
    //   data.items.add(file)
    //
    //   input[0].files = data.files
    //
    //   const changeEvent = new Event('change', {
    //     bubbles: true
    //   })
    //   input[0].dispatchEvent(changeEvent)
    // })

  })
})
