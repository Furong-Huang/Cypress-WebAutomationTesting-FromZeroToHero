function selectDayFormCurrent(day){
        
        //const monthShortNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        let date = new Date()
        date.setDate(date.getDate() + day)
        let futureDay = date.getDate()
        //let futureMonth = monthShortNames[date.getMonth()]   //alternative way to get short name of months 
        let futureMonth = date.toLocaleString('en-US',{month:'short'})
        let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()
        cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date').then( dateAttribute =>{
            if(!dateAttribute.includes(futureMonth)){
                cy.get('[data-name="chevron-right"]').click()
                selectDayFormCurrent(day)
            } else {
                cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
            }
        })
        return dateAssert
    }

export class DatepickerPage{

    selectCommonDatepickerDateFromToday(dayFromToday){

            cy.contains('nb-card','Common Datepicker').find('input').then(input =>{
                cy.wrap(input).click()
                let dateAssert = selectDayFormCurrent(dayFromToday)
                cy.wrap(input).invoke('prop','value').should('contain', dateAssert)
                cy.wrap(input).should('have.value',dateAssert)
            })
    }

    selectDatepickerWithRangeFromToday(firstDay,secondDay){
        cy.contains('nb-card','Datepicker With Range').find('input').then(input =>{
            cy.wrap(input).click()
            let dateAssertFirst = selectDayFormCurrent(firstDay)
            let dateAssertSecond = selectDayFormCurrent(secondDay)
            const finalDate = dateAssertFirst + ' - ' + dateAssertSecond
            cy.wrap(input).invoke('prop','value').should('contain', finalDate)
            cy.wrap(input).should('have.value',finalDate)
        })
    }
}

export const onDatePickerPage = new DatepickerPage()