import React from "react";
import { useMutation } from "@tanstack/react-query";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
    useToast,
} from "@chakra-ui/react";
import axiosInstance from "../../axios/axiosInstance";

const RegisterUser = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const toast = useToast();


    

    const registerUser = async (userData) => {
        try {
            const response = await axiosInstance.post("create_user/", userData);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    };

    const registerUserMutation = useMutation({
        mutationFn: (userData) => registerUser(userData),
        onSuccess: () => {
            toast({
                title: "Register Successfully",
                status: "success",
                isClosable: true,
            });
        },
        onError: () => {
            toast({
                title: "Please Try again",
                status: "error",
                isClosable: true,
            });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const userData = { username, password, email };
        registerUserMutation.mutate(userData);
    };

    return (
        <Box p={6} borderWidth={1} borderRadius={8} boxShadow="lg">
            <form onSubmit={handleSubmit}>
                <FormControl mb={4}>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </FormControl>

                <FormControl mb={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FormControl>

                <FormControl mb={4}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </FormControl>

                <FormControl mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormControl>

                <Button
                    colorScheme="blue"
                    type="submit"
                    isLoading={registerUserMutation.isPending}
                >
                    Register
                </Button>

                {registerUserMutation.isError && (
                    <Text color="red.500" mt={4}>
                        {registerUserMutation.error.message}
                    </Text>
                )}
            </form>
        </Box>
    );
};

export default RegisterUser;
