import { useColorModeValue } from '@chakra-ui/react';

interface ColorHookResult {
  required: string
  input: string
  placeholder: string
  border: string
}

export const useColor = (): ColorHookResult => {
  const required = useColorModeValue('#F43F5E', 'black')
  const input = useColorModeValue('rock.900', 'black')
  const placeholder = useColorModeValue('rock.300', 'gray.500')
  const border = useColorModeValue('rock.50', 'white')

  return {
    required,
    input,
    placeholder,
    border,
  };
};