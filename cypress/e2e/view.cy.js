import { fromLonLat } from "ol/proj";

describe("layers", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("animates the view", () => {
    const testZoom = 10;
    const testCenter = [16.3, 48.2];
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
          center: fromLonLat(testCenter),
          duration: 300,
        },
        "*"
      );
      cy.wait(500).then(() => {
        expect(window.map.getView().getZoom()).to.equal(testZoom);
        expect(window.map.getView().getCenter()).to.deep.equal(
          fromLonLat(testCenter)
        );
      });
    });
  });
});
