

describe('Visual Testing',()=>{

    it('should test with Percy',()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card','Using the Grid').then( firstform =>{
            cy.wait(1000)
            cy.percySnapshot('FormLayouts')
        })
    })
})