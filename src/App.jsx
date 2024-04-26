import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
    const queryClient = new QueryClient();

    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <Navbar />
                <RouterProvider router={router} />
                <Footer />
            </QueryClientProvider>
        </ChakraProvider>
    );
};

export default App;
