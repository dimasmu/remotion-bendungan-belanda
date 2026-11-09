import React from "react";
import { Composition } from "remotion";

const WIDTH = 1920;
const HEIGHT = 1080;
const FPS = 30;
const DURATION_IN_FRAMES = 10 * FPS;

const BoilerplateVideo: React.FC = () => (
  <div
    style={{
      flex: 1,
      backgroundColor: "#101820",
      color: "#F4F1EA",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, Helvetica, sans-serif",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 24, letterSpacing: 6, opacity: 0.7 }}>
        REMOTION STARTER
      </div>
      <div style={{ fontSize: 76, fontWeight: 800, marginTop: 20 }}>
        Your video starts here
      </div>
      <div style={{ fontSize: 24, marginTop: 18, opacity: 0.7 }}>
        Replace this placeholder with your first scene.
      </div>
    </div>
  </div>
);

export const RemotionCompositions: React.FC = () => (
  <Composition
    id="BoilerplateVideo"
    component={BoilerplateVideo}
    durationInFrames={DURATION_IN_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
