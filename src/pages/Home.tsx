import {
  faBook,
  faChartLine,
  faClock,
  faHeart,
  faLeaf,
  faLightbulb,
  faSearch,
  faUtensils
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import Footer from "../components/common/Footer";
import DefaultNav from "../components/common/Navbar";
import { getTrivia } from "../redux/actions/foodActions";
// import { RootState } from "../redux/store"; // Not exported, use 'any' or define type
import { checkLocationState } from "../utils/checkLocationState";


const Home: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const trivia = useSelector((state: any) => state?.food?.trivia);
  const [onImage, setOnImage] = useState(false);
  useEffect(() => {
  dispatch<any>(getTrivia());
    checkLocationState(location, navigate);
  }, []);

  const features = [
    {
      icon: faSearch,
      title: "Explore Foods",
      description: "Search through thousands of dishes and discover new flavors from around the world.",
      color: "text-blue-400"
    },
    {
      icon: faBook,
      title: "Detailed Information",
      description: "Get comprehensive nutritional facts, ingredients, and cooking methods for every dish.",
      color: "text-green-icon"
    },
    {
      icon: faHeart,
      title: "Health Insights",
      description: "Learn about health benefits, dietary considerations, and make informed food choices.",
      color: "text-orange-icon"
    },
    {
      icon: faChartLine,
      title: "Track Your Diet",
      description: "Monitor your food intake and maintain a balanced, healthy lifestyle with ease.",
      color: "text-yellow-icon"
    }
  ];

  const benefits = [
    {
      icon: faClock,
      title: "Save Time",
      description: "Quick access to food information without endless searching."
    },
    {
      icon: faLeaf,
      title: "Eat Healthier",
      description: "Make better food choices with complete nutritional data."
    },
    {
      icon: faUtensils,
      title: "Discover More",
      description: "Expand your culinary horizons with diverse food options."
    }
  ];

  return (
    <>
      <DefaultNav />
        <div className="min-h-screen text-gray-900 bg-white">

        {/* Hero Section with Clean Background */}
        <section className="relative pt-32 pb-24 px-5 overflow-hidden">
          {/* Subtle Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 -z-10"></div>

          {/* Decorative Shapes */}
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-20 -z-10"></div>

          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Hero Text */}
              <div className="flex flex-col gap-8 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full w-fit text-sm font-medium">
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                  Your Complete Food Companion
                </div>

                <h1 className="text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                  Discover
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
                    Food Details
                  </span>
                  <span className="block text-gray-900">Instantly</span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Access comprehensive nutritional information, ingredients, and health insights for thousands of dishes—all in one place.
                </p>

                <div className="flex flex-wrap gap-4 mt-4">
                  <Link
                    className="group bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 no-underline rounded-xl font-semibold shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300 flex items-center gap-2"
                    to="/food-list"
                  >
                    Start Exploring
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <Link
                    className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 px-8 py-4 no-underline rounded-xl font-semibold transition-all duration-300"
                    to="/food-list"
                  >
                    Learn More
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 mt-8 pt-8 border-t border-gray-200">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">1000+</div>
                    <div className="text-sm text-gray-600">Food Items</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-icon">500+</div>
                    <div className="text-sm text-gray-600">Recipes</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-icon">100%</div>
                    <div className="text-sm text-gray-600">Accurate Data</div>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="order-1 lg:order-2 relative">
                <div className="relative">
                  {/* Image Background Decoration */}
                  <div
                  onMouseEnter={() => setOnImage(true)}
                  onMouseLeave={() => setOnImage(false)}
                  className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-3xl blur-2xl opacity-20"></div>

                  <img
                    src="./img/food-hero-2.jpg"
                    width="600"
                    loading="lazy"
                    height="600"
                    className="relative w-full h-auto rounded-3xl shadow-2xl"
                    alt="Delicious Food"
                  />

                  {/* Floating Card */}
                  <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <FontAwesomeIcon icon={faLeaf} className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Fresh & Healthy</div>
                        <div className="text-sm text-gray-600">Nutrition Guaranteed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

                {/* CTA Section */}
        <section className="px-5 py-20 bg-blue-400 text-white">
          <div className="w-full max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Food Journey?</h2>
            <p className="text-xl mb-8 text-blue-50">
              Join thousands of food enthusiasts who trust FoodTrack for their daily nutrition insights
            </p>
            <Link
              className="inline-block bg-white text-blue-400 px-10 py-4 no-underline rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300"
              to="/food-list"
            >
              Explore Foods Now
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-5 py-20 bg-gray-50">
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose FoodTrack?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Everything you need to make informed decisions about your food and nutrition
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`${feature.color} text-4xl mb-4`}>
                    <FontAwesomeIcon icon={feature.icon} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-5 py-20">
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Key Benefits</h2>
              <p className="text-gray-600 text-lg">Transform your relationship with food</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:border-blue-300 transition-all duration-300"
                >
                  <div className="text-blue-400 text-5xl mb-4">
                    <FontAwesomeIcon icon={benefit.icon} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Food Trivia Section */}
        <section className="px-5 py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white border-2 border-yellow-icon rounded-2xl shadow-lg overflow-hidden">
              <div className="flex items-center gap-3 bg-yellow-50 border-b-2 border-yellow-icon p-6">
                <FontAwesomeIcon icon={faLightbulb} className="text-yellow-icon text-2xl" />
                <h2 className="text-2xl font-semibold text-gray-800">Daily Food Trivia</h2>
              </div>
              <div className="p-8">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {trivia
                    ? trivia
                    : "Recognizing that food is more than sustenance—it is an expression of culture, heritage, and creativity. Every dish tells a story of tradition and innovation."}
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* Footer */}
        <Footer />

        <ToastContainer
          position="top-right"
          closeOnClick={true}
          hideProgressBar={true}
          transition={Flip}
          pauseOnFocusLoss={true}
          autoClose={1000}
          className="mt-14"
        />
      </div>
    </>
  );
}

export default Home;