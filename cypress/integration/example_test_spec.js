describe('Homepage', function(){
  it('has welcome message', function(){
    cy.visit('localhost:3000')
    cy.contains('Ravan').click()
  })
})