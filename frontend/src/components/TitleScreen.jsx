import { useState } from "react";
import { chip } from "../audio/chiptune";
import { PixelSprite } from "./PixelSprite";

export default function TitleScreen({ hasSave, onNew, onContinue, onShortVersion }) {
  const [stage, setStage] = useState("press");
  const [confirmNew, setConfirmNew] = useState(false);

  function press() {
    chip.unlock();
    chip.sfx("start");
    chip.music("title");
    setStage("menu");
  }

  return (
    <div className="scene scene-title" data-testid="title-screen" onClick={press}>
      <div className="title-stars" />
      <div className="title-logo-wrap">
        <h1 className="title-logo" data-testid="title-logo">
          ADI'S
          <br />
          JOURNEY
        </h1>
        <p className="title-version">EMERALD VERSION</p>
        <p className="title-tagline">a true story · played on a Game Boy Advance</p>
      </div>

      <div className="title-starters">
        <PixelSpriteLazy name="reel" />
        <PixelSpriteLazy name="adi" />
        <PixelSpriteLazy name="slam" />
        <PixelSpriteLazy name="striker" />
      </div>

      {stage === "press" && (
        <button className="btn-pix blink" data-testid="press-start-btn" onClick={press}>
          PRESS TO START
        </button>
      )}

      {stage === "menu" && (
        <div className="title-menu" data-testid="title-menu">
          {hasSave && (
            <button
              className="btn-pix"
              data-testid="btn-continue"
              onClick={(e) => {
                e.stopPropagation();
                chip.sfx("select");
                onContinue();
              }}
            >
              CONTINUE
            </button>
          )}
          <button
            className="btn-pix ghost"
            data-testid="btn-new-game"
            onClick={(e) => {
              e.stopPropagation();
              chip.sfx("select");
              if (hasSave) {
                setConfirmNew(true);
              } else {
                onNew();
              }
            }}
          >
            {hasSave ? "NEW GAME" : "START JOURNEY"}
          </button>
          {onShortVersion && !confirmNew && (
            <button
              className="btn-pix small short-version-btn"
              data-testid="btn-short-version"
              onClick={(e) => {
                e.stopPropagation();
                chip.sfx("select");
                onShortVersion();
              }}
            >
              SHORT ON TIME? READ THE 2-MINUTE VERSION ▸
            </button>
          )}
          {confirmNew && (
            <div className="confirm-erase" data-testid="confirm-erase">
              <p>Erase your save and start over?</p>
              <button
                className="btn-pix danger"
                data-testid="confirm-erase-yes"
                onClick={(e) => {
                  e.stopPropagation();
                  chip.sfx("hit");
                  onNew();
                }}
              >
                YES, ERASE
              </button>
              <button
                className="btn-pix ghost"
                data-testid="confirm-erase-no"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmNew(false);
                }}
              >
                KEEP SAVE
              </button>
            </div>
          )}
        </div>
      )}

      <p className="title-foot">a résumé you can play · made for the Wispr Flow × Emergent challenge</p>
    </div>
  );
}

function PixelSpriteLazy({ name }) {
  return <PixelSprite name={name} scale={5} className="bob" />;
}
