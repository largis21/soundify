import { useEffect, useState } from "react";
import { PlayingOptionsType } from "utils/types";

export default function Controlbar({
  playingOptions,
  setPlayingOptions
}: {
  playingOptions: PlayingOptionsType,
  setPlayingOptions: (newPOpts: PlayingOptionsType) => any
}) {
  return (
    <div className="fixed bottom-0 w-screen h-20 bg-neutral-800 flex justify-center border-t-[1px] border-neutral-700 select-none">
      <div className="flex flex-col items-center justify-evenly">
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

function MainControls({
  playingOptions,
  setPlayingOptions
}: {
  playingOptions: PlayingOptionsType,
  setPlayingOptions: (newPOpts: PlayingOptionsType) => any
}) {
  const [mouseDown, setMouseDown] = useState(false);

  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [repeatEnabled, setRepeatEnabled] = useState(false);

  function handlePauseClicked() {
    const playingOptionsCopy = {...playingOptions}

    if (playingOptionsCopy.isPlaying) {
      playingOptionsCopy.isPlaying = false
      playingOptionsCopy.currentTime = 
        playingOptionsCopy.audioRef.current.currentTime || 0
    } else {
      playingOptionsCopy.isPlaying = true
    }
    setPlayingOptions(playingOptionsCopy)
  }

  return (
    <div className="flex items-center [&>*]:mx-4">
      <button onClick={() => setShuffleEnabled(!shuffleEnabled)}>
        <ShuffleIcon active={shuffleEnabled} />
      </button>
      <button>
       <img src="../public/icons/nextprev.svg" alt="Previous song" />
      </button>
      <button
        className={`${
          mouseDown && "scale-[0.95]"
        } bg-white w-8 p-2 rounded-full aspect-square flex justify-center items-center focus:outline-none duration-75`}
        onClick={handlePauseClicked}
        onMouseDown={() => {
          setMouseDown(true);
        }}
        onMouseUp={() => {
          setMouseDown(false);
        }}
        onMouseLeave={() => {
          setMouseDown(false);
        }}
      >
        {playingOptions.isPlaying ? (
          <img src={"../public/icons/pause.svg"} />
        ) : (
          <img src={"../public/icons/play.svg"} />
        )}
      </button>
      <button>
        <img src="../public/icons/nextprev.svg" alt="Next song" className="rotate-180" />
      </button>
      <button onClick={() => setRepeatEnabled(!repeatEnabled)}>
        <RepeatIcon active={repeatEnabled} />
      </button>
    </div>
  );
}

function DurationSlider({
  playingOptions,
  setPlayingOptions
}: {
  playingOptions: PlayingOptionsType,
  setPlayingOptions: (newPOpts: PlayingOptionsType) => any
}) {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (!playingOptions.audioRef) return
    playingOptions.audioRef.current.ontimeupdate = () => {
      const currentTime = playingOptions.audioRef.current.currentTime
      const songLength = playingOptions.audioRef.current.duration
      if (currentTime === 0 || songLength === 0) {
        setProgressValue(0)
      } else {
        const progress = (currentTime  * 100) / songLength
        setProgressValue(parseFloat(progress.toFixed(2)))
      }
    }
  }, [playingOptions])

  return (
    <div className="flex items-center">
      <p className="text-neutral-400 text-xs w-7">{progressValue}</p>
      <input
        type={"range"}
        step="0.01"
        className="mx-4 form-range w-96 bg-neutral-600 rounded-full h-[.35rem] focus:outline-none"
        value={progressValue}
        onChange={(e) => setProgressValue(parseFloat(e.target.value))}
      />
      <p className="text-neutral-400 text-xs w-7">100</p>
    </div>
  );
}

function ShuffleIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="19"
      height="16"
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5928 13.4786C8.28985 13.4786 8.48723 2.52142 -2.23964e-05 2.52142"
        stroke={active ? "#42AB47" : "#8F8F8F"}
        strokeWidth="2"
        className="duration-300"
      />
      <path
        d="M0 13.4786C7.30298 13.4786 7.10561 2.52142 15.5929 2.52142"
        stroke={active ? "#42AB47" : "#8F8F8F"}
        strokeWidth="2"
        className="duration-300"
      />
      <path
        d="M17.8857 1.6554C18.5524 2.0403 18.5524 3.00255 17.8857 3.38745L16.4607 4.21017C15.794 4.59507 14.9607 4.11395 14.9607 3.34415L14.9607 1.6987C14.9607 0.928895 15.794 0.447771 16.4607 0.832671L17.8857 1.6554Z"
        fill={active ? "#42AB47" : "#8F8F8F"}
        className="duration-300"
      />
      <path
        d="M17.8857 12.6125C18.5524 12.9974 18.5524 13.9596 17.8857 14.3445L16.4607 15.1673C15.794 15.5522 14.9607 15.071 14.9607 14.3012L14.9607 12.6558C14.9607 11.886 15.794 11.4049 16.4607 11.7898L17.8857 12.6125Z"
        fill={active ? "#42AB47" : "#8F8F8F"}
        className="duration-300"
      />
    </svg>
  );
}

function RepeatIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 12.216C8.83333 11.8311 8.83333 10.8689 9.5 10.484L12.275 8.8818C12.9417 8.4969 13.775 8.97803 13.775 9.74783V12.9521C13.775 13.7219 12.9417 14.203 12.275 13.8181L9.5 12.216Z"
        fill={active ? "#42AB47" : "#8F8F8F"}
        className="duration-300"
      />
      <mask
        id="mask0_4_2"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="13"
      >
        <rect
          x="1.84412"
          y="1.87012"
          width="17.1558"
          height="9.49351"
          rx="2"
          stroke={active ? "#42AB47" : "#8F8F8F"}
          strokeWidth="2"
          className="duration-300"
        />
      </mask>
      <g mask="url(#mask0_4_2)">
        <path
          d="M6.20774 -7.55847H22.2987V0.103866H26.8961V16.961H10.8051V9.29867H6.97398V13.8961H-3.7533V-2.96107H6.20774V-7.55847Z"
          fill={active ? "#42AB47" : "#8F8F8F"}
          className="duration-300"
        />
      </g>
    </svg>
  );
}
