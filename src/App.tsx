import { useState } from 'react';
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
  const [acceptedList, setAcceptedList] = useState<string[][]>([]);
  const [rejectedList, setRejectedList] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('');

  const acceptRecipeHandler = (id: string, title: string) => {
    setAcceptedList((previousState) => [...previousState, [id, title]]);
  };

  const rejectRecipeHandler = (id: string) => {
    setRejectedList((previousState) => [...previousState, id]);
  };

  const removeRecipeHandler = (removeId: string) => {
    setAcceptedList((preciousState) =>
      preciousState.filter(([id]) => id !== removeId)
    );
  };

  const selectRecipeHandler = (selectedId: string) => {
    setSelected(selectedId);
    setRoute('CookPage');
  };

  return <RouterProvider router={router} />;
}
