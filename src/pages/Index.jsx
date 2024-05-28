import { Container, Text, VStack, Box, Flex, Spacer, Heading, IconButton, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { FaHome, FaInfoCircle, FaCog } from "react-icons/fa";

import { useEvents } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: events, error, isLoading } = useEvents();
  return (
    <Container maxW="container.xl" p={0}>
      <Flex as="nav" bg="blue.500" color="white" p={4} align="center">
        <Heading size="md">MyApp</Heading>
        <Spacer />
        <IconButton aria-label="Home" icon={<FaHome />} variant="ghost" color="white" />
        <IconButton aria-label="About" icon={<FaInfoCircle />} variant="ghost" color="white" />
        <IconButton aria-label="Settings" icon={<FaCog />} variant="ghost" color="white" />
      </Flex>
      <Flex direction="column" align="center" justify="center" height="calc(100vh - 64px)">
        <VStack spacing={4}>
          <Text fontSize="2xl">Your Blank Canvas</Text>
          <Text>Chat with the agent to start making edits.</Text>
        {isLoading && <Spinner />}
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error.message}
            </Alert>
          )}
          {events && events.map(event => (
            <Box key={event.id} p={4} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{event.name}</Heading>
              <Text mt={4}>{event.description}</Text>
            </Box>
          ))}
        </VStack>
      </Flex>
    </Container>
  );
};

export default Index;