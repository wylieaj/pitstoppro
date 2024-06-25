import { useActionData, useRouteError } from "react-router-dom";
import NavigationBar from "../../components/navigation/NavigationBar";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  let status = "404";
  let title = "Page Not Found";
  let message =
    "We can't seem to find what you are looking for, please try again later.";

  if (error.data) {
    switch (error.data.status) {
      case 500:
        status = error.data.status;
        title = error.data.title;
        message = error.data.message;
        break;
      case 404:
        status = error.data.status;
        title = error.data.title;
        message = error.data.message;
        break;

      default:
        break;
    }
  }

  return (
    <>
      <NavigationBar />
      <div className="flex flex-col items-center mt-32 lg:mt-64 lg:flex-row lg:justify-center">
        <div className="flex flex-col-reverse gap-2 justify-center items-center p-5 divide-y-2 divide-y-reverse lg:bg-transparent lg:flex-row lg:divide-y-0 lg:divide-x-2 lg:p-0">
          <p className="text-9xl text-ivory lg:mx-20 lg:pl-32 ">{status}</p>
          <div className="flex flex-col items-center gap-2 lg:py-5">
            <p className="text-2xl text-red-600 font-semibold lg:text-4xl">
              {title}
            </p>
            <p className="text-ivory text-lg w-2/3 text-center mb-5">
              {message}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
