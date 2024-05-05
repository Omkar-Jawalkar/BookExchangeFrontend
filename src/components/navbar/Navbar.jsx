import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { UserStore } from "../../store/UserStore";
import { useStore } from "@tanstack/react-store";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navBgColor = useColorModeValue("gray.200", "gray.700");
    const navTextColor = useColorModeValue("gray.800", "whiteAlpha.900");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const isLoggedIn = useStore(UserStore, (state) => state.isLoggedIn);

    return (
        <>
            <Box bg={navBgColor} px={4}>
                <Flex
                    h={16}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Text fontWeight="bold" color={navTextColor}>
                        My BOOK EXCHANGE
                    </Text>

                    <Flex alignItems={"center"}>
                        <Stack direction={"row"} spacing={7}>
                            <Button
                                fontSize={"sm"}
                                fontWeight={600}
                                color={navTextColor}
                                variant={"link"}
                            >
                                Home
                            </Button>
                            <Button
                                fontSize={"sm"}
                                fontWeight={600}
                                color={navTextColor}
                                variant={"link"}
                            >
                                About
                            </Button>
                            <Button
                                fontSize={"sm"}
                                fontWeight={600}
                                color={navTextColor}
                                variant={"link"}
                                onClick={onOpen}
                            >
                                Account
                            </Button>
                            <a href="/book/add">Add a Book</a>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                localStorage.clear();
                                window.location.href = "/login";
                            }}
                        >
                            Logout
                        </Button>
                        <Text>This is the account modal.</Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Navbar;
