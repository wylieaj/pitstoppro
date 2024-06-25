import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigation } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigation();
  const isLoading = navigate.state === "loading";
  return (
    <div className=" h-svh flex justify-center items-center p-4">
      <div className="bg-bgDark h-full flex flex-col justify-center items-center gap-8 rounded-lg">
        <p className="bg-primary rounded-xl p-4">
          <FontAwesomeIcon
            icon={faGasPump}
            size="2xl"
            style={{ color: "#272932" }}
            className="text-7xl"
          />
        </p>
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-5xl text-primary font-semibold">Pit Stop Pro</h1>
          <p className="text-sm mx-8 text-center text-primaryDarken">
            Easily locate the lowest fuel prices around with Pit Stop Pro!
          </p>
        </div>
        <Link to="/home">
          <button
            className="bg-bgBtn text-primary py-2 px-4 rounded-xl text-lg hover:bg-bgBtnHover transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Find Now!"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
