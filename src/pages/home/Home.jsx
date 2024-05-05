import { useState, useEffect } from "react";
import {
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    Grid,
    GridItem,
    Heading,
    Text,
    Image,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios/axiosInstance";

const SearchBooks = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]);

    const getBooks = async (locationData) => {
        try {
            const response = await axiosInstance.get("get_all_nearby_books/", {
                currentLatitude: locationData.latitude,
                currentLongitude: locationData.Longitude,
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    };

    const { data } = useQuery({
        queryKey: ["books"],
        queryFn: (locationData) => getBooks(locationData),
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Box p={6}>
            <InputGroup mb={6}>
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                />
            </InputGroup>

            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {data?.data?.map((book) => (
                    <GridItem
                        key={book.id}
                        boxShadow="md"
                        p={6}
                        borderRadius="md"
                    >
                        <Image src={book.cover_image} alt={book.title} mb={4} />
                        <Heading as="h3" size="md" mb={2}>
                            {book.name}
                        </Heading>
                        <Text>Category : {book.category}</Text>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
};

export default SearchBooks;
