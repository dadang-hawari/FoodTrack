import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FoodBaseInformation({ title, image, sourceName, dishTypes, sourceUrl }) {
  return (
    <>
      <h2 className="text-3xl font-medium mb-6 mt-5">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-x-10 grid-cols-1 items-center">
        <img
          src={image}
          alt={title}
          className="sm:max-w-[400px] max-w-full rounded-md w-full h-auto"
        />
        <div className="flex flex-col gap-y-3 mt-4">
          <div>
            <b>Recipe by</b>
            <div className="mt-2">
              <FontAwesomeIcon icon={faUser} className="text-gray-500 px-2" /> {sourceName}
            </div>
          </div>
          <div>
            <b>Types of food</b>
            <div className="flex flex-wrap gap-2 mt-2">
              {dishTypes?.map((dish, i) => (
                <span className="border border-gray-300 text-gray-500 rounded-md p-1" key={i}>
                  #{dish}
                </span>
              ))}
            </div>
          </div>
          <div>
            <b className="block">Source</b>
            <a className="text-blue-400 underline" href={sourceUrl}>
              {sourceUrl?.split("/")[2]}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
