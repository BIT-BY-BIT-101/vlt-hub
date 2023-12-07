/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import { IonApp, IonContent, setupIonicReact } from "@ionic/react";
import RouteService from "./router/RouteService";
import TestRoutes from "./router/TestRoutes";
import "./theme/variables.css";
import useFirebaseStorage from "./hooks/useFirestorage";
import useFirebaseAuth from "./hooks/useFirebaseAuth";

setupIonicReact();

const App: React.FC = () => {
  const { user } = useFirebaseAuth();

  console.log(user);
  return (
    <IonApp>
      <RouteService />
      {/* <TestRoutes /> */}
      {/* <Home /> */}
    </IonApp>
  );
};

export default App;
