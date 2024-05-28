import { Container, Text, VStack, Box, Flex, Spacer, Heading, IconButton } from "@chakra-ui/react";
import { FaHome, FaInfoCircle, FaCog } from "react-icons/fa";

const Index = () => {
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
        </VStack>
      </Flex>
    </Container>
  );
};

export default Index;