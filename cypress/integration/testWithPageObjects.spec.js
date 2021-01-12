const { createYield, createPartiallyEmittedExpression } = require("typescript")
//import { browser } from "protractor"
import { onDatePickerPage } from "../support/page_objects/datepickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import {navigateTo} from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

const runOn = (browser, fn) => {
    if(Cypress.isBroser(browser)){
        fn()
    }
}

const ignoreOn = (browser, fn) =>{
    if(!Cypress.isBrowser(browser)){
        fn()
    }
}



describe('Test with Page Objects',()=>{

    beforeEach('open application',()=>{
       cy.openHomePage()
    })

    ignoreOn('firefox', () => {
        it('verify formLayoutsPage', () => {
            navigateTo.formLayoutsPage()
            navigateTo.datepickerPage()
            navigateTo.smartTablePage()
            navigateTo.toasterPage()
            navigateTo.tooltipPage()
    
        })
    })


    // it('verify formLayoutsPage', () => {
    //     navigateTo.formLayoutsPage()
    //     navigateTo.datepickerPage()
    //     navigateTo.smartTablePage()
    //     navigateTo.toasterPage()
    //     navigateTo.tooltipPage()

    // })

    it(' should submit Inline and Basic form and select tomorrow date in the calender',()=>{

        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('test','test@test.com')
        onFormLayoutsPage.submitBasicFromWithEmailAndPassword('test@test.com','test1234')
        navigateTo.datepickerPage() 
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDatepickerWithRangeFromToday(7,14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Artem','Bondar')
        onSmartTablePage.updateAgeByFirstName('Artem','35')
        onSmartTablePage.deleteRowByIndex(1)

    })



})