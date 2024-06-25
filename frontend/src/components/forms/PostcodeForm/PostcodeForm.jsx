import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-router-dom";

const PostcodeForm = ({ getPostcode, savedPostcode }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    getPostcode(data.postcode);
  };

  return (
    <Form className="flex flex-col gap-1 items-center" onSubmit={handleSubmit}>
      <label htmlFor="postcode" className="text-primary">
        Postcode Search
      </label>
      <div>
        <input
          type="text"
          name="postcode"
          id="postcode"
          placeholder="Enter postcode..."
          className="p-2 rounded-l-lg"
          defaultValue={savedPostcode && savedPostcode}
        />
        <button
          type="submit"
          className="py-2 px-4 bg-bgBtn text-primary rounded-r-lg hover:bg-bgBtnHover transition-all"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="" />
        </button>
      </div>
    </Form>
  );
};

export default PostcodeForm;
