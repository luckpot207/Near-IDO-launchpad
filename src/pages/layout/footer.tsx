import {
	Flex,
	Text,
	Image,
} from '@chakra-ui/react'
import { useColor } from '../../hooks';
import Phone from '../../assets/img/icons/phone.svg'
import Message from '../../assets/img/icons/message.svg'



export default function Footer() {
	const color = useColor();
	return (
		<Flex
			as='footer'
			width='full'
			minHeight='7rem'
			paddingY='4'
			paddingX='8'
			alignItems='center'
			bgColor={color.background}
			color={color.cardBorder}
			borderTop='1px solid'
		>
			<Flex width='10%' justifyContent='space-between'>
				<Text as='h3' fontSize='14px' textAlign='start' color={color.currencySymbol} fontWeight='bold'>
					NEAR
				</Text>
				<Text as='h3' fontSize='14px' textAlign='start' color={color.currencyValue}>
					$2.56 USD
				</Text>
			</Flex>
			<Flex width='80%' justifyContent='center'>
				<Image src={Phone} marginEnd='4' />
				<Text as='h3' fontSize='14px' textAlign='start' color={color.contact} fontWeight='bold'>
					1 - (234) 000 - 5678
				</Text>
			</Flex>
			<Flex width='10%' justifyContent='end'>
				<Image src={Message} />
			</Flex>
		</Flex >
	);
};
