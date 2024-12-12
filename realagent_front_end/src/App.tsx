import "./css/global.css";
import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/carousel/styles.css";
import '@mantine/dates/styles.css';
import '@mantine/tiptap/styles.css';

import CustomRouter from "./route/route";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/root-store";
import { Toaster } from "sonner";
import { ErrorBoundary } from 'react-error-boundary';
import SomethingWentWrong from './pages/ErrorScreen/SomethingWentWrong';
import { MeetingProvider } from './context/MeetingContext';

function App() {
  // usePreventZoom();
  // useResetZoom();

  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<SomethingWentWrong />}>
        <Toaster richColors />
        <Provider store={store}>
          <MeetingProvider>
            <CustomRouter />
          </MeetingProvider>
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
