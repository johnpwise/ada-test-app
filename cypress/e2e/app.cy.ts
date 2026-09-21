describe("app shell theming", () => {
  it("should render the app shell with baseline themed classes", () => {
    // Arrange

    // Act
    cy.visit("/");

    // Assert
    cy.get('[data-id="app-shell"]')
      .should("exist")
      .and("have.class", "min-h-screen")
      .and("have.class", "bg-background")
      .and("have.class", "text-foreground");
  });

  it("should toggle mode from light to dark", () => {
    // Arrange
    cy.visit("/");

    // Act
    cy.get('[data-id="mode-toggle-label"]').should("contain.text", "Mode is light");
    cy.get('[data-id="mode-toggle-button"]')
      .should("have.class", "bg-primary")
      .click();

    // Assert
    cy.get('[data-id="mode-toggle-label"]').should("contain.text", "Mode is dark");
    cy.get("html").should("have.class", "dark");
  });

  it("should change theme from the default preset to a selected preset", () => {
    // Arrange
    cy.visit("/");

    // Act
    cy.get('[data-id="theme-picker-select"]')
      .should("have.class", "bg-surface")
      .select("theme-ocean");

    // Assert
    cy.get('[data-id="theme-picker-select"]').should("have.value", "theme-ocean");
    cy.get("html").should("have.attr", "data-theme", "theme-ocean");
  });
});
