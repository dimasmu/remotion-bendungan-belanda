import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import "../styles/fonts";
import { SCENES } from "../data/enigma";
import { S1Hook } from "../scenes/enigma/S1Hook";
import { S2Number } from "../scenes/enigma/S2Number";
import { S3SignalPath } from "../scenes/enigma/S3SignalPath";
import { S4Flaw } from "../scenes/enigma/S4Flaw";
import { S5Bombe } from "../scenes/enigma/S5Bombe";
import { S6Timeline } from "../scenes/enigma/S6Timeline";
import { S7Payoff } from "../scenes/enigma/S7Payoff";

const SCENE_COMPONENTS: Partial<Record<(typeof SCENES)[number]["id"], React.FC>> = {
  S1: S1Hook,
  S2: S2Number,
  S3: S3SignalPath,
  S4: S4Flaw,
  S5: S5Bombe,
  S6: S6Timeline,
  S7: S7Payoff,
};

export const EnigmaShorts: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#070A0F" }}>
      {SCENES.map((scene) => {
        const Body = SCENE_COMPONENTS[scene.id];
        if (!Body) return null;
        return (
          <Sequence
            key={scene.id}
            from={scene.from}
            durationInFrames={scene.durationInFrames}
            name={`${scene.id} ${scene.name}`}
          >
            <Body />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
