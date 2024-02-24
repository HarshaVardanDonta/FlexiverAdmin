import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminStatistics from "./AdminStatistics";
import NewDriverScreen from "./NewDriverScreen";


export default function AdminMain() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AdminStatistics />} />
                <Route path="/newdrivers" element={<NewDriverScreen />} />
            </Routes>

        </BrowserRouter>
    );
}