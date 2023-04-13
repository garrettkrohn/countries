import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import { RouterProvider } from '@tanstack/react-router';
import {router} from "./routes";

//tanstack router boiler-plate
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const queryClient = new QueryClient();

function App() {

    //passes the query client to the entire application
    //RouterProvider is from tanstack query
  return (
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
      </QueryClientProvider>
  )
}

export default App
