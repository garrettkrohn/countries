import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import './App.css'
import Navbar from "./components/navbar/Navbar";
import {getCountries} from "./services/countriesApi";
import Loading from "./utilities/Loading";
import Error from "./utilities/Error";
import Homepage from "./components/homepage/Homepage";

const queryClient = new QueryClient();

function App() {

  return (
      <QueryClientProvider client={queryClient}>
          <div>
              <Navbar />
              <Homepage />
          </div>
      </QueryClientProvider>
  )
}

export default App
