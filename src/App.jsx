import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Root from './Root';
import StatsPage from './pages/StatsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import SettingsPage from './pages/SettingsPage';
import Login from './pages/Login';
import InvalidPage from './pages/Invalid';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<ApplicationsPage />} />
      <Route path="login" element={<Login />} />
      <Route path="stats" element={<StatsPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="invalid" element={<InvalidPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
