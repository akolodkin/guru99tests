//TIME for testing: 23.02 sec
//BUGS: 7, all reports in cy.log(BUG DETECTED: ...)
//In progress: could be written tests for 1 field with error and other being correct, saving time

describe('Telecom Project page testing', () => {
    beforeEach( () => {
        cy.visit('https://demo.guru99.com/telecom/addcustomer.php');
    });
    
    it('Correct Add Customer page look', () => {
        cy.log('Test-APOS-23 All required elements are present on the Add Customer page:');
        //central logo check
        cy.get('a.logo').contains('a','Guru99 telecom').should('be.visible').and('have.attr','href', 'index.html');
        //title check
        cy.get('.inner').contains('Add Customer').should('be.visible');
        //form and buttons check
        cy.get('h3').contains('Background Check').should('be.visible');
        cy.log('BUG DETECTED: done radio-button is active, but not visible');
        cy.get('input#done').should('exist');
        cy.get('input#pending').should('exist');
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
    });

    it('Valid Add Customer form submittion', () => {
        cy.log('Test-APOS-24 Check for successful customer addition:');
        //cy.log('BUG DETECTED: radio-buttons are invisible, can not click on button, only on label');
        cy.get('label[for="done"]').click();
        cy.get('input[id="fname"]').type('Name');
        cy.get('input[id="lname"]').type('Surname');
        cy.get('input[id="email"]').type('iostrovskaya001@mailforspam.com');
        cy.get('textarea[name="addr"]').type('random address');
        cy.get('input[name="telephoneno"]').type('88005553535');
        cy.get('input[type="submit"]').click();
        cy.log('BUG DETECTED: (uncaught exception) ReferenceError: v6 is not defined');
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.get('table').should('have.class','alt access').and('be.visible');

        cy.visit('https://demo.guru99.com/telecom/addcustomer.php');

        cy.get('label[for="pending"]').click();
        cy.get('input[id="fname"]').type('Name');
        cy.get('input[id="lname"]').type('Surname');
        cy.get('input[id="email"]').type('iostrovskaya001@mailforspam.com');
        cy.get('textarea[name="addr"]').type('random address');
        cy.get('input[name="telephoneno"]').type('88005553535');
        cy.get('input[type="submit"]').click();
        cy.log('BUG DETECTED: (uncaught exception) ReferenceError: v6 is not defined');
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.get('table').should('have.class','alt access').and('be.visible');

    });

    it('Reset button check', () => {
        cy.log('Test-APOS-25 Check for reset button function:');
        cy.get('label[for="pending"]').click();
        cy.get('input[id="fname"]').type('Name');
        cy.get('input[id="lname"]').type('Surname');
        cy.get('input[id="email"]').type('iostrovskaya001@mailforspam.com');
        cy.get('textarea[name="addr"]').type('random address');
        cy.get('input[name="telephoneno"]').type('88005553535');
        cy.get('input[type="reset"]').click();
        cy.get('input[type="submit"]').click();
        cy.log('BUG DETECTED: Reset button erase only visible data, does not clean fields memory');
        //cy.get('table').should('have.class','alt access').and('not.be.visible');
        //cy.url().should('eq','https://demo.guru99.com/telecom/addcustomer.php')
        cy.log('BUG DETECTED: (uncaught exception) ReferenceError: v6 is not defined');
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        });
    });
    
    it('Multiple incorrect input attempts for Customer form', () => {
        cy.log('Test-APOS-27, Test-APOS-28 Check for empty input:');
        cy.get('input[type="submit"]').click();
        cy.on('window:alert', (text) => {
            expect(text).to.eq('please fill all fields');
        });
        cy.on('window:confirm', () => true);
        cy.get('table').should('not.exist');
        cy.url().should('eq', 'https://demo.guru99.com/telecom/addcustomer.php');
        cy.log();

        cy.fillCustomerForm(' ',' ',' ',' ',' ');
        cy.get('input[type="submit"]').click();
        cy.on('window:alert', (text) => {
            expect(text).to.eq('please fill all fields');
        });
        cy.on('window:confirm', () => true);
        cy.get('table').should('not.exist');
        cy.url().should('eq', 'https://demo.guru99.com/telecom/addcustomer.php');
        cy.log('BUG DETECTED: Broken message id, can not get access to First Name error-message text')
        //cy.get('#message').contains('First character can not have space').should('be.visible');
        cy.get('#message50').contains('First character can not have space').should('be.visible');
        cy.get('#message9').contains('Email-ID must not be blank').should('be.visible');
        cy.get('#message3').contains('First character can not have space').should('be.visible');
        cy.get('#message7').contains('First character can not have space').should('be.visible');
        cy.visit('https://demo.guru99.com/telecom/addcustomer.php');
        cy.log();

        cy.get('input[id="fname"]').click();
        cy.get('input[id="lname"]').click();
        cy.get('input[id="email"]').click();
        cy.get('textarea[name="addr"]').click();
        cy.get('input[name="telephoneno"]').click();
        cy.get('input[id="fname"]').click();
        cy.log('BUG DETECTED: Broken message id, can not get access to First Name error-message text');
        //cy.get('#message').contains('Customer name must not be blank').should('be.visible');
        cy.get('#message50').contains('Customer name must not be blank').should('be.visible');
        cy.get('#message9').contains('Email-ID must not be blank').should('be.visible');
        cy.get('#message3').contains('Address Field must not be blank').should('be.visible');
        cy.get('#message7').contains('Mobile no must not be blank').should('be.visible');
        cy.log('');

        cy.log('Test-APOS-28 Check for invalid input:');
        cy.fillCustomerForm('1name','1surname','mail@mail','@address','phone11111');
        //cy.get('#message').contains('Numbers are not allowed').should('be.visible');
        cy.get('#message50').contains('Numbers are not allowed').should('be.visible');
        cy.get('#message9').contains('Email-ID is not valid').should('be.visible');
        cy.get('#message3').contains('Special characters are not allowed').should('be.visible');
        cy.get('#message7').contains('Characters are not allowed').should('be.visible');
        cy.fillCustomerForm('@','@','@','@','@');
        //cy.get('#message').contains('Special characters are not allowed').should('be.visible');
        cy.get('#message50').contains('Special characters are not allowed').should('be.visible');
        cy.get('#message7').contains('Special characters are not allowed').should('be.visible');
        cy.get('input[id="email"]').clear().type('guru99@mailforspam.com');
        cy.get('input[type="submit"]').click();
        cy.on('window:alert', (text) => {
            expect(text).to.eq('please fill all fields');
        });
        cy.on('window:confirm', () => true);
        cy.get('table').should('not.exist');
        cy.url().should('eq', 'https://demo.guru99.com/telecom/addcustomer.php');
    });
});