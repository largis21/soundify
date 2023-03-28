import { PlayingOptions } from "../pages/mainPage";
import { DurationSlider } from "./DurationSlider";
import { MainControls } from "./MainControls";
import { PlayingSong } from "./PlayingSong";

export default function Controlbar({
  playingOptions,
  setPlayingOptions,
}: {
  playingOptions: PlayingOptions,
  setPlayingOptions: (newPOpts: PlayingOptions) => any,
}) {
  return (
    <div className="fixed bottom-0 w-screen h-20 bg-neutral-800 flex justify-center border-t-[1px] border-neutral-700 select-none">
      <PlayingSong 
        playingOptions={playingOptions}
      />
      <div 
        className="flex flex-col items-center justify-evenly"
        style={{ 
          opacity: playingOptions.queue.length === 0 
            ? 0.5
            : 1
        }}
      >
        <MainControls 
          playingOptions={playingOptions}
          setPlayingOptions={setPlayingOptions}
        />
        <DurationSlider 
          playingOptions={playingOptions}
          setPlayingOptions={setPlayingOptions}
        />
      </div>
    </div>
  );
}

