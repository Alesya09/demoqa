import {faker} from "@faker-js/faker";
describe('Web Tables', () => {
  beforeEach(function () {

    cy.visit('/webtables')
    cy.fixture("webTables.json").as("webTablesData")
    // const headings: ["First Name", "Last Name", "Age", "Email", "Salary", "Department", "Action"]
    // cy.get('.rt-tr').map('inner text').should('deep.equal', headings)

  })
  it('1.Verify web tables', function () {
    cy.get('#addNewRecordButton').should('be.visible')
    cy.get('#searchBox').should('be.visible')
    cy.get('.rt-table').find('[role="rowgroup"]').should('be.visible')
    cy.get('div .rt-thead').should('be.visible')
    this.webTablesData.headerRow.forEach(($el) =>
      cy.get('div .rt-resizable-header').should('contain', `${$el}`)
    )
    cy.get('#edit-record-1').should('be.visible')
    cy.get('#delete-record-1').should('be.visible')
  })

  it('2.Verify pagination', function () {
    cy.get('.-previous button').should('have.text', 'Previous').and('be.disabled')
    cy.get('.-next button').should('have.text', 'Next').and('be.disabled')
    cy.get('.-pageInfo').should('have.text', 'Page  of 1')
    cy.get('input[aria-label="jump to page"]').should('have.value', '1')
    cy.get('.-totalPages').should('have.text', 1)

    for(let row of this.webTablesData.selectPage){
      cy.log(row);
      cy.get('[ aria-label="rows per page"]').scrollIntoView()
        .select(`${row} rows`, {force:true})
        .should('have.value', row)
      cy.get('[class="rt-tbody"]').children().should('have.length', row)
    }
  })

    it('3.Next button pagination', () => {
      cy.get('select').select('5 rows').invoke('val').should('eq', '5')
      cy.contains('Next').as('nextButton')
      const goToNextPage = () => {
        cy.get('@nextButton').invoke('attr', 'disabled').then(disabled => {
          if (disabled === 'disabled') {
            cy.get('@nextButton').should('have.attr', 'disabled')
          } else {
            cy.get('@nextButton').click().then(goToNextPage)
          }
        })
      }
      goToNextPage()
    })

  it('4.Previous button pagination', () => {
    cy.contains('Previous').as('previousButton')
    const goToPrevioustPage = () => {
      cy.get('@previousButton').invoke('attr', 'disabled').then(disabled => {
        if (disabled === 'disabled') {
          cy.get('@previousButton').should('have.attr', 'disabled')
        } else {
          cy.get('@previousButton').click().then(goToPrevioustPage)
        }
      })
    }
    goToPrevioustPage()
  })

  it('5.Verify register form and new row in the table', function (){
    cy.get('[id="addNewRecordButton"]').should('be.visible').click()
    cy.get('[class="modal-content"]').should('be.visible')
    cy.get('[id="registration-form-modal"]').should('have.text', 'Registration Form')
    cy.get('[class="close"]').should('be.visible').click('topRight')
    cy.get('[id="addNewRecordButton"]').should('be.visible').click()

    cy.get('#firstName-label').should('have.text', 'First Name')
    cy.get('#lastName-label').should('have.text', 'Last Name')
    cy.get('#userEmail-label').should('have.text', 'Email')
    cy.get('#age-label').should('have.text', 'Age').type('19')
    cy.get('#salary-label').should('have.text', 'Salary').type('6000')
    cy.get('#department-label').should('have.text', 'Department').type('po')

    cy.get('input#firstName').should('have.attr', 'placeholder', 'First Name')
      .type('Marcel', {force: true})
    cy.get('input#lastName').should('have.attr', 'placeholder', 'Last Name')
      .type(faker.name.lastName(), {force: true})
    cy.get('input#userEmail').should('have.attr', 'placeholder', 'name@example.com')
      .type(faker.internet.email(), {force: true})
    cy.get('input#age').should('have.attr', 'placeholder', 'Age')
      .type('99', {force: true})
    cy.get('input#salary').should('have.attr', 'placeholder', 'Salary')
      .type('80000', {force: true})
    cy.get('input#department').should('have.attr', 'placeholder', 'Department')
      .type('Privet', {force: true})

    cy.get('#submit').should('be.visible').click()

    cy.get('.rt-table .rt-tr-group').find('div.rt-td').then(tableColom =>{
      cy.wrap(tableColom).should('contain', 'Marcel')
    })

    cy.get('.rt-table').contains('.rt-tr-group', 'Marcel').then(tableRow =>{
      cy.wrap(tableRow).find('div.rt-td').eq(0).should('contain', 'Marcel')
    })
  })

  it('6. Verify edit button', ()=>{
    cy.get('#edit-record-1').should('be.visible').click({force:true})
    cy.get('[class="modal-content"]').should('be.visible')
    cy.get('[id="registration-form-modal"]').should('have.text', 'Registration Form')
    cy.get('[class="close"]').should('be.visible')
    cy.get('[id="addNewRecordButton"]').should('be.visible')
    cy.get('#firstName').should('have.value', 'Cierra').clear().type(faker.name.firstName())
    cy.get('#submit').should('be.visible').click()
    cy.get('#delete-record-1').click({force: true})
  })

  it('7. Verify search field', () => {
    cy.get('#searchBox').should('be.visible').type('29')
    cy.get('.rt-tbody').each(tableRow =>{
      cy.wrap(tableRow).find('.rt-tr-group').should('contain', '29')
    });
    //
    const age = [29, 39, 45, 201]
    cy.wrap(age).each(age =>{
      cy.get('#searchBox').clear().type(age)
        cy.wait(500)
      cy.get('.rt-tbody').each(tableRow => {
        if(age == 201){
          cy.get('.rt-noData').should('contain', 'No rows found')
        } else{
          cy.wrap(tableRow).find('.rt-tr-group').should('contain', age)
        }
      })
    })

  //
    const firstName = ['Cierra', 'Alden', 'Abrakadabra']
    cy.wrap(firstName).each(firstName =>{
      cy.get('#searchBox').clear().type(firstName)
      // cy.wait(500)
      cy.get('.rt-tbody').each(tableRow => {
        if(firstName == 'Abrakadabra'){
          cy.get('.rt-noData').should('contain', 'No rows found')
        } else{
          cy.wrap(tableRow).find('.rt-tr-group').should('contain', firstName)
        }
      })
    })
  })
})
