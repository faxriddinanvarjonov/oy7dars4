import { useDispatch, useSelector } from "react-redux";
import { getData } from "./redux/weather";

import clear from "./assets/clear.png";
import clouds from "./assets/clouds.png";
import drizzle from "./assets/drizzle.png";
import humidity from "./assets/humidity.png";
import mist from "./assets/mist.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import waiting from "./assets/waiting.png";
import { useRef } from "react";

function App() {
  let city = useRef("");
  let weather = useSelector((state) => state);
  let dispatch = useDispatch(getData());
  console.log(weather);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(getData(city.current.value));
  }

  return (
    <>
      <div className="flex items-center justify-center gap-8 flex-col pt-4 pb-4">
        <div
          title="header"
          className="container max-w-[1150px] flex items-center justify-between bg-slate-700 pt-2 pb-2 pl-4 pr-4 rounded-xl"
        >
          <button
            className="btn sm:w-[150px] font-bold text-zinc-900"
            onClick={() => {
              dispatch(getData());
            }}
          >
            Get weather
          </button>
          <div className="flex items-center gap-1">
            <span className="font-bold text-lg cursor-pointer select-none">
              <label className="swap swap-flip">
                <input type="checkbox" className="h-5" />

                <div className="swap-on text-yellow-50">Creator:</div>
                <div className="swap-off text-yellow-50">Developer:</div>
              </label>
            </span>
            <a
              href="https://github.com/faxriddinanvarjonov"
              target="_blank"
              className="font-bold text-xl btn btn-success"
            >
              Git hub
            </a>
          </div>
        </div>
        <div className="flex sm:w-[500px] min-h-[500px] bg-green-300 rounded-xl items-center p-6 flex-col">
          <form
            onSubmit={handleSubmit}
            className="input input-bordered flex items-center gap-2 sm:w-[400px]"
          >
            <input
              type="text"
              className="grow"
              placeholder="Search"
              ref={city}
            />
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70 cursor-pointer hover:text-black"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
          {weather.weather.weather.cod != 404 ? (
            <>
              <img
                className="w-[250px]"
                src={
                  weather.weather.status == "succes"
                    ? (weather.weather.weather.weather[0].main == "Clouds" &&
                        clouds) ||
                      (weather.weather.weather.weather[0].main == "Clear" &&
                        clear) ||
                      (weather.weather.weather.weather[0].main == "Drizzle" &&
                        drizzle) ||
                      (weather.weather.weather.weather[0].main == "Humidity" &&
                        humidity) ||
                      (weather.weather.weather.weather[0].main == "Mist" &&
                        mist) ||
                      (weather.weather.weather.weather[0].main == "Rain" &&
                        rain) ||
                      (weather.weather.weather.weather[0].main == "Snow" &&
                        snow)
                    : waiting
                }
                alt="weather"
              />
              <h1 className="text-3xl sm:text-6xl text-yellow-50 font-bold">
                {weather.weather.status == "succes"
                  ? Math.trunc(weather.weather.weather.main.temp) / 10
                  : "?"}
                *C
              </h1>
            </>
          ) : (
            <h1 className="text-4xl font-bold text-white mt-10">City not found!</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
