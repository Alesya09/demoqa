class WebTablesPage {
    get btnAdd() {
        return cy.get('#addNewRecordButton')
    }

    get searchBox() {
        return cy.get('#searchBox')
    }

    get btnPrevious() {
        return cy.get('.-previous button')
    }

    get btnNext() {
        return cy.get('.-next button')
    }

    get rowTable() {
        return cy.get('.rt-table').find('[role="rowgroup"]')
    }

    get headerThreadTable() {
        return cy.get('div .rt-thead')
    }

    get headerColumnTable() {
        return cy.get('div .rt-resizable-header')
    }

    get btnEdit() {
        return cy.get('#edit-record-1')
    }

    get btnDelete() {
        return cy.get('#delete-record-1')
    }

    get pageInfo() {
        return cy.get('.-pageInfo')
    }

    get pageTotal() {
        return cy.get('.-totalPages')
    }

    get inputPage() {
        return cy.get('input[aria-label="jump to page"]')
    }

    get closeIcon() {
        return cy.get('[class="close"]')
    }

    get firstNameLabel() {
        return cy.get('#firstName-label')
    }

    get lastNameLabel() {
        return cy.get('#lastName-label')
    }

    get userEmailLabel() {
        return cy.get('#userEmail-label')
    }

    get ageLabel() {
        return cy.get('#age-label')
    }

    get salaryLabel() {
        return cy.get('#salary-label')
    }

    get departmentLabel() {
        return cy.get('#department-label')
    }

    get inputFirstName() {
        return cy.get('input#firstName')
    }

    get inputLastName() {
        return cy.get('input#lastName')
    }

    get inputUserEmail() {
        return cy.get('input#userEmail')
    }

    get inputAge() {
        return cy.get('input#age')
    }

    get inputSalary() {
        return cy.get('input#salary')
    }

    get inputDepartment() {
        return cy.get('input#department')
    }

    get btnSubmit() {
        return cy.get('#submit')
    }

    get titleRegistrationModal() {
        return cy.get('[id="registration-form-modal"]')
    }

    get modalWindow() {
        return cy.get('[class="modal-content"]')
    }

}
export default new WebTablesPage()