import { Button, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { ColorModeButton } from '@/components/ui/color-mode'

function App() {
  return (
    <Stack gap="6" p="8" align="flex-start">
      <HStack justify="space-between" w="full">
        <Heading size="2xl">curs_react_hw</Heading>
        <ColorModeButton />
      </HStack>
      <Text color="fg.muted">
        React + Vite + Chakra UI scaffolding is ready.
      </Text>
      <HStack>
        <Button colorPalette="blue">Primary</Button>
        <Button variant="outline">Secondary</Button>
      </HStack>
    </Stack>
  )
}

export default App
