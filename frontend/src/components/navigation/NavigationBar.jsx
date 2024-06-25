import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigation } from "react-router-dom";

const NavigationBar = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const cssClass =
    "h-full flex items-center px-4 bg-bgDarkSub text-primaryDarken hover:text-primary hover:bg-bgDark transition-all";

  return (
    <nav className="h-12 flex justify-center divide-x divide-bgDark">
      {isLoading ? (
        <div className={cssClass}>
          <FontAwesomeIcon icon={faSpinner} className={`text-4xl spinner`} />
        </div>
      ) : (
        <Link to="/home">
          <div className={cssClass}>
            <FontAwesomeIcon icon={faHouse} className="text-4xl " />
          </div>
        </Link>
      )}
    </nav>
  );
};

export default NavigationBar;
