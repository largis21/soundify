import { PlayingOptions } from "../pages/mainPage";
import { useEffect, useState, ChangeEvent } from "react";
import { formatTime } from "../../utils/formatTime";

export function DurationSlider({
  playingOptions,
  setPlayingOptions
}: {
  playingOptions: PlayingOptions,
  setPlayingOptions: (newPOpts: PlayingOptions) => any,
}) {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    playingOptions.audio.ontimeupdate = () => {
      setProgressValue(playingOptions.audio.currentTime)
    }
  }, [playingOptions])

  function handleSliderInput(e: ChangeEvent<HTMLInputElement>) {
    const parsedNewValue = parseFloat(e.target.value)
    setProgressValue(parsedNewValue)

    playingOptions.audio.currentTime = parsedNewValue
  }

  return (
    <div className="flex items-center">
      <p className="text-neutral-400 text-xs w-7">
        {
          playingOptions.queue.length !== 0 && progressValue
            ? formatTime(progressValue)
            : "‎"
        }
      </p>
      <input
        type={"range"}
        step="0.000000001"
        disabled={playingOptions.queue.length === 0}
        max={playingOptions.audio.duration || 0}
        className="mx-4 form-range w-96 bg-neutral-600 rounded-full h-[.35rem] focus:outline-none
          filter -hue-rotate-[75deg]"
        value={playingOptions.queue.length === 0 ? 0 : progressValue}
        onChange={handleSliderInput}
      />
      <p className="text-neutral-400 text-xs w-7">
        { 
          playingOptions.queue.length !== 0
            ? formatTime(playingOptions.audio.duration)
            : "‎"
        }
      </p>
    </div>
  );
}

