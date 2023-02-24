import { Flex, Text } from "@chakra-ui/react";
import { useColor } from "../hooks";

export default function RuleCard() {
  const color = useColor();
  return (
    <Flex marginY={4} flexDirection={'column'}>
      <Flex flexDirection={'column'}>
        <Text as='h1' fontSize='16px' textAlign='justify' fontWeight='bold' marginY={2}>DISCLAIMER</Text>
        <Text as='h1' fontSize='14px' lineHeight={'18px'} textAlign='justify' fontWeight='bold' marginY={2} color={'#A1A1A1'}>
          Please make sure that you have the intentions to participate and/or deposit funds to Pegasus Launchpad. By clicking the PAY button, you agree to pay the required registration &  listing fee. Your submission may / may not be listed due to the nature of your project and bound to Pegasus Terms & Conditions. In the event if your submission is rejected, you get a full refund to the original addressee. Pegasus will not be liable for any lost, misuse of funds deposited into the pool. You acknowledge that you are solely responsible for managing your funds and ensuring their security.
        </Text>
      </Flex>
      <Flex flexDirection={'column'}>
        <Text as='h1' fontSize='16px' textAlign='justify' fontWeight='bold' marginY={2}>TERMS & CONDITIONS</Text>
        <Text as='h1' fontSize='14px' lineHeight={'18px'} textAlign='justify' fontWeight='bold' marginY={2} color={'#A1A1A1'}>
          By using this website, you are bound to Pegasus terms & conditions. By uploading or posting any content to the website, you grant Pegasus a non-exclusive, perpetual, irrevocable, worldwide, royalty-free license to use, copy, modify, and display that content in any manner. You have acknowledged that you will not use our website for any unlawful purposes, such as hacking, spamming, or posting offensive material, including Damaging, disabling or otherwise impairing the website, or interfering with another party’s use of the website. Pegasus will not be liable for any damages or losses resulting from your use of the website, or from any errors or omissions in the content of the website. Pegasus reserves the right to terminate your access to the website at any time, without notice, for any reason, including but not limited to violation of these terms and conditions. Pegasus reserves the right to change these terms and conditions at any time without prior notice. In the event that any changes are made, the revised terms and conditions shall be posted on this website immediately.
        </Text>
      </Flex>
    </Flex>
  )
}