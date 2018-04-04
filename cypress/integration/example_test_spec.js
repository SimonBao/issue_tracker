describe('Homepage', function(){
  
  it('has loads web application', function(){
    cy.visit('localhost:3000')
  })

  it('has Issue from owner "Ravan"', function(){
    cy.visit('localhost:3000')
    cy.contains('Ravan')
  })

})