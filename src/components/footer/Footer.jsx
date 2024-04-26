import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

const Footer = () => {
    const footerBgColor = useColorModeValue("gray.100", "gray.900");
    const footerTextColor = useColorModeValue("gray.600", "gray.400");

    return (
        <Box bg={footerBgColor}>
            <Container maxW="container.lg" py={10}>
                <Stack spacing={4} align="center">
                    <Text fontSize="sm" color={footerTextColor}>
                        &copy; {new Date().getFullYear()} My App. All rights
                        reserved.
                    </Text>
                    <Stack direction="row" spacing={4}>
                        <Text fontSize="sm" color={footerTextColor}>
                            Privacy Policy
                        </Text>
                        <Text fontSize="sm" color={footerTextColor}>
                            Terms of Service
                        </Text>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
