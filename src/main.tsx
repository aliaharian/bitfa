import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WalletsList from '@/pages/walletsList';
import WalletInfo from '@/pages/walletInfo';
import { BarController, BarElement, CategoryScale, Chart, LinearScale, LineController, LineElement, PointElement, Tooltip } from 'chart.js/auto';

const router = createBrowserRouter([
  {
    path: "/",
    element: <WalletsList />,
  },
  {
    path: "/:wallet",
    element: <WalletInfo />,
  },
]);

Chart.register(CategoryScale,LineController,BarElement,BarController, LineElement, PointElement, LinearScale,Tooltip);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
  </>,
)
