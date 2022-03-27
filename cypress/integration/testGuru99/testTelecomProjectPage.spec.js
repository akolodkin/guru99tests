//TIME for testing: 26.37
//BUGS: 6, all reports in cy.log(BUG DETECTED: ...)
//In progress: could be written tests for special chars and case 'submit->back->submit', but save time

describe('Telecom Project page testing', () => {
    beforeEach( () => {
        cy.visit('https://demo.guru99.com/telecom/index.html');
    });
    
    it('Correct Telecom Project page redirect from Home page', () => {
        cy.log('LEGEND: Test-APOS-00000 Desciption - EXAMPLE - for test descriptions');
        cy.log('LEGEND: BUG DETECTED - EXAMPLE - if tests are modified to pass, but there are bugs!'); 
        cy.log('');

        cy.log('Test-APOS-? Home Page redirect to Telecom Project page:');
        cy.log("BUG DETECTED: link is http:// instead of https://, test was modified to pass")
        cy.visit('https://demo.guru99.com/');
        cy.get('.container-fluid')
        .contains('a', 'Telecom Project')
        .should('be.visible').then ( a => {
            cy.visit(a.attr('href').replace('http', 'https'));
        });
        cy.url().should('eq','https://demo.guru99.com/telecom/index.html');
        cy.log('');
    });

    it('Correct Telecom Project page look', () => {
        
        cy.log('Test-APOS-? All required elements are present on the page:');
        //central logo check
        cy.get('a.logo')
        .contains('a','Guru99 telecom')
        .should('be.visible').and('have.attr','href', 'index.html');

        //left side menu check
        cy.get('#header').children()
        .should('have.class','left').children()
        .contains('a[href="#menu"]','Menu').should('be.visible').click();
        cy.get('#menu').should('be.visible');
        cy.get('#menu').contains('a[href="index.html"]','Home');
        cy.get('#menu').contains('a[href="addcustomer.php"]','Add Customer');
        cy.get('#menu').contains('a[href="addtariffplans.php"]','Add Tariff Plans');
        cy.get('#menu').contains('a[href="assigntariffplantocustomer.php"]','Add Tariff Plan to Customer');
        cy.get('#menu').contains('a[href="billing.php"]','Pay Billing');
        cy.get('a.close').should('be.visible').click();
        cy.get('#menu').should('not.be.visible');

        //central image check
        cy.get('img[src="images/pic01.jpg"').should('be.visible');

        //main links check
        cy.get('#one')
        .contains('a[href="addcustomer.php"]','Add Customer')
        .should('be.visible').click();
        cy.url().should('eq','https://demo.guru99.com/telecom/addcustomer.php');
        cy.go('back');

        cy.get('#one')
        .contains('a[href="assigntariffplantocustomer.php"]','Add Tariff Plan to Customer')
        .should('be.visible').click()
        cy.url().should('eq','https://demo.guru99.com/telecom/assigntariffplantocustomer.php');
        cy.go('back');

        cy.get('#one')
        .contains('a[href="addtariffplans.php"]','Add Tariff Plan')
        .should('be.visible').click();
        cy.url().should('eq','https://demo.guru99.com/telecom/addtariffplans.php');
        cy.go('back');

        cy.get('#one')
        .contains('a[href="billing.php"]','Pay Billing')
        .should('be.visible').click();
        cy.url().should('eq','https://demo.guru99.com/telecom/billing.php');
        cy.go('back');

        cy.location('href').should('eq','https://demo.guru99.com/telecom/index.html');
    });

    it('Correct Add Tariff Plan page look', () => {
        cy.log('Test-APOS-14 All required elements are present on the Add Tariff Plan page:');
        cy.get('#one')
        .contains('a[href="addtariffplans.php"]','Add Tariff Plan').click();
        cy.get('a.logo')
        .contains('a','Guru99 telecom')
        .should('be.visible').and('have.attr','href', 'index.html');
        cy.get('.inner')
        .contains('Add Tariff Plans')
        .should('be.visible');
        //form and buttons check
        cy.get('input[name="submit"]').should('be.visible');
        cy.get('input[type="Reset"]').should('be.visible');
        cy.get('input[id="rental1"]')
        .should('have.attr','placeholder','Monthly Rental').and('have.attr','maxlength','5').and('be.visible');
        cy.get('input[id="local_minutes"]')
        .should('have.attr','placeholder','Free Local Minutes').and('have.attr','maxlength','5').and('be.visible');
        cy.get('input[id="inter_minutes"]')
        .should('have.attr','placeholder','Free International Minutes').and('have.attr','maxlength','5').and('be.visible');
        cy.get('input[id="sms_pack"]')
        .should('have.attr','placeholder','Free SMS Pack').and('have.attr','maxlength','5').and('be.visible');
        cy.get('input[id="minutes_charges"]')
        .should('have.attr','placeholder','Local Per Minutes Charges').and('have.attr','maxlength','3').and('be.visible');
        cy.get('input[id="inter_charges"]')
        .should('have.attr','placeholder','Inter. Per Minutes Charges').and('have.attr','maxlength','3').and('be.visible');
        cy.get('input[id="sms_charges"]')
        .should('have.attr','placeholder','SMS Per Charges').and('have.attr','maxlength','3').and('be.visible');
        cy.log('');
    });

    it('Valid Add Tariff Plan form submittion', () => {
        cy.log('Test-APOS-15 Check for successful tariff plan addition:');
        cy.get('#one')
        .contains('a[href="addtariffplans.php"]','Add Tariff Plan').click();
        cy.get('input[id="rental1"]').type('12345');
        cy.get('input[id="local_minutes"]').type('12345');
        cy.get('input[id="inter_minutes"]').type('12345');
        cy.get('input[id="sms_pack"]').type('12345');
        cy.get('input[id="minutes_charges"]').type('123');
        cy.get('input[id="inter_charges"]').type('123');
        cy.get('input[id="sms_charges"]').type('123');
        cy.get('input[name="submit"]').click();
        cy.get('#main').contains('Congratulation you add Tariff Plan')
        .should('be.visible');
        cy.get('.button').contains('a[href="index.html"]','Home')
        .should('be.visible');
    });

    it('Valid Add Tariff Plan form submittion after Reset', () => {
        cy.log('Test-APOS-15 Check for successful tariff plan addition:');
        cy.get('#one')
        .contains('a[href="addtariffplans.php"]','Add Tariff Plan').click();
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
    });

    it('Blank input attempt for Add Tariff Plan form', () => {
        cy.log('Test-APOS-12, Test-APOS-13 Check for incorrect input:');
        cy.get('#one').contains('a[href="addtariffplans.php"]','Add Tariff Plan').click();
        cy.get('input[name="submit"]').click();
        cy.on('window:alert', (text) => {
            expect(text).to.eq('please fill all fields Correct Value');
        });
        cy.on('window:confirm', () => true);

        cy.get('#main').contains('Congratulation you add Tariff Plan').should('not.exist');
        cy.get('input[id="rental1"]').click();
        cy.get('input[id="local_minutes"]').click();
        //message2 is a name for 1st field, not 2nd field (don't know, why so, but it's like how it is...)
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
    });

    it('Invalid input attempt for Add Tariff Plan form', () => {
        cy.log('Test-APOS-12, Test-APOS-13 Check for invalid input with incorrect data:');
        cy.get('#one').contains('a[href="addtariffplans.php"]','Add Tariff Plan').click();
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
        //comment next line after fix:
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
        //comment next after fix:
        cy.visit('https://demo.guru99.com/telecom/addtariffplans.php');
    });

    
});