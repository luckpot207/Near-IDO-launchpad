import { Flex, Input, Text } from '@chakra-ui/react';
import { useColor } from '../hooks';
import { directionProp } from '../utils/style';

interface Props {
  title: string
  placeholder: string
  required: boolean
  setData: Function
  direction?: directionProp
}

export default function InputCard({ title, placeholder, required, setData, direction = directionProp.column }: Props) {
  const color = useColor();
  return (
    <Flex justifyContent='start' alignItems='center' flexDirection={direction} marginTop='4'>
      <Flex width='100%' paddingLeft='2'>
        <Text as='h3' fontSize='14px' textAlign='start'>
          {title}
          {required && <Text as='span' color={color.required}> *</Text>}
        </Text>
      </Flex>
      <Input
        width='100%'
        minHeight='10'
        paddingY='2'
        paddingX='5'
        borderRadius='2xl'
        bgColor={color.inputbg}
        marginTop='5px'
        alignItems='center'
        placeholder={placeholder}
        _placeholder={{ color: color.placeholder }}
        fontSize='18px'
        color={color.input}
        onChange={e => setData(e.target.value)}
      />
    </Flex>
  )
}