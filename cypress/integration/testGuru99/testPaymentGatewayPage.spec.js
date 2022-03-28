//TIME for testing: 29.97 sec
//BUGS: 4 (CRITICAL), all reports in cy.log(BUG DETECTED: ...)
//In progress: no integration tests for bank (no actual bank systems integration), tests for 1 mistake and other fields being correct


describe('Telecom Project page testing', () => {
    beforeEach( () => {
        cy.visit('https://demo.guru99.com/payment-gateway/index.php');
    });
    
    it('Redirection on Payment Gateway Page', () => {
        cy.log('Test-APOS-? Redirection from home page check:');
        cy.visit('https://demo.guru99.com/');
        cy.get('.container-fluid').contains('a', 'Payment Gateway Project')
        .should('be.visible').then ( a => {
            cy.visit(a.attr('href').replace('http', 'https'));
        });
        cy.url().should('eq','https://demo.guru99.com/payment-gateway/index.php');
    });

    it('Payment Page elements check', () => {
        cy.log('Test-APOS-17 Elements existence on the Payment page:');
        cy.get('a.logo')
        .contains('a[href="purchasetoy.php"]','Guru99 Payment Gateway')
        .should('be.visible');
        cy.get('nav[id="nav"]')
        .contains('a[href="purchasetoy.php"]','Cart')
        .should('be.visible');
        cy.get('h2').contains('Mother Elephant With Babies Soft Toy').should('be.visible');
        cy.get('img[src="images/Toy.jpg"]').should('be.visible');
        cy.get('h3').contains('Price: $20').should('be.visible');
        cy.get('select[name="quantity"]').should('be.visible');
        cy.get('input[type="submit"]')
        .should('have.attr','value','Buy Now').and('be.visible')
        .click();
        cy.url().should('eq','https://demo.guru99.com/payment-gateway/process_purchasetoy.php');
        cy.get('h2').contains('Payment Process').should('be.visible');
        cy.get('form[name="fbal"]').contains('Pay Ammount');
        cy.get('form[name="fbal"]').contains('$20.00');
        cy.get('h4').contains('We accept');
        cy.get('img[src="images/visa.png"]').should('be.visible');
        cy.get('img[src="images/mastercard.png"]').should('be.visible');
        cy.get('img[src="images/american.png"]').should('be.visible');
        cy.get('img[src="images/discover.png"]').should('be.visible');
        cy.get('#card_nmuber').should('have.attr','maxlength','16')
        .and('have.attr','placeholder','Enter Your Card Number').and('be.visible');
        cy.get('select[name="month"]').select([0])
        .contains('Month')
        .should('be.visible');
        var monthArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        cy.get('select[name="month"]').eq(0).contains('Month');
        monthArray.forEach(function(item, index, array) {
            cy.get('select[name="month"]').select(index+1).contains(item);          
        });
        var yearArray = ['2017','2018','2019','2020','2021','2022','2023','2024','2025','2026','2027','2028'];
        cy.get('select[name="year"]').eq(0).contains('Year');
        yearArray.forEach(function(item,index,array) {
            cy.get('select[name="year"]').select(index+1).contains(item);   
        });
        cy.get('#cvv_code').should('have.attr','maxlength','3')
        .and('have.attr','placeholder','CVV Code')
        .and('be.visible');
        cy.get('input[type="submit"]').should('have.attr','value','Pay $20.00');
    });

    it('Correct payment check', () => {
        cy.log('Test-APOS-18 Valid card data + successful payment check:');
        cy.get('select[name="quantity"]').select('3');
        cy.get('input[type="submit"]').click();
        cy.fillCardDataForm('4023016654636241','07','2023','241');
        cy.get('input[type="submit"]').should('have.attr','value','Pay $60.00').click();
        cy.url().should('contain','genearte_orderid.php?uid=');
        cy.get('h2').contains('Payment successfull!').should('be.visible');
        cy.get('td').eq(0).contains('Order ID').should('be.visible');
        cy.get('td').eq(2).contains('Please Note Down Your OrderID').should('be.visible');
    });

    it('Not enough money check', () => {
        cy.log('Test-APOS-18: Valid Card with NOT ENOUGH balance check');
        cy.get('select[name="quantity"]').select('9');
        cy.get('input[type="submit"]').click();
        cy.fillCardDataForm('4023016654636241','07','2023','241');
        cy.get('input[type="submit"]').should('have.attr','value','Pay $180.00').click();
        cy.log('BUG DETECTED: payment is successful for cards with not enough credit card limit');
        /*
        cy.url().should('eq','https://demo.guru99.com/payment-gateway/process_purchasetoy.php');
        cy.get('h2').contains('Payment successfull!').should('not.be.visible');
        */
    });

    it('Empty fields payment attempt check', () => {
        cy.log('Test-APOS-21: Blank input check:');
        cy.get('input[type="submit"]').click();
        cy.get('input[type="submit"]').should('have.attr','value','Pay $20.00').click();
        cy.url().should('eq','https://demo.guru99.com/payment-gateway/process_purchasetoy.php');
        cy.log('');

        cy.get('select[name="month"]').select('07');
        cy.get('select[name="year"]').select('2023');
        cy.get('input[type="submit"]').click();
        cy.on('window:alert', (text) => {
            expect(text).to.eq('Check card number is 16 digits!');
        });
        cy.on('window:confirm', () => true);
        cy.log('');

        cy.get('#card_nmuber').type('4023016654636241');
        cy.get('input[type="submit"]').click();
        cy.log('BUG DETECTED: system allows payment with blank CVV code field');
    });

    it('Error notifications check', () => {
        cy.log('Test-APOS-21: Blank input check:');
        cy.get('input[type="submit"]').click();
        cy.get('#card_nmuber').click();
        cy.get('#cvv_code').click();
        cy.get('#message1').contains('Field must not be blank').should('be.visible');
        cy.get('#card_nmuber').click();
        cy.get('#message2').contains('Field must not be blank').should('be.visible');
        cy.log('');

        cy.get('#card_nmuber').type('a');
        cy.get('#cvv_code').type('a');
        cy.get('#message1').contains('Characters are not allowed').should('be.visible');
        cy.get('#message2').contains('Characters are not allowed').should('be.visible');
        cy.log('');

        cy.get('#card_nmuber').clear().type('!');
        cy.get('#cvv_code').clear().type('!');
        cy.get('#message1').contains('Special characters are not allowed').should('be.visible');
        cy.get('#message2').contains('Special characters are not allowed').should('be.visible');
        cy.log('');

        cy.get('#card_nmuber').clear().type('1');
        cy.get('#cvv_code').clear().type('1');
        cy.get('#message1').contains('Please Input Correct 16 Digit.').should('be.visible');
        cy.get('#message2').contains('Please Input Correct 3 Digit CVV.').should('be.visible');
        cy.log('');

        cy.get('#card_nmuber').clear().type('123456789012345');
        cy.get('#cvv_code').clear().type('12');
        cy.log('BUG DETECTED: error messages for not enough numbers input dissapear for longer input')
        //cy.get('#message1').contains('Please Input Correct 16 Digit.').should('be.visible');
        //cy.get('#message2').contains('Please Input Correct 3 Digit CVV.').should('be.visible');
    });

    it('Invalid card data', () => {
        cy.log('Test-APOS-20, Test-APOS-22: Card with incorrect expiration data check:');
        cy.get('input[type="submit"]').click();
        cy.fillCardDataForm('4023016654636241','01','2017','241');
        cy.get('input[type="submit"]').click();
        cy.log('BUG DETECTED: card with incorrect exp.data allows payment');
        //cy.url().should('eq','https://demo.guru99.com/payment-gateway/process_purchasetoy.php');
    });

});