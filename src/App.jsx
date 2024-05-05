import { RouterProvider, BrowserRouter } from "react-router-dom";
import router from "./routes/Routes";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Flex } from "@chakra-ui/react";

const App = () => {
    const queryClient = new QueryClient();

    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <Flex
                    h={"100vh"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                >
                    <Flex
                        flexDirection={"column"}
                        justifyContent={"space-between"}
                    >
                        <Navbar />
                        <RouterProvider router={router} />
                    </Flex>

                    <Footer />
                </Flex>
            </QueryClientProvider>
        </ChakraProvider>
    );
};

export default App;
