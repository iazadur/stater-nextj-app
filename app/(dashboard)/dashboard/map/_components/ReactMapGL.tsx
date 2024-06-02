"use client";
import Map, { Marker, useControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

// Import Typed Components
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox";
import { ScatterplotLayer, TextLayer } from "@deck.gl/layers";
import { useEffect, useState } from "react";
// import { cookies } from "next/headers";
import io from "socket.io-client";
// Create DeckGL Overlay
const DeckGLOverlay = (props: MapboxOverlayProps) => {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
};

import { getTimeDiff } from "@/components/utils/getTimeDiff";

const initialViewState = {
  longitude: 90.36402,
  latitude: 23.823731,
  minZoom: 4,
  maxZoom: 30,
  zoom: 13,
  bearing: 0,
  pitch: 0,
  antialias: true,
};

interface ReactMapGLProps {
  users: any;
  token: any;
}

const ReactMapGL = ({ users, token }: ReactMapGLProps) => {
  const [markerData, setMarkerData] = useState<any>(users);
  const [showPopup, setShowPopup] = useState<any>(null);
  const [trackingTime] = useState(2);
  const [layers, setLayers] = useState<any>([]);

  useEffect(() => {
    const newLayers = [
      new ScatterplotLayer({
        id: "scatterplot-layer",
        data: markerData,
        pickable: true,
        opacity: 0.8,
        stroked: false,
        filled: true,
        radiusScale: 6,
        radiusMinPixels: 8,
        radiusMaxPixels: 8,
        lineWidthMinPixels: 1,
        lineWidthMaxPixels: 5,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => 8,
        getFillColor: (d) => getTimeDiff(d?.position_updated_at) <= trackingTime
          ? [0, 255, 0, 204]
          : [255, 0, 0], // Red color
        getLineColor: (d) => getTimeDiff(d?.position_updated_at) <= trackingTime
          ? [0, 255, 0, 204]
          : [255, 0, 0], // #29c299cc
        getLineWidth: 0,
        // updateTriggers: {
        //   getIcon: updateTrigger,
        //   getColor: updateTrigger,
        //   getSize: updateTrigger,
        //   // getPosition: updateTrigger,
        //   getFillColor: updateTrigger,
        //   getLineColor: updateTrigger,
        // },
        onHover: (info) => {
          setShowPopup(info)
        },
        parameters: { depthTest: false }
      }),
      // new TextLayer({
      //   id: "text-layer",
      //   data: markerData,
      //   pickable: true,
      //   getPosition: (d) => d.coordinates,
      //   getText: (d) => d.name,
      //   getSize: 14,
      //   getAngle: 0,
      //   getTextAnchor: "start",
      //   getAlignmentBaseline: "center",
      //   getPixelOffset: [20, 0],
      //   getColor: (d) => getTimeDiff(d?.position_updated_at) <= trackingTime
      //     ? [41, 194, 153, 204]
      //     : [255, 255, 255],
      // }),
    ];

    setLayers(newLayers);
  }, [markerData, trackingTime]);

  useEffect(() => {
    const socketIo = io("https://tracev2.barikoimaps.dev", {
      path: "/socket.io",
      transports: ["websocket"],
      query: { authorization: `Bearer ${token} ` },
      autoConnect: true, // Auto connect
      reconnectionAttempts: 5, // Number of attempts before giving up
      reconnectionDelay: 2000, // Delay between reconnection attempts
    });
    socketIo.connect();

    socketIo.on("connect", () => {
      // eslint-disable-next-line no-console
      console.log(`connected -> ${socketIo.id}`); // x8WIv7-mJelg7on_ALbx
    });

    // Join the company group
    socketIo?.emit("joinGroup", `company_65dd725f44c5beef2e6d5c4f`);

    // Listen for gpx event
    socketIo?.on("gpx", (socketData: any) => {
      // eslint-disable-next-line no-console
      // if (data?.user && getTimeDiff(data?.gpx_time) <= trackingTime) {
      //   dispatch(setSingleMarkerData(data))
      // }

      setMarkerData((prevData: any) => {
        const index = prevData.find(
          (item: any) => item._id === socketData.user
        );
        // console.log('index', index)
        const filteredData = prevData.filter(
          (item: any) => item._id !== socketData.user
        );

        return [
          {
            ...index,
            name: socketData?.user_name,
            user_last_lat: socketData.latitude,
            user_last_lon: socketData.longitude,
            coordinates: socketData?.location?.coordinates,
            position_updated_at: socketData?.gpx_time,
          },
          ...filteredData,
        ];
      });
    });

    return () => {
      socketIo.disconnect();
    };
  }, [token]);

  return (
    <Map
      initialViewState={initialViewState}
      style={{ width: "100%", height: "98vh" }}
      mapStyle="https://map.barikoi.com/styles/barikoi-dark/style.json?key=MjYwMTpHOUFRTEJMQVBE"
    >
      <Marker
        longitude={90.36401}
        latitude={23.82378}
        draggable
        anchor="bottom"
      />
      {/* DeckGL Overlay */}
      <DeckGLOverlay
        layers={[layers]}
        // getCursor={ ({ isDragging, isHovering }) => (isDragging ? "inherit" : isHovering ? "pointer" : "inherit") }
      />
    </Map>
  );
};

export default ReactMapGL;
