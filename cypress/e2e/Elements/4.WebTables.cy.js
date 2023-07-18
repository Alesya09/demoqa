import {faker} from "@faker-js/faker";
import WebTablesPage from "../../pages/Elements/webTables.page";

describe('Web Tables', () => {
  beforeEach(function () {

    cy.visit('/webtables')
    cy.fixture("webTables.json").as("webTablesData")
    // const headings: ["First Name", "Last Name", "Age", "Email", "Salary", "Department", "Action"]
    // cy.get('.rt-tr').map('inner text').should('deep.equal', headings)

  })
  it('1.Verify web tables', function () {
    WebTablesPage.btnAdd.should('be.visible')
    WebTablesPage.searchBox.should('be.visible')
    WebTablesPage.rowTable.should('be.visible')
    WebTablesPage.headerThreadTable.should('be.visible')
    this.webTablesData.headerRow.forEach(($el) =>
      WebTablesPage.headerColumnTable.should('contain', `${$el}`)
    )
    WebTablesPage.btnEdit.should('be.visible')
    WebTablesPage.btnDelete.should('be.visible')
  })

  it('2.Verify pagination', function () {
    WebTablesPage.btnPrevious.should('have.text', 'Previous').and('be.disabled')
    WebTablesPage.btnNext.should('have.text', 'Next').and('be.disabled')
    WebTablesPage.pageInfo.should('have.text', 'Page  of 1')
    WebTablesPage.inputPage.should('have.value', '1')
    WebTablesPage.pageTotal.should('have.text', 1)

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
    WebTablesPage.btnAdd.should('be.visible').click()
    WebTablesPage.modalWindow.should('be.visible')
    WebTablesPage.titleRegistrationModal.should('have.text', 'Registration Form')
    WebTablesPage.closeIcon.should('be.visible').click('topRight')
    WebTablesPage.btnAdd.should('be.visible').click()

    WebTablesPage.firstNameLabel.should('have.text', 'First Name')
    WebTablesPage.lastNameLabel.should('have.text', 'Last Name')
    WebTablesPage.userEmailLabel.should('have.text', 'Email')
    WebTablesPage.ageLabel.should('have.text', 'Age').type('19')
    WebTablesPage.salaryLabel.should('have.text', 'Salary').type('6000')
    WebTablesPage.departmentLabel.should('have.text', 'Department').type('po')

    WebTablesPage.inputFirstName.should('have.attr', 'placeholder', 'First Name')
      .type('Marcel', {force: true})
    WebTablesPage.inputLastName.should('have.attr', 'placeholder', 'Last Name')
      .type(faker.name.lastName(), {force: true})
    WebTablesPage.inputUserEmail.should('have.attr', 'placeholder', 'name@example.com')
      .type(faker.internet.email(), {force: true})
    WebTablesPage.inputAge.should('have.attr', 'placeholder', 'Age')
      .type('99', {force: true})
    WebTablesPage.inputSalary.should('have.attr', 'placeholder', 'Salary')
      .type('80000', {force: true})
    WebTablesPage.inputDepartment.should('have.attr', 'placeholder', 'Department')
      .type('Privet', {force: true})

    WebTablesPage.btnSubmit.should('be.visible').click()

    cy.get('.rt-table .rt-tr-group').find('div.rt-td').then(tableColom =>{
      cy.wrap(tableColom).should('contain', 'Marcel')
    })

    WebTablesPage.rowTable.contains('.rt-tr-group', 'Marcel').then(tableRow =>{
      cy.wrap(tableRow).find('div.rt-td').eq(0).should('contain', 'Marcel')
    })
  })

  it.only('6. Verify edit button', ()=>{
    WebTablesPage.btnEdit.should('be.visible').click({force:true})
    WebTablesPage.modalWindow.should('be.visible')
    WebTablesPage.titleRegistrationModal.should('have.text', 'Registration Form')
    WebTablesPage.closeIcon.should('be.visible')
    WebTablesPage.btnAdd.should('be.visible')
    WebTablesPage.inputFirstName.should('have.value', 'Cierra').clear().type(faker.name.firstName())
    WebTablesPage.btnSubmit.should('be.visible').click()
    WebTablesPage.btnDelete.click({force: true})
  })

  it('7. Verify search field', () => {
    WebTablesPage.searchBox.should('be.visible').type('29')
    cy.get('.rt-tbody').each(tableRow =>{
      cy.wrap(tableRow).find('.rt-tr-group').should('contain', '29')
    });
    //
    const age = [29, 39, 45, 201]
    cy.wrap(age).each(age =>{
      WebTablesPage.searchBox.clear().type(age)
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
      WebTablesPage.searchBox.clear().type(firstName)
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
