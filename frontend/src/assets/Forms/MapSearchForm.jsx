import { Form } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { fetchPostcode } from "../../util/fetchPostcode";
import { useState } from "react";

const MapSearchForm = ({ updateCoords }) => {
  const [isError, setIsError] = useState({ error: false, message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const coords = await fetchPostcode(data.postcode);
      updateCoords(coords);
      setIsError({
        error: false,
        message: "",
      });
    } catch (error) {
      console.log(error);
      setIsError({
        error: true,
        message: "Invalid postcode, Please try again.",
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 py-5 w-screen bg-gunmetal md:container md:w-screen">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              name="postcode"
              placeholder="Please enter postcode..."
              className="pl-2 rounded text-sm"
            />
            <button
              type="submit"
              className="px-4 py-1 rounded bg-primary text-ivory hover:bg-opacity-50"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="sm"
                style={{ color: "#ffffff" }}
              />
            </button>
          </div>

          {isError.error && (
            <p className="text-xs text-left text-red-600">{isError.message}</p>
          )}
        </div>
      </div>
    </Form>
  );
};

export default MapSearchForm;
