describe("layers", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("loads an OSM layer", () => {
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
      cy.wait(0).then(() => {
        const osmLayer = window.map
          .getLayers()
          .getArray()
          .find((layer) => layer.get("id") === "osm");
        expect(osmLayer).to.exist;
      });
    });
  });
  it("allows to toggle layer visibility", () => {
    cy.window().then((window) => {
      window.postMessage(
        {
          type: "layer",
          layer: {
            source: "osm",
            visible: false,
          },
        },
        "*"
      );
      cy.wait(0).then(() => {
        const osmLayer = window.map
          .getLayers()
          .getArray()
          .find((layer) => layer.get("id") === "osm");
        expect(osmLayer.getVisible()).to.be.false;
        window.postMessage(
          { type: "layer-visibility", layer: "osm", visible: true },
          "*"
        );
        cy.wait(0).then(() => {
          expect(osmLayer.getVisible()).to.be.true;
        });
      });
    });
  });
});
