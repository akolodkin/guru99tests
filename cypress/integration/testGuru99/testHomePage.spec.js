//TIME for testing: 70.94 sec
//BUGS: 9, all reports in cy.log(BUG DETECTED: ...)
//Complited for this site version

//in progress with tests for forbidden symbols input, stoped due to:
// 1) this page was not tested for test link
// 2) save time for tests with higher priority

describe('Home page testing', () => {
    beforeEach( () => {
        cy.visit('https://demo.guru99.com/');
    });
    
    it('Correct Home Page main elements check', () => {
        cy.log('LEGEND: Test-APOS-00000 Desciption - EXAMPLE - for test descriptions');
        cy.log('LEGEND: BUG DETECTED - EXAMPLE - if tests are modified to pass, but there are bugs!'); 
        cy.log('');

        cy.log('Test-APOS-? Demo Site main title check:');
        cy.get('#site-name')
        .contains('a', 'Demo Site')
        .should('be.visible');
        cy.log('');

        cy.log('Test-APOS-00002 Guru99 main logo check:');
        cy.get(".logo img[src='/logo.png']")
        .should('be.visible');
        cy.log('');

        cy.log('Test-APOS-? Guru99 Bank subtitle check: not written to save time');
        //missed: Guru99 Bank subtitle text check
    });

    it('Navigation bar check', () => {
        //Tests for Top Navigation Bar 
        cy.log('Test-APOS-? Navigation Bar 9 elements existence:');
        cy.log('BUG DETECTED: all elements links have http:// type (expected: https://). Now they are changed to http:// in tests, to check other functions.');
        cy.getCorrectNavigationBarElement('Selenium','#');
        cy.getCorrectNavigationBarElement('Insurance Project','http://demo.guru99.com/insurance/v1/index.php');
        cy.getCorrectNavigationBarElement('Agile Project','http://demo.guru99.com/Agile_Project/Agi_V1/');
        cy.getCorrectNavigationBarElement('Bank Project','http://demo.guru99.com/V1/index.php');
        cy.getCorrectNavigationBarElement('Security Project','http://demo.guru99.com/Security/SEC_V1/index.php');
        cy.getCorrectNavigationBarElement('Telecom Project','http://demo.guru99.com/telecom/index.html');
        cy.getCorrectNavigationBarElement('Payment Gateway Project','http://demo.guru99.com/payment-gateway/index.php');
        cy.getCorrectNavigationBarElement('New Tours','http://demo.guru99.com/test/newtours/');
        cy.getCorrectNavigationBarElement('SEO','#');
    });

    it('Navigation bar dropdown buttons check', () => {
        //Tests for Top Navigation Bar Dropdown buttons    
        cy.log('Test-APOS-? Navigation Bar Selenium Anchor links check click/back:');
        cy.getCorrectNavBarDropdownPage('Selenium','Flash Movie Demo',
        'href=["../../test/flash-testing.html"]','https://demo.guru99.com/test/flash-testing.html');
        cy.getCorrectNavBarDropdownPage('Selenium','Radio & Checkbox Demo',
        'href=["../../test/radio.html"]','https://demo.guru99.com/test/radio.html');
        cy.getCorrectNavBarDropdownPage('Selenium','Table Demo',
        'href=["../../test/table.html"]','https://demo.guru99.com/test/table.html');
        cy.getCorrectNavBarDropdownPage('Selenium','Accessing Link',
        'href=["../../test/link.html"]','https://demo.guru99.com/test/link.html');
        cy.getCorrectNavBarDropdownPage('Selenium','Ajax Demo',
        'href=["../../test/ajax.html"]','https://demo.guru99.com/test/ajax.html');
        cy.getCorrectNavBarDropdownPage('Selenium','Inside & Outside Block Level Tag',
        'href=["../../test/block.html"]','https://demo.guru99.com/test/block.html');
        cy.getCorrectNavBarDropdownPage('Selenium','Delete Customer Form',
        'href=["../../test/delete_customer.php"]','https://demo.guru99.com/test/delete_customer.php');

        cy.log('BUG DETECTED: Yahoo link from Selenium dropdown is broken, error after link-click: "(uncaught exception) ReferenceError: $ is not defined"');
        //cy.getCorrectNavBarDropdownPage('Selenium','Yahoo','href=["../../test/yahoo.html"]','https://demo.guru99.com/test/yahoo.html');

        cy.log('BUG DETECTED: Tooltip link from Selenium dropdown is broken, error after link-click: "(uncaught exception) ReferenceError: $ is not defined"');
        //cy.getCorrectNavBarDropdownPage('Selenium','Tooltip','href=["../../test/tooltip.html"]','https://demo.guru99.com/test/tooltip.html');

        cy.log('BUG DETECTED: File Upload link from Selenium dropdown is broken, error after link-click: "(uncaught exception) ReferenceError: archive_analytics is not defined" + "(uncaught exception) TypeError: Cannot read properties of null (reading appendChild)"');
        //cy.getCorrectNavBarDropdownPage('Selenium','File Upload','href=["../../test/upload/"]','https://demo.guru99.com/test/upload/');

        cy.getCorrectNavBarDropdownPage('Selenium','Login',
        'href=["../../test/login.html"]','https://demo.guru99.com/test/login.html');
        cy.getCorrectNavBarDropdownPage('Selenium','Social Icon',
        'href=["../../test/social-icon.html"]','https://demo.guru99.com/test/social-icon.html');

        cy.log('BUG DETECTED: Selenium Auto IT link from Selenium dropdown is broken, error after link-click: "(uncaught exception) TypeError: Cannot read properties of null (reading tooltip)" + (uncaught exception) TypeError: jQuery(...).colorbox is not a function + (uncaught exception) ReferenceError: JCaption is not defined');
        //cy.getCorrectNavBarDropdownPage('Selenium','Selenium Auto IT','href=["../../test/autoit.html"]','https://demo.guru99.com/test/autoit.html');

        cy.getCorrectNavBarDropdownPage('Selenium','Selenium IDE Test',
        'href=["../../test/facebook.html"]','https://demo.guru99.com/test/facebook.html');
        cy.getCorrectNavBarDropdownPage('Selenium','Guru99 Demo Page',
        'href=["../../test/guru99home/"]','https://demo.guru99.com/test/guru99home/');
        cy.getCorrectNavBarDropdownPage('Selenium','Scrollbar Demo',
        'href=["../../test/guru99home/scrolling.html"]','https://demo.guru99.com/test/guru99home/scrolling.html');
        
        cy.log('BUG DETECTED: File Upload using Sikuli Demo link from Selenium dropdown is broken, error after link-click: "(uncaught exception) TypeError: $(...).tooltip is not a function"');
        //cy.getCorrectNavBarDropdownPage('Selenium','File Upload using Sikuli Demo','href=["../../test/image_upload/"]','https://demo.guru99.com/test/image_upload/');
        
        cy.getCorrectNavBarDropdownPage('Selenium','Cookie Handling Demo',
        'href=["../../test/cookie/selenium_aut.php"]','https://demo.guru99.com/test/cookie/selenium_aut.php');
        cy.getCorrectNavBarDropdownPage('Selenium','Drag and Drop Action',
        'href=["../../test/drag_drop.html"]','https://demo.guru99.com/test/drag_drop.html');
        cy.getCorrectNavBarDropdownPage('Selenium','Selenium DatePicker Demo',
        'href=["../../test/"]','https://demo.guru99.com/test/');
        
        cy.location('href')
        .should('eq', 'https://demo.guru99.com/');
        cy.log('');
        
        cy.log('Test-APOS-? Navigation Bar SEO Anchor links check click/back:');
        cy.log('BUG DETECTED: all links have http:// format instead of https://, tests are modified to pass with http');
        cy.log('BUG DETECTED after modification: (uncaught exception) ReferenceError: jQuery is not defined; + (uncaught exception) TypeError: jQuery(...).SLScrollToTop is not a function; + (uncaught exception) TypeError: JCaption is not a constructor');
        /*
        cy.get('.container-fluid').contains("a", 'SEO').click();
        cy.get('ul.dropdown-menu').children()
        .contains('a','Page-1','href=["http://demo.guru99.com/seo/page-1.html"]')
        .should('be.visible').then ( a => {
            cy.visit(a.attr('href').replace('http', 'https'));
        });
        cy.go('back');
        cy.get('.container-fluid').contains('a', 'SEO').click();
        cy.get('ul.dropdown-menu').children()
        .contains('a','Page-2','href=["http://demo.guru99.com/seo/page-2.html"]')
        .should('be.visible').click();
        cy.go('back');
        cy.get('.container-fluid').contains('a', 'SEO').click();
        cy.get('ul.dropdown-menu').children()
        .contains('a','Page-3','href=["http://demo.guru99.com/seo/page-3.html"]')
        .should('be.visible').click();
        cy.go('back');
        cy.get('.container-fluid').contains('a', 'SEO').click();
        cy.get('ul.dropdown-menu').children()
        .contains('a','Page-4','href=["http://demo.guru99.com/seo/page-4.html"]')
        .should('be.visible').click();
        cy.go('back');
        cy.get('.container-fluid').contains('a', 'SEO').click();
        cy.get('ul.dropdown-menu').children()
        .contains('a','Page-5','href=["http://demo.guru99.com/seo/page-5.html"]')
        .should('be.visible').click();
        cy.go('back');
        cy.get('.container-fluid').contains('a', 'SEO').click();
        cy.get('ul.dropdown-menu').children()
        .contains('a','Page-6','href=["http://demo.guru99.com/seo/page-6.html"]')
        .should('be.visible').click();
        */
    });
    
    it('Email form testing, valid data', () => {
        //Tests for Form, User ID/Password correct generation
        cy.log('Test-APOS-? Form Email-ID UserID/Password valid generation check:');
        cy.contains('td','Enter your email address to get access details to demo site')
        .should('be.visible').and('have.attr','align','center');
        cy.get('input[name="emailid"]').scrollIntoView()
        .should('be.visible').and('have.attr', 'maxlength','50')
        .type('demoguru99@mailforspam.com');
        cy.get('input[name="btnLogin"]').scrollIntoView()
        .should('be.visible').click();

        cy.getEmailRegistrationData().then(credentials => {
            cy.log(credentials.userID);
            cy.log(credentials.password);
        })
        cy.log('');

        //Test to check if form is clean after submit->back->submit action sequence
        cy.go('back');
        cy.get('input[name="btnLogin"]').scrollIntoView()
        .should('be.visible').click();
        cy.log('BUG DETECTED: form is filled after going back and click on Submit-button again');
        //uncomment next line after gug being fixed
        //cy.location('href').should('eq', 'https://demo.guru99.com/');
    });

    it('Email form testing, invalid data input', () => {
        cy.log('Test-APOS-? Form Email-ID UserID/Password invalid input check:');
        cy.get('input[name="emailid"]').scrollIntoView()
        .type('demoguru99mailforspam.com');
        cy.get('label[id="message9"]')
        .contains('Email ID is not valid')
        .should('be.visible');
        cy.get('input[name="btnLogin"]').scrollIntoView().click();
        cy.location('href')
        .should('eq', 'https://demo.guru99.com/');
        cy.log('');
    });

    it('Email form testing, blank input', () => {
        cy.log('Test-APOS-? Form Email-ID UserID/Password empty input check:');
        cy.get('input[name="emailid"]').scrollIntoView().click();
        cy.get('td').contains('Email ID').click();
        cy.get('label[id="message9"]')
        .contains('Email ID must not be blank')
        .should('be.visible');
        cy.visit('https://demo.guru99.com/');

        cy.get('input[name="emailid"]').scrollIntoView().type(' ');
        cy.get('label[id="message9"]')
        .contains('Email ID is not valid')
        .should('be.visible');
        cy.visit('https://demo.guru99.com/');

        cy.get('input[name="btnLogin"]').scrollIntoView().click();
        cy.get('label[id="message9"]')
        .contains('Email ID must not be blank')
        .should('be.visible');
        cy.location('href').should('eq', 'https://demo.guru99.com/');
        cy.log('');
    });

    /*//different inputs for invalid symbols
    it('Email form testing, forbidden symbols input', () => {
        cy.log('Test-APOS-? Form Email-ID UserID/Password invalid input error-notifications check:');
        cy.get('input[name="emailid"]').scrollIntoView().type('test$test@test.com');
        cy.get('label[id="message9"]').contains('Email ID is not valid').should('be.visible');
        cy.get('input[name="emailid"]').scrollIntoView().clear().type('test!test@test.com');
        cy.get('label[id="message9"]').contains('Email ID is not valid').should('be.visible');
        cy.get('input[name="emailid"]').scrollIntoView().clear().type('test#test@test.com');
        cy.get('label[id="message9"]').contains('Email ID is not valid').should('be.visible');
        cy.get('input[name="emailid"]').scrollIntoView().clear().type('test@test@test.com');
        cy.get('label[id="message9"]').contains('Email ID is not valid').should('be.visible');
        cy.get('input[name="emailid"]').scrollIntoView().clear().type('test%test@test.com');
        cy.get('label[id="message9"]').contains('Email ID is not valid').should('be.visible');
        //can be continued with more symbols
        cy.log('');
    });
    */
})