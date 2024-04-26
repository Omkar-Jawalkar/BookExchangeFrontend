import {
    Flex,
    Input,
    Button,
    Text,
    useToast,
    Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axios/axiosInstance";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const toast = useToast();

    const loginUser = async (data) => {
        try {
            const response = await axiosInstance.post("token/", data);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    };

    const mutation = useMutation({
        mutationFn: (data) => loginUser(data),

        onSuccess: (data) => {
            toast({
                title: "Login successful",
                status: "success",
                isClosable: true,
            });

            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
        },

        onError: () => {
            toast({
                title: "Credientials INVALID",
                status: "error",
                isClosable: true,
            });
        },
    });

    return (
        <Flex
            p={4}
            gap={3}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Text>Login Page</Text>

            <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username / Email"
            />
            <Input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <Button
                onClick={() => {
                    mutation.mutate({
                        username: username,
                        password: password,
                    });
                }}
            >
                {mutation.isPending ? <Spinner /> : "Login"}
            </Button>
        </Flex>
    );
};

export default Login;
