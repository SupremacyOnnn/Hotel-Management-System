import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import HotelScreen from "./screens/HotelScreen";
import Try from "./screens/Try";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RoomScreen from "./screens/RoomScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import IndividualRoomScreen from "./screens/IndividualRoomScreen";
import PrivateRoute from "./components/PrivateRoute";
import ProfileScreen from "./screens/ProfileScreen";
import UserBookingScreen from "./screens/UserBookingScreen";
import OrderScreen from "./screens/OrderScreen";
import CancelledBookingScreen from "./screens/CancelledBookingScreen";
import VillaBookingScreen from "./screens/Admin/VillaBookingScreen";
import AdminRoute from "./components/AdminRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />}></Route>
      <Route path="/:id" element={<HotelScreen />}></Route>
      <Route path="/:id/room" element={<RoomScreen />}></Route>
      <Route
        path="/:id/room/:roomId/:fromDate/:toDate"
        element={<IndividualRoomScreen />}
      ></Route>

      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="/signup" element={<RegisterScreen />}></Route>
      <Route path="/try" element={<Try />}></Route>

      <Route path="" element={<PrivateRoute />}>
        <Route
          path="/:id/room/:roomid/checkout"
          element={<CheckoutScreen />}
        ></Route>
        <Route path="/profile" element={<ProfileScreen />}></Route>
        <Route path="/myBooking" element={<UserBookingScreen />}></Route>
        <Route path="/order/:bookingId" element={<OrderScreen />}></Route>
        <Route
          path="/cancel/:bookingId"
          element={<CancelledBookingScreen />}
        ></Route>
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/villaBooking" element={<VillaBookingScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
