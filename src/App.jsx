import { AuthProvider } from "./context/UseAuth";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
