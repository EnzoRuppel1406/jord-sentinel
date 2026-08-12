import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <section className="container min-w-screen h-screen">
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </section>
        </BrowserRouter>
    );
}

export default App;
