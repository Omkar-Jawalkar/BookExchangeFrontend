import {
    Box,
    Button,
    Input,
    Text,
    Flex,
    Image,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
    Textarea,
    Heading,
    Spinner,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import axiosInstance from "../../axios/axiosInstance";

const fetchBook = async (isbn) => {
    try {
        const response = await axiosInstance.post("book_details/", {
            isbn: isbn,
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

const addBook = async (addBookData) => {
    console.log(addBookData);
    try {
        const response = await axiosInstance.post(
            "add_book_to_user/",
            addBookData
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const BookSearch = () => {
    const [isbn, setIsbn] = useState("");
    const [bookData, setBookData] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const toast = useToast();

    const { mutate: fetchBookMutation, isPending: isFetchingBook } =
        useMutation({
            mutationFn: () => fetchBook(isbn),
            onSuccess: (data) => {
                let bookData = data?.data[`ISBN:${isbn}`];
                if (bookData) {
                    setBookData(bookData);
                }
                toast({
                    title: "Fetched",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            },
            onError: (error) => {
                toast({
                    title: "Error fetching book",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            },
        });

    const { mutate: addBookMutation, isPending: isAddingBook } = useMutation({
        mutationFn: () => {
            const addBookData = {
                author_name: bookData?.details?.authors
                    ? bookData?.details?.authors[0]?.name
                    : "No-author",
                author_description: "...",
                name: bookData?.details?.title,
                isbn: bookData?.details?.isbn_13[0]
                    ? bookData?.details?.isbn_13[0]
                    : isbn,
                description: description,
                price: 12.99,
                category: category,
                cover_image: bookData?.thumbnail_url,
            };
            return addBook(addBookData);
        },
        onSuccess: () => {
            toast({
                title: "Book added",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setIsOpen(false);
        },
        onError: (error) => {
            console.log(error);
            toast({
                title: "Error adding book",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        },
    });

    return (
        <Box>
            <Heading textAlign={"center"} p={4}>
                Add a Book
            </Heading>
            <Flex p={4} mb={4}>
                <Input
                    mr={2}
                    placeholder="Enter ISBN"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                />
                <Button
                    onClick={() => fetchBookMutation()}
                    isLoading={isFetchingBook}
                >
                    Search
                </Button>
            </Flex>

            {Object.keys(bookData).length > 0 ? (
                <Box
                    p={4}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                >
                    <Flex alignItems="center" mb={2}>
                        <Image
                            src={bookData?.thumbnail_url}
                            boxSize="100px"
                            mr={4}
                        />
                        <Box>
                            <Text fontWeight="bold">
                                {bookData?.details?.title}
                            </Text>
                            <Text>{bookData?.details?.publishers[0]}</Text>
                        </Box>
                    </Flex>
                    <Button
                        colorScheme="green"
                        onClick={() => setIsOpen(true)}
                        mt={2}
                    >
                        Add this book
                    </Button>
                </Box>
            ) : (
                <Text textAlign={"center"}>
                    {isFetchingBook ? <Spinner /> : " No books, Please search "}{" "}
                </Text>
            )}

            {/* Modal */}

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Book</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text py={4} fontWeight="bold">
                            {bookData?.details?.title}
                        </Text>
                        <Select
                            placeholder="Select category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            mb={4}
                        >
                            <option value="fiction">Fiction</option>
                            <option value="non-fiction">Non-Fiction</option>
                            <option value="mystery">Mystery</option>
                            {/* Add more categories as needed */}
                        </Select>
                        <Textarea
                            placeholder="How was the book, please add some description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={() => {
                                addBookMutation();
                            }}
                            isLoading={isAddingBook}
                            colorScheme="blue"
                            mr={3}
                        >
                            Confirm
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default BookSearch;
