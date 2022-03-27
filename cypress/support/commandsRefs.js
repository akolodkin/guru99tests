Cypress.Commands.add('getCorrectNavigationBarElement', (elementName, elementRef) => {
    cy.get('.container-fluid').then(jqElement => {
        cy.contains('a', elementName).should('be.visible').and('have.attr','href', elementRef);
    
    });
});

Cypress.Commands.add('getCorrectNavBarDropdownPage', (elementName, pageName, pageHref, pageLink) => {
    cy.get('.container-fluid').then(jqElement => {
        cy.contains('a', elementName).click();
        cy.get('ul.dropdown-menu').children().contains('a',pageName,pageHref).should('be.visible').click();
        cy.url().should('eq', pageLink);
        cy.go('back');
    
    });
});