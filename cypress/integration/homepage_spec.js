describe('Homepage', function(){
  
  it('has loads web application', function(){
    cy.visit('localhost:3000')
  })

  it('has Issue from owner "Ravan"', function(){
    cy.visit('localhost:3000')
    cy.contains('Ravan')
  })

  it('adds issue', function(){
    cy.visit('localhost:3000')
    cy.get('#issueAdd > [name="owner"]').type('James')
    cy.get('#issueAdd > [name="title"]').type('James Book')
    cy.get('#issueAdd').submit()
    cy.contains('James')
    cy.contains('James Book')
  })

})