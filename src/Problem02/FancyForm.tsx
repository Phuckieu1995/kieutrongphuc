import { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";

const FancyForm: React.FC = () => {
  const exchangeRate = 0.36;
  const [usdtBalance, setUsdtBalance] = useState<number>(1000000);
  const [cakeBalance, setCakeBalance] = useState<number>(0);
  const [usdtVale, setUsdtVale] = useState<number>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isSwraping, setIsSwraping] = useState<boolean>(false);
  const [isSucess, setIsSucess] = useState<boolean>(false);

  const cakeVale = useMemo(() => {
    return usdtVale ? usdtVale * exchangeRate : 0;
  }, [usdtVale]);

  const handleChangeUSDT = (e: any) => {
    const inputVale = e?.target?.value as number;
    setUsdtVale(inputVale);
  };

  const handleConfirmSwap = async () => {
    if (usdtVale && usdtVale > 0) {
      if (usdtVale > usdtBalance) {
        setErrorMsg("Value must be less than USDT balance");
      } else {
        setErrorMsg("");
        setIsSwraping(true);
        await new Promise(() => {
          setTimeout(() => {
            setCakeBalance(cakeBalance + cakeVale);
            setUsdtBalance(usdtBalance - usdtVale);
            setUsdtVale(0);
            setIsSucess(true);
            setIsSwraping(false);
          }, 3000);
        });
      }
    } else {
      setErrorMsg("Value must be great than 0");
    }
  };

  useEffect(() => {
    if (isSucess) {
      setTimeout(() => {
        setIsSucess(false);
      }, 3000);
    }
  }, [isSucess]);

  return (
    <Container>
      <BigTitle>1 USDT = {exchangeRate} CAKE</BigTitle>
      <Form>
        <Title>Swap</Title>
        <FormContent>
          <BalanceTitle>Balance: {usdtBalance}</BalanceTitle>
          <InputWrapBottom>
            <InputWrapTop>
              <TokenTitleWrap>
                <TokenTitle>From </TokenTitle>
                <IconToken
                  src="https://cryptologos.cc/logos/tether-usdt-logo.svg?v=026"
                  alt="USDT Logo"
                  width={32}
                />
                <TokenTitle> USDT </TokenTitle>
              </TokenTitleWrap>
              <CustomInput
                value={usdtVale}
                onFocus={() => setErrorMsg("")}
                onChange={handleChangeUSDT}
                disabled={isSwraping}
                placeholder="0"
                type="number"
              ></CustomInput>
              <CustomButton
                onClick={() => setUsdtVale(usdtBalance)}
                disabled={isSwraping}
              >
                Max
              </CustomButton>
            </InputWrapTop>
          </InputWrapBottom>
          <span style={{ color: "red" }}>{errorMsg}</span>
          <ArrowWrap>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polyline points="16 17 21 12 16 7"></polyline>
              <polyline points="8 7 3 12 8 17"></polyline>
            </svg>
          </ArrowWrap>
          <BalanceTitle>Balance: {cakeBalance}</BalanceTitle>
          <InputWrapBottom>
            <InputWrapTop>
              <TokenTitleWrap>
                <TokenTitle>To </TokenTitle>
                <IconToken
                  src="https://cryptologos.cc/logos/pancakeswap-cake-logo.svg?v=026"
                  alt="CAKE Logo"
                  width={32}
                />
                <TokenTitle> CAKE </TokenTitle>
              </TokenTitleWrap>
              <CustomInput
                value={cakeVale}
                placeholder="0"
                type="number"
                disabled
              />
            </InputWrapTop>
          </InputWrapBottom>
        </FormContent>
        {isSucess && (
          <Title style={{ color: "#0bf63e", margin: "0 auto", marginTop: 8 }}>
            Sucess !!!
          </Title>
        )}
        <SwapButton
          onClick={handleConfirmSwap}
          disabled={isSwraping}
          style={{ fontSize: 24, margin: "0 auto", marginTop: 8 }}
        >
          {isSwraping ? "Swaping..." : "Confirm Swap"}
          {isSwraping && <Spiner />}
        </SwapButton>
      </Form>
    </Container>
  );
};

export default FancyForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 85vh;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
`;

const Form = styled.div`
  padding: 32px 24px;
  background: #1a2644;
  width: 40%;
  margin: 0 auto;
  min-height: 100px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const BigTitle = styled.h3`
  width: fit-content;
  margin: 0;
  font-size: 40px;
  background: linear-gradient(90deg, #a93eff, #5e40de, #00b3ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Title = styled.h3`
  width: fit-content;
  margin: 0;
  margin-left: 2.5px;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-between;
  flex-grow: 1;
`;

const InputWrapBottom = styled.div`
  background: transparent;
  border-radius: 10px;
  height: 56px;
  padding: 2.5px;
  transition: all 0.1s ease-in-out;
  &:hover {
    background: linear-gradient(90deg, #a93eff, #5e40de, #00b3ff);
  }
`;

const InputWrapTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  align-items: center;
  background: #0e0e2a;
  height: 100%;
  border-radius: 8px;
  border: none;
  padding: 8px 16px;

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ArrowWrap = styled.div`
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  > svg {
    transform: rotate(90deg);
    margin-bottom: -10px;
  }
`;

const TokenTitle = styled.span`
  font-size: 16px;
`;

const TokenTitleWrap = styled.div`
  min-width: 125px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BalanceTitle = styled.span`
  color: #949494;
  font-size: 14px;
  text-align: left;
  margin-left: 2.5px;
`;

const CustomButton = styled.button`
  border: none;
  outline: none;
  color: #fff;
  border-radius: 16px;
  padding: 8px 16px;
  width: fit-content;
  background: linear-gradient(90deg, #a93eff, #5e40de, #00b3ff);
  transition: all 0.2s ease-in-out;
  &:focus,
  &:active {
    border: none;
    outline: none;
  }

  &:active {
    transform: scale(0.9);
  }
`;

const SwapButton = styled(CustomButton)`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spiner = styled.div`
  border: 3px solid #fff;
  border-radius: 50%;
  border-left: none;
  border-top: none;
  background: transparent;
  width: 20px;
  height: 20px;
  animation: ${rotate} 2s linear infinite;
`;

const CustomInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
  border-radius: 8px;
  padding: 4px 8px;
  flex-grow: 1;
  font-size: 15px;
`;

const IconToken = styled.img`
  width: 16px;
`;
