//TIME for testing: 26.37
//BUGS: 6, all reports in cy.log(BUG DETECTED: ...)
//In progress: could be written tests for special chars and case 'submit->back->submit', but save time


describe('Telecom Project page testing', () => {
    beforeEach( () => {
        cy.visit('https://demo.guru99.com/payment-gateway/index.php');
    });
    
    it.skip('Redirection on Payment Gateway Page', () => {
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

});