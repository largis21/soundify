export default function Landing() {
  return (
    <div className="flex-[3] bg-neutral-900 overflow-x-hidden">
      <h2 className="text-white text-4xl font-bold my-10 ml-5">
        God ettermiddag
      </h2>
      <div className="flex flex-wrap [&>*]:ml-5 [&>*]:mt-5 overflow-auto">
        <Card
          imageURL=""
          title="Man on the moon"
          type="Album"
          artists={["Kid Cudi"]}
        />
        <Card
          imageURL=""
          title="Cornfield chase"
          type="Song"
          artists={["Hans Zimmer"]}
        />
      </div>
    </div>
  );
}

type CardProps = {
  imageURL?: string;
  title: string;
  type: "Album" | "Playlist" | "Artist" | "Song";
  artists?: string[];
};

function Card({ imageURL, title, type, artists }: CardProps) {
  function handleCardClicked() {
    console.log("hei")
  }

  return (
    <div className="w-52 h-72 rounded-xl bg-neutral-800 p-4 group hover:bg-neutral-700 transition-colors">
      <div className="relative">
        <img
          src={imageURL ? imageURL : "/icons/cd_placeholder.svg"}
          alt="Cover"
          className="rounded-lg w-full aspect-square"
        />
        <button
          className="
          rounded-full aspect-square absolute right-3 bottom-0 opacity-0 bg-soundifyGreen w-10 p-2 flex justify-center items-center focus:outline-none
          group-hover:bottom-3 group-hover:opacity-100 transition-all duration-300"
          onClick={handleCardClicked}
        >
          <img src={"/icons/play.svg"} alt="Play" />
        </button>
      </div>
      <h3 className="text-white text-xl font-semibold mt-3 ">{title}</h3>
      <p className="text-neutral-400 mt-1 ">
        <span>{type}</span>
        <span> • </span>
        <span>{artists && artists.join(", ")}</span>
      </p>
    </div>
  );
}
