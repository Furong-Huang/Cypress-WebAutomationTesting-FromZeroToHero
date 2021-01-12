/// <reference types="cypress" />

const { table } = require("console")

describe('Our first suite',()=>{

    it('first test',() =>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by Tag Name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class name
        cy.get('.input-full-width')

        //by Attribute name
        cy.get('[placeholder]')

        //by Attribute name and value
        cy.get('[placeholder="Email"]')

        //by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by Tag name and Attribute with value
        cy.get('input[placeholder="Email"]')

        //by two different attributes
        cy.get('[placeholder="Email"][type="email"]')

        //by tag name, Attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //The most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]')

        cy.get('input[placeholder="Jane Doe"]').type('Don Huang')
        cy.get('form.form-inline').find('input[placeholder="Email"]').type('374373925@qq.com')
        // cy.get('form.form-inline').find('[class="custom-checkbox"]').then( $checkbox =>{
        //     if(expect($checkbox).not.to.checked)
        //     {cy.get($checkbox).click()}
        // })

        cy.contains('nb-card','Inline form')
          .find('nb-checkbox')
          .click()
          .find('.custom-checkbox')
          .invoke('attr','class')
          //.should('contain','checked')
          .then(classValue => {
              expect(classValue).to.contain('checked')
          })

          cy.contains('nb-card','Submit').find('[type="submit"]').should('contain','Submit')


    })

    it('My Toaster Page Test',()=>{

        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('input[type="checkbox"]')
          .first(0)
          .check({force: true})
          
        cy.get('nb-checkbox.ng-valid')
          .invoke('attr','ng-reflect-model')
          .should('contain','true')

        cy.get('input[type="checkbox"]').eq(1).check({force: true})
        cy.get('input[type="checkbox"]').last(1).check({force: true})
        
        cy.get('div.form-group').find('button.select-button').first().click()
        cy.get('nb-option[ng-reflect-value="top-end"]').click()
        cy.get('div.form-group').find('button.select-button').first().should('contain','top-end')

        cy.get('nb-card-body nb-select').first().then( dropdown =>{
            
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem,index) =>{
                
                const itemtext = listItem.text()

                cy.get('.options-list nb-option').contains(itemtext).click()
                cy.wrap(dropdown).should('contain', itemtext)
                cy.wrap(dropdown).click()
            })
        })


    })

    it('second test',() =>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')

        cy.contains('Sign in')

        cy.contains('[status="warning"]','Sign in')

        //cy.get() is searching element in the entire Dom and then you change the get from the cy or from any other element
        //find method is to find the child from the parent element and find method accept the same type of selector,
        //which is the same as the get mehtod
        cy.get('#inputEmail3')
          .parents('form')
          .find('button')       
          .should('contain','Sign in')
          .parents('form')
          .find('nb-checkbox')
          .click()

          //cy.contains can find element by text, and find element by text with selector
          //cy.contains can find only one web element, and can change any other element
          cy.contains('nb-card','Horizontal form').find('[type="email"]')
    })

    it('then and wrap methods',()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        

        // cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
        // cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain','Password')
        // cy.contains('nb-card','Basic form').find('[for="exampleInputEmail1"]').should('contain','Email address')
        // cy.contains('nb-card','Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')

        //selenium
        //const firstForm = cy.contains('nb-card','Using the Grid')
        //const secondForm = cy.contains('nb-card','Basic form')

        // firstForm.find('[for="inputEmail1"]').should('contain','Email')
        // firstForm.find('[for="inputPassword2"]').should('contain','Password')
        // secondForm.find('[for="exampleInputEmail1"]').should('contain','Email address')

        
        //cypress style
        cy.contains('nb-card','Using the Grid').then( firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card','Basic form').then( secondForm =>{
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain','Password')
            })
        })

    })

    it('invoke command',() =>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail1"]')
          .should('contain','Email address')
          .should('have.class','label')
          .and('have.text','Email address')

        //2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
            expect(label).to.have.class('label')
            expect(label).to.have.text('Email address')
        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text =>{
            expect(text).to.equal('Email address')
        })

        //the first example of using invoke function is getting the attribute values and 
        //making some assertion with value or anything.
        cy.contains('nb-card','Basic form')
          .find('nb-checkbox')
          .click()
          .find('.custom-checkbox')
          .invoke('attr','class')
          //.should('contain','checked')
          .then(classValue => {
              expect(classValue).to.contain('checked')
          })

    })

    it('assert property',() =>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        //const monthShortNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        let date = new Date()
        date.setDate(date.getDate() + 40)
        let futureDay = date.getDate()
        //let futureMonth = monthShortNames[date.getMonth()]    //alternative way to get short name of months
        let futureMonth = date.toLocaleString('en-US',{month:'short'})
        let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()

 
        cy.contains('nb-card','Common Datepicker').find('input').then(input =>{
            cy.wrap(input).click()
            selectDayFormCurrent()
            function selectDayFormCurrent(){
                cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date').then( dateAttribute =>{
                    if(!dateAttribute.includes(futureMonth)){
                        cy.get('[data-name="chevron-right"]').click()
                        selectDayFormCurrent()
                    } else {
                        cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                    }
                })
                return dateAssert
            }

            cy.visit('/')
            cy.contains('Forms').click()
            cy.contains('Datepicker').click()

            cy.contains('nb-card','Common Datepicker').find('input').then(input =>{
                cy.wrap(input).click()
                let dateAssert = selectDayFormCurrent(2)
                cy.wrap(input).invoke('prop','value').should('contain', dateAssert)
                cy.wrap(input).should('have.value',dateAssert)
            })
            
            // cy.get('nb-calendar-picker').contains('17').click()
            // cy.wrap(input).invoke('prop','value').should('contain','Nov 17, 2020')
        })

    })

    it('radio button',() =>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card','Using the Grid').find('[type="radio"]').then( radioButtons =>{
            cy.wrap(radioButtons)
              .first()
              .check({force: true})
              .should('be.checked')

            cy.wrap(radioButtons)
            .eq(1)
            .check({force: true})

            cy.wrap(radioButtons)
              .eq(0)
              .should('not.be.checked')

            cy.wrap(radioButtons)
              .eq(2)
              .should('be.disabled')
        })
    })

    it('check boxes',() =>{

        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        //summarize this when to use check and when to use click.
        //Check method is only to work with the elements of type checkbox and radio buttons
        //Check method will work only with input elements and the type of this input element should be checkbox or radio buttons.
        //Check method will not work on any other type of the elements 
        //Check method can peek and check multiple check boxes
        //And also check method can only check your checkbox but cannot uncheck your check box.
        //You can also use click method to work with check boxes and radio button.
        cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.get('[type="checkbox"]').eq(1).click({force: true})

    })

    it('lists and dropdown',()=>{

        cy.visit('/')

        // cy.get('nav nb-select').click()
        // //cy.get('nb-layout-header nb-select').click()
        // cy.get('.options-list').contains('Dark').click()
        // cy.get('nav nb-select').should('contain','Dark')
        // cy.get('nb-layout-header nav').should('have.css','background-color','rgb(34, 43, 69)')

        cy.get('nav nb-select').then(dropdown =>{
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( (listItem,index) =>{
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic":"rgb(50, 50, 89)",
                    "Corporate":"rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain',itemText)
                cy.get('nb-layout-header nav').should('have.css','background-color',colors[itemText])
                if( index <3){
                    cy.wrap(dropdown).click()
                }
                
            })
        })
    })

    it.only('Web table',() =>{

        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //cy.contains('.ng2-smart-page-link','1').click()
        //cy.get('.nb-trash').last().click()

        //1
        cy.get('table').contains('tr','Larry').then( tableRow =>{
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain','25')
            
        })

        //2
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow =>{
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bondar')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            
        })
        
        cy.get('tbody tr').first().find('td').then( tableColumns =>{
            cy.wrap(tableColumns).eq(2).should('contain','Artem')
            cy.wrap(tableColumns).eq(3).should('contain','Bondar')
        })

        //3
        const age = [20,30,40]

        cy.wrap(age).each( age =>{

            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( tableRow =>{
                if(age == 200){
                    cy.wrap(tableRow).should('contain','No data found')

                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain',age)
                }       
            }) 
        })




    })

    it('tooltip', () =>{

        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
          .contains('Default').click()
        cy.get('nb-tooltip').should('contain','This is a tooltip')

    })

    it('dilog box',()=>{

        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm',(confirm)=>{
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // })

        //2
        // const stub = cy.stub()
        // cy.on('window:confirm',stub)
        // cy.get('tbody tr').first().find('.nb-trash').click().then(()=>{
        //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        // })

        //3
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm',() => false)
    })
})


