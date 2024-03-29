import { PlayingOptions } from "../pages/mainPage"

export function PlayingSong({
  playingOptions
}: {
  playingOptions: PlayingOptions
}) {
  return (
    <>
      {playingOptions.queue.length !== 0 && (
        <div className="absolute p-3 h-20 left-0 flex gap-3">
          <img 
            src={`${import.meta.env.VITE_API_URL}/song/cover/${playingOptions.queue[playingOptions.queueIndex].song_id}`} 
            alt="cover"
          />
          <div className="flex flex-col justify-center text-white h-full">
            <p>
              {playingOptions.queue[playingOptions.queueIndex].song_name}
            </p>
            <p className="text-neutral-400 text-sm">
              {playingOptions.queue[playingOptions.queueIndex].artist.artist_name}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
