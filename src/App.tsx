import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PageLayout from './pages/PageLayout';
import HomePage from './pages/HomePage';
import SelectPage from './pages/SelectPage';
import ListPage from './pages/ListPage';
import RefinePage from './pages/RefinePage';
import CookPage from './pages/CookPage';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/select', element: <SelectPage /> },
      { path: '/list', element: <ListPage /> },
      { path: '/refine', element: <RefinePage /> },
      { path: '/cook', element: <CookPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
