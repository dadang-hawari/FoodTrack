import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-white text-gray-900">
      <hr />
      <div className="max-w-[1200px] mx-auto flex justify-between py-8  px-5 flex-wrap gap-3 footer">
        <div>
          <h2>FoodTrack</h2>
          <p>Know Your Food</p>
        </div>
        <div>
          <h2>Navigation</h2>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li className="mt-2">
              <Link to={"/food-list"}>Food List</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2>Credits</h2>
          <ul>
            <li>
              <a href="#" rel="noreffer" target="_blank">
                Spoonacular
              </a>
            </li>
            <li className="mt-2">
              <a
                rel="noreffer"
                target="_blank"
                href="https://www.vecteezy.com/free-vector/flat-background-design"
              >
                Flat Background Design Vectors by Vecteezy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Address</h2>
          <p>Gowa, South Sulawesi, Indonesia</p>
        </div>
      </div>
      <hr />
      <div className="text-center py-9">
        <p>
          All food data obtained from{" "}
          <a href="https://spoonacular.com/food-api" target="_blank">
            Spoonacular.
          </a>
        </p>
        <p>Copyright © {new Date().getFullYear()} - FoodTrack. All Rights Reserved.</p>
      </div>
    </div>
  );
}
