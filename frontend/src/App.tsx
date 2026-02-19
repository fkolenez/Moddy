import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Homepage } from "./pages/Homepage";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Drilling } from "./pages/Drilling";
import { WorkoutDayPage } from "./pages/WorkoutDay";
import { Gallery } from "./pages/Gallery";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/drilling" element={ <Drilling />} />
            <Route path="/workouts/:date" element={<WorkoutDayPage />} />
            <Route path="/gallery" element={<Gallery />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
