import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import './App.css'
import Navbar from "./components/navbar/Navbar";
import {getCountries} from "./services/countriesApi";
import Loading from "./utilities/Loading";
import Error from "./utilities/Error";
import Homepage from "./components/homepage/Homepage";
import { RouterProvider } from '@tanstack/react-router';
import {router} from "./routes";

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const queryClient = new QueryClient();

function App() {

  return (
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
      </QueryClientProvider>
  )
}

export default App
