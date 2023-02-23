import {
	Flex,
	Text,
	Image,
	Grid,
	GridItem,
	Box,
	Show,
	Hide,
	Spacer,
} from '@chakra-ui/react'
import { useColor } from '../../hooks';
import Phone from '../../assets/img/icons/phone.svg'
import Message from '../../assets/img/icons/message.svg'



export default function Footer() {
	const color = useColor();
	return (
		<Box>
			<Show above='md'>
				<Grid
					as='footer'
					width='full'
					paddingY='4'
					paddingX='8'
					alignItems='center'
					templateColumns={'repeat(3, 1fr)'}
					bgColor={color.background}
					color={color.cardBorder}
					borderTop='1px solid'
				>
					<GridItem justifySelf={'left'}>
						<Text as='h3' fontSize='14px' textAlign='start' color={color.currencySymbol} fontWeight='bold'>
							NEAR
						</Text>
						<Text as='h3' fontSize='14px' textAlign='start' color={color.currencyValue}>
							$2.56 USD
						</Text>
					</GridItem>
					<GridItem justifySelf={'center'}>
						<Flex>
							<Image src={Phone} marginEnd='4' />
							<Text as='h3' fontSize='14px' textAlign='start' color={color.contact} fontWeight='bold'>
								1 - (234) 000 - 5678
							</Text>
						</Flex>
					</GridItem>
					<GridItem justifySelf={'right'}>
						<Image src={Message} />
					</GridItem>
				</Grid >
			</Show>
			<Hide above='md'>
				<Grid
					as='footer'
					width='full'
					paddingY='4'
					paddingX='8'
					alignItems='center'
					templateRows={'repeat(2, 1fr)'}
					bgColor={color.background}
					color={color.cardBorder}
					borderTop='1px solid'
				>
					<GridItem>
						<Flex alignItems={'center'} marginLeft={'10px'}>
							<Box>
								<Text as='h3' fontSize='14px' textAlign='start' color={color.currencySymbol} fontWeight='bold'>
									NEAR
								</Text>
								<Text as='h3' fontSize='14px' textAlign='start' color={color.currencyValue}>
									$2.56 USD
								</Text>
							</Box>
							<Spacer/>
							<Box>
								<Image src={Message} />
							</Box>
						</Flex>
					</GridItem>
					<GridItem justifySelf={'center'}>
						<Flex>
							<Image src={Phone} marginEnd='4' />
							<Text as='h3' fontSize='14px' textAlign='start' color={color.contact} fontWeight='bold'>
								1 - (234) 000 - 5678
							</Text>
						</Flex>
					</GridItem>
				</Grid >
			</Hide>
		</Box>

	);
};
