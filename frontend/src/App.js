import RouterWeb from "./Routes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouterWeb />
      </AuthProvider>
    </div>
  );
}

export default App;
