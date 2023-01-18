describe("layers", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("animates the view", () => {
    const testZoom = 10;
    const testCenter = [1820000, 6140000];
    cy.window().then((window) => {
      window.postMessage(
        {
          type: "layer",
          layer: {
            source: "osm",
          },
        },
        "*"
      );
      window.postMessage(
        {
          type: "view",
          zoom: testZoom,
          center: testCenter,
          duration: 300,
        },
        "*"
      );
      cy.wait(500).then(() => {
        expect(window.map.getView().getZoom()).to.equal(testZoom);
        expect(window.map.getView().getCenter()).to.deep.equal(testCenter);
      });
    });
  });
});
