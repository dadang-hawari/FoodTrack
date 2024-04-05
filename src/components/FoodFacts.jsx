import {
  faClock,
  faFire,
  faNotesMedical,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FoodFacts({
  healthScore,
  nutrition,
  readyInMinutes,
  servings,
  summary,
}) {
  return (
    <>
      <div className="my-5 border-2 rounded-md p-5 border-orange-100">
        <h2 className="text-2xl border-b pb-2">Food Facts</h2>

        <div>
          <ul className="flex items-center gap-3 justify-around mt-3 flex-wrap sm:flex-nowrap ">
            <li className="flex items-center flex-col">
              <span className="text-xl text-orange-400">{healthScore}</span>
              <div>
                <FontAwesomeIcon
                  icon={faNotesMedical}
                  className="h-4 me-2 text-red-400"
                />
                Health score
              </div>
            </li>
            <li className="flex items-center flex-col">
              <span className="text-orange-400 text-xl">
                {nutrition
                  ?.filter((nutrient) => nutrient.name === "Calories")
                  .map((nutrient) => `${parseInt(nutrient.amount)}`)}
              </span>
              <div>
                <FontAwesomeIcon
                  icon={faFire}
                  className="h-4 me-2 text-orange-400"
                />
                Callories
              </div>
            </li>
            <li className="flex items-center flex-col">
              <span className="text-orange-400 text-xl">{readyInMinutes}m</span>
              <div>
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-green-400 h-4 me-2"
                />
                Ready in Minutes
              </div>
            </li>
            <li className="flex items-center flex-col">
              <span className="text-orange-400 text-xl ">{servings}</span>
              <div>
                <FontAwesomeIcon
                  icon={faUtensils}
                  className="text-yellow-icon h-4 me-2"
                />
                Servings
              </div>
            </li>
          </ul>
        </div>
      </div>
      <h2 className="text-2xl border-b mt-4 mb-3 pb-2 border-b-orange-100">
        Summary
      </h2>
      <div
        dangerouslySetInnerHTML={{
          __html: `${summary}`,
        }}
      ></div>
    </>
  );
}
