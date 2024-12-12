import { useRouteError } from "react-router-dom";
import NothingFound from "./NothingFound";
import ServerError from "./ServerError";
import ServerOverload from "./ServerOverload";

export type ErrorResponse = {
  status: number;
  statusText: string;
  internal: boolean;
  data: string;
};

function ErrorScreen() {
  const error = useRouteError() as ErrorResponse;

  if (error && error.status) {
    console.error(`Error: ${error.status} - ${error.statusText || ""}`);

    switch (error.status) {
      case 404:
        return <NothingFound />;
      case 500:
        return <ServerError />;
      case 503:
        return <ServerOverload />;
      default:
        return <ServerError />;
    }
  } else {
    console.error(error);
    return <ServerError />;
  }
}

export default ErrorScreen;
