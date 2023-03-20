import { PlayingOptions } from "@/pages/mainPage"
import { API_URL } from "../../ENV"

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
            src={`${API_URL}/song/cover/${playingOptions.queue[0].song_id}`} 
            alt="cover"
          />
          <div className="flex flex-col justify-center text-white h-full">
            <p>
              {playingOptions.queue[0].song_name}
            </p>
            <p className="text-neutral-400 text-sm">
              {playingOptions.queue[0].artist.artist_name}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
