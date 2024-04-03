import PropTypes from "prop-types";

import Filter from "./Filter";

import CloseIcon from "@mui/icons-material/Close";

const InfoPopup = ({ enabled, onClose, data }) => {
  if (!enabled) return null;

  console.log(data);

  return (
    <div
      className="overlay fixed flex top-0 left-0 w-screen h-screen bg-black/40 justify-center items-center z-20"
      onClick={onClose}
    >
      <div className="flex flex-col bg-gray-300 w-full sm:w-[90%] md:w-[80%] xl:w-[70%] h-full sm:h-[90%] md:h-[80%] sm:rounded-lg drop-shadow-lg overflow-y-hidden">
        <div className="modal overflow-y-auto px-12 py-10">
          <button
            className="overlay-close fixed top-2 right-2 p-1 hover:bg-gray-400 rounded-full"
            onClick={onClose}
          >
            <CloseIcon
              style={{ fontSize: 25 }}
              className="overlay-close text-red-700"
            />
          </button>

          <img
            src={
              data["image"]
                ? "../../src/assets/images/" + data["image"]
                : "../../src/assets/images/no-image.svg"
            }
            loading="lazy"
            className="w-full sm:w-[70%] md:w-[50%] xl:w-[40%] h-[35%] sm:h-[50%] object-cover object-center border border-gray-500 lg:brightness-90"
          ></img>

          <h1 className="text-2xl font-medium mt-4 text-gray-800">
            {data["name"]}
          </h1>
          {data["description"] && (
            <h2 className="text-lg mt-1">{data["description"]}</h2>
          )}

          <div className="flex flex-wrap gap-2 my-3 ml-[-5px]">
            {data["filters"].map((filter, index) => (
              <Filter key={index} text={filter} />
            ))}
          </div>

          {data["ingredients"] && (
            <>
              <h2 className="text-xl font-medium">Ingredients</h2>
              <ul className="ml-6">
                {data["ingredients"].split(", ").map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </>
          )}
          <h2 className="text-xl mt-1 font-medium">Nutrients</h2>
          <ul className="ml-6 mb-3">
            {Object.entries(data["nutrients"])
              .filter(
                ([, value]) =>
                  !value.startsWith("-") &&
                  (!value.startsWith("0") || value.startsWith("0."))
              )
              .map(([key, value], index) => (
                <li key={index}>
                  {key}: {value}
                </li>
              ))}
          </ul>

          <a
            href={data["image_source"]}
            target="_blank"
            rel="noreferrer"
            className="text-blue underline"
          >
            Image Source
          </a>
        </div>
      </div>
    </div>
  );
};

export { InfoPopup as Popup };

InfoPopup.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
