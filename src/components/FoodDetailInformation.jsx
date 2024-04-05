export default function FoodDetailInformation({
  extendedIngredients,
  imgIngredient,
  imgEquipment,
  percentProtein,
  percentCarbs,
  percentFat,
  nutrients,
  instructions,
}) {
  return (
    <div>
      <div className="grid sm:grid-cols-2 mt-5 gap-x-4 grid-cols-1 ">
        <div>
          <h2 className="text-2xl mb-4 pb-2 border-b border-b-orange-100">
            Ingredients
          </h2>
          <span className="flex flex-col gap-2">
            {extendedIngredients?.map((ingredient, i) => (
              <div key={i}>{ingredient?.original}</div>
            ))}
          </span>
          <img
            src={imgIngredient}
            alt="ingredients"
            className="w-full h-auto mt-2"
          />
          <h2 className="text-2xl my-3 pb-2 border-b border-b-orange-100">
            Equipments
          </h2>
          <img
            src={imgEquipment}
            alt="equipments"
            className="w-full h-auto mt-2"
          />
        </div>
        <div>
          <h2 className="text-2xl mb-4 pb-2 border-b border-b-orange-100">
            Nutrients
          </h2>
          <div>
            <div className="flex">
              <div
                className="flex flex-grow min-w-[80px] items-center gap-x-1"
                style={{
                  width: `${percentProtein}%`,
                }}
              >
                <div className="w-[12px] h-[12px] p-1  rounded-full bg-red-400"></div>
                Protein
              </div>
              <div
                className="flex flex-grow items-center gap-x-1"
                style={{
                  width: `${percentCarbs}%`,
                }}
              >
                <div className="w-[12px] h-[12px] p-1 rounded-full bg-orange-400"></div>
                Carbo
              </div>
              <div
                className="flex flex-grow items-center gap-x-1"
                style={{
                  width: `${percentFat}%`,
                }}
              >
                <div className="w-[12px] h-[12px] p-1 rounded-full  bg-yellow-400"></div>
                Fat
              </div>
            </div>

            <div className="flex text-white text-center">
              <div
                className={`flex-grow py-1 bg-red-400 rounded-s-full`}
                style={{
                  width: `${percentProtein}%`,
                }}
              >
                {percentProtein}%
              </div>
              <div
                className={`flex-grow py-1 bg-orange-400`}
                style={{
                  width: `${percentCarbs}%`,
                }}
              >
                {percentCarbs}%
              </div>
              <div
                className={`flex-grow py-1 bg-yellow-400 rounded-e-full`}
                style={{
                  width: `${percentFat}%`,
                }}
              >
                {percentFat}%
              </div>
            </div>

            <div></div>
          </div>
          <span className="flex flex-col text-base">
            {nutrients?.map(
              ({ name, amount, unit, percentOfDailyNeeds }, i) => (
                <div key={i} className="flex justify-between border-b py-2">
                  {name}
                  <div>
                    {parseInt(amount)} {unit} {parseInt(percentOfDailyNeeds)}%
                  </div>
                </div>
              )
            )}
          </span>
        </div>
      </div>
      <h2 className="text-2xl border-b mb-2 pb-2 border-b-orange-100">
        Instructions
      </h2>
      <div
        dangerouslySetInnerHTML={{
          __html: `${instructions}`,
        }}
      ></div>
    </div>
  );
}
