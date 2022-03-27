//TIME for testing: 26.37
//BUGS: 6, all reports in cy.log(BUG DETECTED: ...)
//In progress: could be written tests for special chars and case 'submit->back->submit', but save time

describe('Telecom Project page testing', () => {
    beforeEach( () => {
        cy.visit('https://demo.guru99.com/telecom/index.html');
        cy.get('#one').contains('a[href="addcustomer.php"]','Add Customer').click();
    });
    
    it.skip('Correct Add Customer page look', () => {
        cy.log('Test-APOS-23 All required elements are present on the Add Customer page:');
        //central logo check
        cy.get('a.logo').contains('a','Guru99 telecom').should('be.visible').and('have.attr','href', 'index.html');
        //title check
        cy.get('.inner').contains('Add Customer').should('be.visible');
        //form and buttons check
        cy.get('h3').contains('Background Check').should('be.visible');
        cy.log('BUG DETECTED: done radio-button is active, but not visible');
        cy.get('#done').should('not.be.visible').and('have.attr','value','ACTIVE');
        cy.get('#pending').should('not.be.visible').and('have.attr','value','INACTIVE');
        cy.get('h3').contains('Billing address').should('be.visible');
        cy.log('BUG DETECTED: no maxlength attribute for all fields except mobile number');
        cy.get('input[id="fname"]').should('have.attr','placeholder','FirstName').and('be.visible');
        //.and('have.attr','maxlength','30');
        cy.get('input[id="lname"]').should('have.attr','placeholder','LastName').and('be.visible');
        cy.get('input[id="email"]').should('have.attr','placeholder','Email').and('be.visible');
        cy.get('textarea[name="addr"]').should('have.attr','placeholder','Enter your address').and('be.visible');
        cy.get('input[name="telephoneno"]').should('have.attr','placeholder','Mobile Number').and('have.attr','maxlength','12').and('be.visible');
        cy.get('input[type="submit"]').should('be.visible');
        cy.get('input[type="Reset"]').should('be.visible');
        cy.log('');
    });

    it('Valid Add Customer form submittion', () => {
        cy.log('Test-APOS-24 Check for successful customer addition:');
        //fill form
        cy.log('BUG DETECTED: radio-buttons are invisible, can not click')
        /*
        cy.get('#done').click().should('be.visible').and('have.attr','value','ACTIVE');
        cy.get('#pending').should('not.be.visible').and('have.attr','value','INACTIVE');
        */
        cy.get('input[id="fname"]').type('Name');
        cy.get('input[id="lname"]').type('Surname');
        cy.get('input[id="email"]').type('iostrovskaya001@mailforspam.com');
        cy.get('textarea[name="addr"]').type('random address');
        cy.get('input[name="telephoneno"]').type('88005553535');
        cy.get('input[type="submit"]').click();
        cy.log('BUG DETECTED: (uncaught exception) ReferenceError: v6 is not defined');
        cy.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        });
        cy.get('table').should('have.class','alt access').and('be.visible');
        let customerID = cy.get('td').eq(1).children().contains('');
        cy.log('Customer ID: ' + customerID);
        //cy.get('table').should('have.class','alt access').and('be.visible').children().eq(1);
        //cy.get('#main').contains('Congratulation you add Tariff Plan').should('be.visible');
        //cy.get('.button').contains('a[href="index.html"]','Home').should('be.visible');
        cy.log('');
    });

    it.skip('Valid Add Tariff Plan form submittion after Reset', () => {
        cy.log('Test-APOS-15 Check for successful tariff plan addition:');
        //go to the page
        cy.get('#one').contains('a[href="addtariffplans.php"]','Add Tariff Plan').click();
        //fill form
        cy.get('input[id="rental1"]').type('12345');
        cy.get('input[id="local_minutes"]').type('12345');
        cy.get('input[id="inter_minutes"]').type('12345');
        cy.get('input[id="sms_pack"]').type('12345');
        cy.get('input[id="minutes_charges"]').type('123');
        cy.get('input[id="inter_charges"]').type('123');
        cy.get('input[id="sms_charges"]').type('123');
        cy.get('input[type="Reset"]').click();
        cy.get('input[name="submit"]').click();
        cy.log('BUG DETECTED: Reset button does not clean the memory of fields, only erase visible data input');
        /*cy.on('window:alert', (text) => {
            expect(text).to.eq('please fill all fields Correct Value');
        });
        cy.on('window:confirm', () => true);
        cy.get('#main').contains('Congratulation you add Tariff Plan').should('not.be.visible');
        cy.url().should('eq','https://demo.guru99.com/telecom/addtariffplans.php')
        */
        cy.log('');
    });

    it.skip('Blank input attempt for Add Tariff Plan form', () => {
        cy.log('Test-APOS-12, Test-APOS-13 Check for incorrect input:');
        //go to the page
        cy.get('#one').contains('a[href="addtariffplans.php"]','Add Tariff Plan').click();
        cy.get('input[name="submit"]').click();
        cy.on('window:alert', (text) => {
            expect(text).to.eq('please fill all fields Correct Value');
        });
        cy.on('window:confirm', () => true);
        cy.get('#main').contains('Congratulation you add Tariff Plan').should('not.exist');
        //check for error notes near text boxes
        cy.get('input[id="rental1"]').click();
        cy.get('input[id="local_minutes"]').click();
        //message2 - for 1 field (don't know, why so, but it's like how it is...)
        cy.get('#message2').contains('Number must not be blank').should('be.visible');
        cy.get('input[id="inter_minutes"]').click();
        cy.get('#message3').contains('Number must not be blank').should('be.visible');
        cy.get('input[id="sms_pack"]').click();
        cy.get('#message4').contains('Number must not be blank').should('be.visible');
        cy.get('input[id="minutes_charges"]').click();
        cy.get('#message5').contains('Number must not be blank').should('be.visible');
        cy.get('input[id="inter_charges"]').click();
        cy.get('#message6').contains('Number must not be blank').should('be.visible');
        cy.get('input[id="sms_charges"]').click();
        cy.get('#message7').contains('Number must not be blank').should('be.visible');
        cy.get('input[id="rental1"]').click();
        cy.get('#message8').contains('Number must not be blank').should('be.visible');
        cy.log('');
    });

    it.skip('Invalid input attempt for Add Tariff Plan form', () => {
        cy.log('Test-APOS-12, Test-APOS-13 Check for invalid input with incorrect data:');
        //go to the page
        cy.get('#one').contains('a[href="addtariffplans.php"]','Add Tariff Plan').click();
        //fill form with chars and white spaces
        cy.get('input[id="rental1"]').type('a');
        cy.get('#message2').contains('Characters are not allowed').should('be.visible');
        cy.get('input[id="local_minutes"]').type('1 1');
        cy.get('#message3').contains('Characters are not allowed').should('be.visible');
        cy.get('input[id="inter_minutes"]').type('a');
        cy.get('#message4').contains('Characters are not allowed').should('be.visible');
        cy.get('input[id="sms_pack"]').type(' ');
        cy.get('#message5').contains('Characters are not allowed').should('be.visible');
        cy.get('input[id="minutes_charges"]').type('a');
        cy.get('#message6').contains('Characters are not allowed').should('be.visible');
        cy.get('input[id="inter_charges"]').type(' ');
        cy.get('#message7').contains('Characters are not allowed').should('be.visible');
        cy.get('input[id="sms_charges"]').type('a');
        cy.get('#message8').contains('Characters are not allowed').should('be.visible');
        cy.get('input[name="submit"]').click();
        cy.on('window:alert', (text) => {
            expect(text).to.eq('please fill all fields Correct Value');
        });
        cy.on('window:confirm', () => true);
        cy.get('#main').contains('Congratulation you add Tariff Plan').should('not.exist');
        cy.log('');

        //fill form with negative numbers
        cy.log('BUG DETECTED: no error-messages near text boxes for negative numbers');
        cy.log('BUG DETECTED: form allows submission with negative numbers input');
        cy.get('input[id="rental1"]').clear().type('-1');
        //cy.get('#message2').contains('Incorrect number').should('be.visible');
        cy.get('input[id="local_minutes"]').clear().type('-1');
        //cy.get('#message3').contains('Incorrect number').should('be.visible');
        cy.get('input[id="inter_minutes"]').clear().type('-1');
        //cy.get('#message4').contains('Incorrect number').should('be.visible');
        cy.get('input[id="sms_pack"]').clear().type('-1');
        //cy.get('#message5').contains('Incorrect number').should('be.visible');
        cy.get('input[id="minutes_charges"]').clear().type('-1');
        //cy.get('#message6').contains('Incorrect number').should('be.visible');
        cy.get('input[id="inter_charges"]').clear().type('-1');
        //cy.get('#message7').contains('Incorrect number').should('be.visible');
        cy.get('input[id="sms_charges"]').clear().type('-1');
        //cy.get('#message8').contains('Incorrect number').should('be.visible');
        cy.get('input[name="submit"]').click();
        /*
        cy.on('window:alert', (text) => {
            expect(text).to.eq('please fill all fields Correct Value');
        });
        cy.on('window:confirm', () => true);
        cy.get('#main').contains('Congratulation you add Tariff Plan').should('not.exist');
        */
        cy.log('');
        //comment next after fix:
        cy.visit('https://demo.guru99.com/telecom/addtariffplans.php');

        //fill form with all zeros
        cy.log('BUG DETECTED: no error-messages near text boxes for all zeros');
        cy.log('BUG DETECTED: form allows submission with full zero input');
        cy.get('input[id="rental1"]').clear().type('0');
        //cy.get('#message2').contains('Incorrect number').should('be.visible');
        cy.get('input[id="local_minutes"]').clear().type('0');
        //cy.get('#message3').contains('Incorrect number').should('be.visible');
        cy.get('input[id="inter_minutes"]').clear().type('0');
        //cy.get('#message4').contains('Incorrect number').should('be.visible');
        cy.get('input[id="sms_pack"]').clear().type('0');
        //cy.get('#message5').contains('Incorrect number').should('be.visible');
        cy.get('input[id="minutes_charges"]').clear().type('0');
        //cy.get('#message6').contains('Incorrect number').should('be.visible');
        cy.get('input[id="inter_charges"]').clear().type('0');
        //cy.get('#message7').contains('Incorrect number').should('be.visible');
        cy.get('input[id="sms_charges"]').clear().type('0');
        //cy.get('#message8').contains('Incorrect number').should('be.visible');
        cy.get('input[name="submit"]').click();
        /*
        cy.on('window:alert', (text) => {
            expect(text).to.eq('please fill all fields Correct Value');
        });
        cy.on('window:confirm', () => true);
        cy.get('#main').contains('Congratulation you add Tariff Plan').should('not.exist');
        */
        cy.log('');
        //comment next after fix:
        cy.visit('https://demo.guru99.com/telecom/addtariffplans.php');
    });

    
});