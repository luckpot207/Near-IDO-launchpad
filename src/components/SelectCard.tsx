import { Flex, Select, Text } from '@chakra-ui/react';
import { useColor } from '../hooks';

interface Props {
  title: string
  placeholder: string
  required: boolean
  setData: Function
}

export default function SelectCard({ title, placeholder, required, setData }: Props) {
  const color = useColor();
  return (
    <Flex justifyContent='start' alignItems='center' flexDirection='column' marginTop='4'>
      <Flex width='100%' paddingLeft='2'>
        <Text as='h3' fontSize='14px' textAlign='start'>
          {title}
          {required && <Text as='span' color={color.required}> *</Text>}
        </Text>
      </Flex>
      <Select
        width='100%'
        minHeight='10'
        borderRadius='2xl'
        bgColor={color.border}
        marginTop='5px'
        alignItems='center'
        placeholder={placeholder}
        _placeholderShown={{ color: color.placeholder }}
        fontSize='18px'
        color={color.input}
        onChange={e => setData(e.target.value)}
      >
        <option value='1'>Token 1</option>
        <option value='2'>Token 2</option>
        <option value='3'>Token 3</option>
      </Select>
    </Flex>
  )
}