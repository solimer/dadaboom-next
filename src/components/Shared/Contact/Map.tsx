import React from "react";
import { KeyTextField, LinkField, NumberField } from "@prismicio/types";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import { compose, withStateHandlers } from "recompose";

const MapLabel: React.FC<
  Pick<MapProps, "map_label_link" | "map_label_text">
> = ({ map_label_link, map_label_text }) => (
  <div>
    <a
      href={"url" in map_label_link ? map_label_link.url : ""}
      target="_blank"
      rel="noopener noreferrer"
    >
      <h4 id="firstHeading">{map_label_text}</h4>
    </a>
  </div>
);


type MapProps = {
  onToggleOpen: () => void;
  isOpen: boolean;
  map_label_link: LinkField;
  map_label_text: KeyTextField;
  map_lat: NumberField;
  map_lng: NumberField;
};

const MapWithAMakredInfoWindow = compose<MapProps, MapProps>(
  withStateHandlers(
    () => ({
      isOpen: false,
    }),
    {
      onToggleOpen:
        ({ isOpen }) =>
        () => ({
          isOpen: !isOpen,
        }),
    }
  ),
  withScriptjs,
  withGoogleMap
)((props) => {
  const {
    isOpen,
    onToggleOpen,
    map_label_link,
    map_label_text,
    map_lat,
    map_lng,
  } = props;

  const coordinates = {
    lat: map_lat,
    lng: map_lng
  };
  return (
    // @ts-ignore
    <GoogleMap defaultZoom={16} defaultCenter={coordinates}>
      {/* @ts-ignore */}
      <Marker position={coordinates} onClick={onToggleOpen}>
        {/* @ts-ignore */}
        {isOpen && (
          /* @ts-ignore */
          <InfoWindow onCloseClick={onToggleOpen}>
            <MapLabel
              map_label_link={map_label_link}
              map_label_text={map_label_text}
            />
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  );
});

export default MapWithAMakredInfoWindow;