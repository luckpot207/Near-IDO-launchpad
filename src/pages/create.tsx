import { useState, useEffect, useRef } from "react";
import { Flex, Text, Input, Button, Skeleton, Image } from "@chakra-ui/react";
import CreationCard from "../components/CreationCard";
import TitleCard from "../components/TitleCard";
import InputCard from "../components/InputCard";
import SelectCard from "../components/SelectCard";
import DateCard from "../components/DateCard";
import { useColor } from "../hooks";
import { ListingDetail } from "../types/listing";
import { token1, token2 } from "../utils/tokens";
import { BiCrop as CropIcon } from "react-icons/bi";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const nftImageTypesAccepted = "image/jpeg,image/png,image/gif,image/svg,image/webp";

export default function Create() {
  const color = useColor();
  const fileUploadInputRef = useRef<HTMLInputElement | null>(null);
  const [isCropped, setIsCropped] = useState<boolean>(false);
  const [cropperInstance, setCropperInstance] = useState<Cropper>();
  const [tokenName, setTokenName] = useState<string>('Noname Sales');
  const [subtitle, setSubtitle] = useState<string>('');
  const [tokenTicker, setTokenTicker] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telegramContact, setTelegramContact] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [coingeckoUrl, setCoingeckoUrl] = useState<string>('');
  const [idoStartDate, setIdoStartDate] = useState<Date>();
  const [idoEndDate, setIdoEndDate] = useState<Date>();
  const [depositStartDate, setDepositStartDate] = useState<Date>();
  const [depositEndDate, setDepositEndDate] = useState<Date>();
  const [imageUpload, setImageUpload] = useState<File | null>(new File([], ""));
  const [imageUploadUri, setImageUploadUri] = useState<string>();
  const [imageUploadBlob, setImageUploadBlob] = useState<Blob | null>(new Blob());

  const listing1: ListingDetail = {
    fromToken: token1,
    toToken: token2,
    startTime: 1676419200000,
    endTime: 1677024000000,
    progress: 70
  }

  useEffect(() => {
    if (!tokenName) setTokenName('Noname Sales')
  }, [tokenName])

  return (
    <>
      <TitleCard title="Create Listing" />
      <Flex
        width='100%'
        marginY="4"
        padding='8'
        shadow="lg"
        border='1px solid'
        borderRadius="2xl"
        borderColor={color.border}
        flexDirection='column'
      >
        <Flex justifyContent='space-between'>
          <Flex flexDirection='column' width='65%'>
            <Flex marginBottom='2'>
              <Text as='h1' fontSize='20px' fontWeight='700' textAlign='start' color={color.required}>* All Fields Mandatory</Text>
            </Flex>
            <InputCard title="PROJECT / TOKEN NAME" placeholder='E.G. PROJECT ATLAS' required={true} setData={setTokenName} />
            <InputCard title="SUB TITLE" placeholder='E.G. 2% LAUNCH SALE' required={true} setData={setSubtitle} />
            <InputCard title="TOKEN TICKER" placeholder='$ TOKEN' required={true} setData={setTokenTicker} />
            <InputCard title="E-MAIL" placeholder='hello@johndoe.com' required={true} setData={setEmail} />
            <InputCard title="TELEGRAM CONTACT" placeholder='https://t.me/cryptonear' required={true} setData={setTelegramContact} />
            <SelectCard title="CHOOSE TOKEN TICKER TO RECEIVE" placeholder='PLEASE SELECT' required={true} setData={setToken} />
            <InputCard title="TOTAL DEPOSIT TOKEN AMOUNT(FOR LAUNCHPAD)" placeholder='0' required={true} setData={setTotalAmount} />
            <InputCard title="COINGECKO / COINMARKETCAP LINK" placeholder='https://www.coingecko.com/en/coins/bitcoin/' required={false} setData={setCoingeckoUrl} />
          </Flex>
          <Flex flexDirection='column' width='30%'>
            <Flex marginBottom='2' justifyContent='flex-end'>
              <Text as='h1' fontSize='20px' fontWeight='700' textAlign='end'>PROJECT PARTICULARS</Text>
            </Flex>
            <Flex>
              {
                (imageUpload?.name !== '' && !isCropped) ? (
                  <Flex flexDirection='column' width='100%'>
                    <Cropper
                      src={imageUploadUri}
                      aspectRatio={1}
                      guides
                      style={{ width: "100%" }}
                      crop={(e) => { setCropperInstance(e.currentTarget.cropper); }}
                      accept={nftImageTypesAccepted}
                      alt="Image cropper"
                    />
                    <Button
                      colorScheme="brand"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      marginLeft="auto"
                      marginTop="4"
                      rightIcon={<CropIcon size="20" />}
                      onClick={() => {
                        const croppedImgUrl = cropperInstance?.getCroppedCanvas().toDataURL();
                        setImageUploadUri(croppedImgUrl);

                        cropperInstance?.getCroppedCanvas().toBlob((croppedImgBlob) => { setImageUploadBlob(croppedImgBlob) });
                        setIsCropped(true);
                      }}>
                      Done
                    </Button>
                  </Flex>
                ) : (
                  <Flex flexDirection='column'>
                    {imageUploadUri !== "" &&
                      (<Image src={imageUploadUri} alt="cropped nft image" width="full" cursor="pointer" fallback={<Skeleton width="full" height="20rem" />} />)
                    }
                    <Input cursor="pointer" onClick={() => { fileUploadInputRef.current?.click() }} placeholder="Upload" value={imageUpload?.name || "No file selected"} readOnly variant={isCropped ? "filled" : "outline"} />
                    <input type="file" name="image" onChange={(e) => {
                      if (!e.target.files) return;
                      setImageUpload(e.target.files.item(0))

                      const reader = new FileReader();
                      reader.onload = () => {
                        if (!reader.result) return;

                        setImageUploadUri(reader.result.toString());
                        setIsCropped(false);
                      };
                      reader.readAsDataURL(e.target.files?.item(0) as Blob);
                      setImageUploadBlob(e.target.files?.item(0) as Blob)
                    }} accept={nftImageTypesAccepted} style={{ display: "none" }} ref={fileUploadInputRef} />
                  </Flex>
                )
              }
            </Flex>
            <DateCard title="IDO START DATE & TIME" placeholder='PLEASE SELECT' required={true} setData={setIdoStartDate} />
            <DateCard title="IDO END DATE & TIME" placeholder='PLEASE SELECT' required={true} setData={setIdoEndDate} />
            <DateCard title="DEPOSIT START DATE & TIME" placeholder='PLEASE SELECT' required={true} setData={setDepositStartDate} />
            <DateCard title="DEPOSIT END DATE & TIME" placeholder='PLEASE SELECT' required={true} setData={setDepositEndDate} />
          </Flex>
        </Flex>
      </Flex>
      <Flex justifyContent='center' marginTop='40px'>
        <CreationCard listing={listing1} tokenName={tokenName} />
      </Flex>
    </>
  )
}