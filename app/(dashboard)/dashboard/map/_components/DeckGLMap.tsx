"use client";
import DeckGL from "@deck.gl/react";
import { TextLayer } from "@deck.gl/layers";

export default function DeckGLMap() {
  const layers = [
    new TextLayer({
      id: "text-layer",
      data: [{ position: [0, 0], text: "Hello World" }],
    }),
  ];

  return (
    <DeckGL
    style={{ width: "100%", height: "100%" }}
    
      initialViewState={{
        longitude: -122.45,
        latitude: 37.8,
        zoom: 12,
        pitch: 0,
        bearing: 0,
      }}
      controller={true}
      layers={layers}
    />
  );
}
