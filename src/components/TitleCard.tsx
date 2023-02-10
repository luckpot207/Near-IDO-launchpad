import { Flex, Heading } from "@chakra-ui/react";

interface Props {
  title: string
}

export default function TitleCard({ title }: Props) {
  return (
    <Flex paddingY="8" justifyContent='center'>
      <Heading fontSize="5xl" as='h1' bgGradient='linear(to-b, #993FF4FF, #993FF400)' bgClip='text'>{title}</Heading>
    </Flex>
  )
}