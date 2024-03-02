import PropTypes from "prop-types";

import CloseIcon from "@mui/icons-material/Close";

const InfoPopup = ({ enabled, onClose }) => {
  if (!enabled) return null;

  return (
    <div
      className="overlay fixed flex top-0 left-0 w-screen h-screen bg-black/40 justify-center items-center z-20"
      onClick={onClose}
    >
      <div className="modal bg-gray-300 w-[50%] h-[90%] rounded-xl drop-shadow-lg p-12">
        <button className="fixed top-2 right-2">
          <CloseIcon className="overlay-close" />
        </button>
      </div>
    </div>
  );
};

export { InfoPopup as Popup };

InfoPopup.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
