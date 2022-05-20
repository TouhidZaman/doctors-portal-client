import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from 'react-query/devtools'

// Create a client
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Layout>
                    <AppRoutes />
                </Layout>
            </BrowserRouter>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    );
}

export default App;
