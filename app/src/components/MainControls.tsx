import { PlayingOptions } from "@/pages/mainPage"

export function MainControls({
  playingOptions,
  setPlayingOptions,
}: {
  playingOptions: PlayingOptions,
  setPlayingOptions: (newPOpts: PlayingOptions) => any,
}) {
  function handlePauseClicked() {
    const playingOptionsClone = playingOptions.clone()
    if (!playingOptionsClone.audioRef) return

    if (playingOptions.isPlaying) {
      playingOptionsClone.isPlaying = false
      playingOptionsClone.currentTime = 
        playingOptionsClone.audioRef.currentTime || 0
    } else {
      playingOptionsClone.isPlaying = true
    }
    setPlayingOptions(playingOptionsClone)
  }

  function toggleShuffle() {
    const playingOptionsClone = playingOptions.clone()
    if (!playingOptionsClone.shuffle) {
      playingOptionsClone.shuffleQueue()
    } else {
      playingOptionsClone.unShuffleQueue()
    }
    setPlayingOptions(playingOptionsClone)
  }

  function toggleRepeat() {
    const playingOptionsClone = playingOptions.clone()
    playingOptionsClone.repeat = !playingOptionsClone.repeat
    setPlayingOptions(playingOptionsClone)
  }

  function prevSong() {
    const playingOptionsClone = playingOptions.clone()
    playingOptionsClone.skipBackSong()
    setPlayingOptions(playingOptionsClone)
  }

  function skipSong() {
    const playingOptionsClone = playingOptions.clone()
    playingOptionsClone.skipSong()
    setPlayingOptions(playingOptionsClone)
  }

  return (
    <div className="flex items-center [&>*]:mx-4">
      <button onClick={toggleShuffle}>
        <ShuffleIcon active={playingOptions.shuffle} />
      </button>
      <button>
       <img 
        src="../public/icons/nextprev.svg" 
        alt="Previous song" 
        onClick={prevSong}
      />
      </button>
      <button
        className="bg-white w-8 p-2 rounded-full aspect-square flex justify-center 
          items-center focus:outline-none duration-75"
        disabled={playingOptions.queue.length === 0}
        onClick={handlePauseClicked}
      >
        {playingOptions.isPlaying ? (
          <img src={"../public/icons/pause.svg"} />
        ) : (
          <img width={11} className="translate-x-[1px]" src={"../public/icons/play.svg"} />
        )}
      </button>
      <button
        onClick={skipSong}
      >
        <img src="../public/icons/nextprev.svg" alt="Next song" className="rotate-180" />
      </button>
      <button onClick={toggleRepeat}>
        <RepeatIcon active={playingOptions.repeat} />
      </button>
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
