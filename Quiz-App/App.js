import "react-native-gesture-handler";
import { AppWindow } from "./src/AppWindow";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <AppWindow />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
