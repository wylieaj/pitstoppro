import { Outlet } from "react-router-dom";
import NavigationBar from "../../components/navigation/NavigationBar";

const LayoutTemplate = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <main className="md:container md:mx-auto flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutTemplate;
