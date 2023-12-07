import { AppContextProvider } from "./AppContext";
import AdminApp from "./AppRouter/AdminApp";
import UserApp from "./AppRouter/UserApp";

function App() {
  return (
    <AppContextProvider>
      <AdminApp />
      <UserApp />
    </AppContextProvider>
  );
}

export default App;
