import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";

interface PromoCodes {
  [key: string]: number;
}

interface PaymentFormProps {
  setDiscount: (discount: number) => void;
}

const promoCodes: PromoCodes = {
  DISCOUNT10: 0.1,
  DISCOUNT20: 0.2,
  FURRY: 0.99,
};

const PaymentForm: React.FC<PaymentFormProps> = ({ setDiscount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [promoCode, setPromoCode] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("creditcard");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name,
      },
    });

    if (error) {
      setError(error.message || "An error occurred");
      setLoading(false);
    } else {
      // Handle successful payment method creation
      console.log(paymentMethod);
      console.log("Promotion Code:", promoCode);
      setLoading(false);
    }
  };

  const applyPromoCode = (): void => {
    if (promoCodes[promoCode]) {
      const appliedDiscount: number = promoCodes[promoCode];
      setDiscount(appliedDiscount);
      alert(
        `Promotion code applied! You get ${appliedDiscount * 100}% discount!`
      );
    } else {
      alert("Invalid promotion code.");
      setDiscount(0);
    }
  };

  const elementStyle = {
    base: {
      fontSize: "16px",
      fontWeight: "normal",
      color: "#424770",
      fontFamily: "'Poppins', sans-serif",
      lineHeight: "28px",
      padding: "0 12px",
      "::placeholder": {
        color: "#6B7280",
        fontSize: "16px",
        fontWeight: "normal",
        fontFamily: "'Poppins', sans-serif",
      },
    },
    invalid: {
      color: "#9e2146", // Invalid input color
    },
  };

  const customCardNumberOptions = {
    style: elementStyle,
    placeholder: "XXXX XXXX XXXX XXXX",
  };

  const customCvcOptions = {
    style: elementStyle,
    placeholder: "XXX",
  };

  return (
    <div className="border mx-4 mb-10 rounded-lg bg-white lg:w-[735px]">
      <div className="mx-3 mt-2 text-[18px] text-gray-700 font-medium lg:mx-6 lg:text-[20px] lg:py-6 lg:hidden">
        กรอกข้อมูลบริการ
      </div>
      <div className="mx-3 mt-2 text-[18px] text-gray-700 font-medium lg:mx-6 lg:text-[20px] lg:py-6 hidden lg:block">
        ชำระเงิน
      </div>
      <div className="mx-3 mb-2 h-[95px] flex justify-between lg:justify-center lg:gap-6 lg:mb-6">
        {/* Promptpay Option */}
        <div
          className={`w-[147px] h-[95px] lg:w-[331px] lg:h-[86px] border rounded-sm flex flex-col justify-center items-center cursor-pointer ${
            selectedPayment === "qrcode" ? "bg-blue-100 border-blue-600" : ""
          }`}
          onClick={() => setSelectedPayment("qrcode")}
        >
          {selectedPayment === "qrcode" ? (
            <>
              <img
                src="/image/qrclicked.svg"
                className="w-[35px] h-[35px]"
              ></img>
              <p className="text-[16px] text-blue-600 font-semibold">
                พร้อมเพย์
              </p>
            </>
          ) : (
            <>
              <img src="/image/qricon.svg" className="w-[35px] h-[35px]"></img>
              <p className="text-[16px] text-gray-800 font-semibold">
                พร้อมเพย์
              </p>
            </>
          )}
        </div>
        {/* Credit Card Option */}
        <div
          className={`w-[147px] h-[95px] lg:w-[331px] lg:h-[86px] border rounded-sm flex flex-col justify-center items-center cursor-pointer ${
            selectedPayment === "creditcard"
              ? "bg-blue-100 border-blue-600"
              : ""
          }`}
          onClick={() => setSelectedPayment("creditcard")}
        >
          {selectedPayment === "creditcard" ? (
            <>
              <img
                src="/image/creditcardclicked.svg"
                className="w-[35px] h-[35px]"
              ></img>
              <p className="text-[16px] text-blue-600 font-semibold">
                บัตรเครดิต
              </p>
            </>
          ) : (
            <>
              <img
                src="/image/creditcard.svg"
                className="w-[35px] h-[35px]"
              ></img>
              <p className="text-[16px] text-gray-800 font-semibold">
                บัตรเครดิต
              </p>
            </>
          )}
        </div>
      </div>
      {/* Payment Form */}
      {selectedPayment === "creditcard" ? (
        <>
          <form onSubmit={handleSubmit} className="bg-white">
            <div className="mx-3 my-2 lg:mx-6 lg:my-6">
              <label className="block">
                หมายเลขบัตรเครดิต<span className="text-[#C82438]">*</span>
              </label>
              <CardNumberElement
                options={customCardNumberOptions}
                className="block w-full h-[44px] border border-gray-300 rounded-md py-2 px-2"
              />
            </div>
            <div className="mx-3 lg:mx-6 lg:my-6">
              <label className="block mb-2">
                ชื่อบนบัตร<span className="text-[#C82438]">*</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full h-[44px] border border-gray-300 rounded-md py-1 placeholder:text-gray-500 placeholder:text-[16px] placeholder:font-normal placeholder:px-2"
                  placeholder="กรุณากรอกชื่อบนบัตร"
                ></input>
              </label>
            </div>
            <div>
              {/* div for expiry and cvc */}
              <div className="lg:flex lg:w-[686px] lg:ml-6 lg:justify-between lg:my-6">
                <div className="mx-3 mb-4 lg:mx-0">
                  <label className="block">
                    วันหมดอายุ<span className="text-[#C82438]">*</span>
                  </label>
                  <CardExpiryElement
                    options={{ style: elementStyle }}
                    className="block w-full lg:w-[331px] h-[44px] border border-gray-300 rounded-md py-2 px-2"
                  />
                </div>
                <div className="mx-3 mb-4 lg:mx-0">
                  <label className="block">
                    รหัส CVC / CVV<span className="text-[#C82438]">*</span>
                  </label>
                  <CardCvcElement
                    options={customCvcOptions}
                    className="block w-full lg:w-[331px] h-[44px] border border-gray-300 rounded-md py-2 px-2"
                  />
                </div>
              </div>

              {/* divider line */}
              <div className="border-t border-gray-300 my-6 mb-8 mx-3 lg:mx-6"></div>
              <div className="mx-3 mb-6 lg:mx-6 lg:my-6 lg:pb-6">
                <label>Promotion Code</label>{" "}
                <div className="flex items-center gap-5">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="block min-w-[205px] h-[64px] text-[16px] border border-gray-300 rounded-md py-3 px-2 placeholder:text-[16px] lg:h-[44px]"
                    placeholder="กรุณากรอกโค้ดส่วนลด(ถ้ามี)"
                  ></input>
                  <button
                    type="button"
                    onClick={applyPromoCode}
                    className="min-w-[90px] h-[44px] bg-blue-600 rounded-md text-white font-medium text-[16px]"
                  >
                    ใช้โค้ด
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="mx-3 mb-6">
            <label>Promotion Code</label>{" "}
            <div className="flex items-center gap-4 mb-4">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="block min-w-[205px] h-[64px] lg:h-[44px] text-[16px] border border-gray-300 rounded-md py-3 px-2 placeholder:text-[16px]"
                placeholder="กรุณากรอกโค้ดส่วนลด(ถ้ามี)"
              ></input>
              <button
                type="button"
                onClick={applyPromoCode}
                className="min-w-[90px] h-[44px] bg-blue-600 rounded-md text-white font-medium text-[16px]"
              >
                ใช้โค้ด
              </button>
            </div>
            <img src="/image/mockqrcode.jpg" className="w-full h-full"></img>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentForm;
