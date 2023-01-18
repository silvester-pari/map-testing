import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";

const map = new Map({
  layers: [],
  target: "map",
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

window.map = map;

window.addEventListener("message", (event) => {
  // add a layer to the map
  if (event.data.type === "layer") {
    if (event.data.layer.source === "osm") {
      map.addLayer(
        new TileLayer({
          ...event.data.layer,
          id: event.data.layer.source,
          source: new OSM(),
        })
      );
    }
  }
  // change layer visibilty
  if (event.data.type === "layer-visibility") {
    const layer = map
      .getLayers()
      .getArray()
      .find((layer) => layer.id === event.data.layer.source);
    layer.setVisible(event.data.visible);
  }
  // animate the view
  if (event.data.type === "view") {
    map.getView().animate({ ...event.data });
  }
});
