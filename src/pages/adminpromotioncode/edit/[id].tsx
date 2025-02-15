import { AdminSidebar } from "@/components/admin/admin-sidebar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { IconBath } from "@/components/ui/IconBath";
import { IconPercent } from "@/components/ui/IconPercent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { TimeSelectorAdminPromotionCode } from "@/components/admin/admin-time-selector-promotioncode";
import { format } from "date-fns";
import { th } from "date-fns/locale"; // เพิ่มการ import locale ภาษาไทย

import { AdminPromotionEditNavbar } from "@/components/admin-promotion/edit/adminPromotionEditNavbar";
import { AdminSubmitPopUp } from "@/components/admin/admin-submit-popup";
import IconTrash from "@/components/ui/IconTrash";
import IconTrashRed from "@/components/ui/IconTrashRed";
import IconX from "@/components/ui/IconX";
import IconWarning from "@/components/ui/Iconwarning";

export default function AdminPromotionCodeAddIndex() {
  // input for sent name of code discount
  const [inputTitleCode, setInputTitleCode] = useState<string>("");
  //   console.log("input title code for check", inputTitleCode);

  // choose type of disscount between percent and fixed
  const [isYesSelected, setIsYesSelected] = useState<boolean | null>(null);
  const [inputPercentDiscount, setInputPercentDiscount] = useState<
    number | null
  >(null);
  //   console.log("inputPercentDiscount", inputPercentDiscount);

  // set number of time to use
  const [inputLimitCode, setInputLimitCode] = useState<number | null>();
  console.log("inputLimitCode", inputLimitCode);

  // select expiration date
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  //   console.log("selectedEndDate", selectedEndDate);

  // select expiration time
  const [selectedTime, setSelectedTime] = useState<string>(""); // กำหนดเป็น string แทน null
  //   console.log("selectedTime", selectedTime);

  // popup for create code successfuly
  const [showPopUpSubmit, setShowPopUpSubmit] = useState<boolean>(false);
  const [showPopupDelete, setShowPopupDelete] = useState<boolean>(false);

  // nameTopic for navbar
  const [nameTopic, setNameTopic] = useState<string>("loading");

  // fetch data for show create and last update date
  const [createdAtDatePromotion, setCreatedAtDatePromotion] =
    useState<string>("");
  const [updatedAtDatePromotion, setUpdatedAtDatePromotion] =
    useState<string>("");

  const router = useRouter();

  // before sent data to .post must change decimal of number
  let NumberTodecimal = null;
  if (
    inputPercentDiscount != null &&
    typeof inputPercentDiscount === "number"
  ) {
    NumberTodecimal = inputPercentDiscount / 100;
  }
  // console.log("numberTodecimal", NumberTodecimal);

  // function handle submit button for .post code
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!selectedEndDate) {
        console.log("selectedDate is missing");
        return; // หยุดการทำงานถ้า selectedDate ไม่มีค่า
      } else {
        console.log("selectedEndDate", selectedEndDate);
      }

      const newInputData = {
        promotion_code: inputTitleCode,
        discount_value: NumberTodecimal,
        usage_limit: inputLimitCode,
        end_at: selectedEndDate.toISOString(),
        promotion_id: Number(id),
      };
      console.log("check new input data for create", newInputData);
      await axios.put(`/api/admin/promotions/edit`, newInputData, {
        headers: { "Content-Type": "application/json" },
      });
      // router.push("/adminpromotioncode");
      setShowPopUpSubmit(true);
      console.log("newInputData2", newInputData);

      // setShowPopUpSubmit(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputCodeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitleCode(event.target.value);
  };

  const handleInputPercentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value === "") {
      setInputPercentDiscount(null); // ถ้าเป็นค่าว่างให้ใช้ null
    } else if (!isNaN(Number(value))) {
      setInputPercentDiscount(Number(value)); // ถ้าเป็นตัวเลขให้แปลงเป็น number
    }
  };

  const handleInputCodeLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setInputLimitCode(null); // ถ้าเป็นค่าว่างให้ใช้ null
    } else if (!isNaN(Number(value))) {
      setInputLimitCode(Number(value)); // ถ้าเป็นตัวเลขให้แปลงเป็น number
    }
  };

  // ฟังก์ชันจัดการการเปลี่ยนแปลงเวลา
  const handleTimeChange = (time: string) => {
    setSelectedTime(time);

    if (selectedEndDate) {
      // แยกชั่วโมงและนาทีจาก selectedTime
      const [hours, minutes] = time.split(":").map(Number);

      // สร้าง copy ของ selectedEndDate เพื่อไม่ให้แก้ไขค่าของ original
      const updatedDate = new Date(selectedEndDate);

      // ตั้งค่าชั่วโมงและนาที
      updatedDate.setHours(hours, minutes);
      // ตั้งค่าวันที่และเวลาใหม่
      setSelectedEndDate(updatedDate);
    }
  };

  const handleYesClick = () => {
    setIsYesSelected(true); // เมื่อเลือกปุ่ม "เอา"
  };

  const handleNoClick = () => {
    setIsYesSelected(false); // เมื่อเลือกปุ่ม "ไม่เอา"
  };

  const { id } = router.query;

  const FetchPromotionCode = async () => {
    try {
      const response = await axios.get(
        `/api/admin/promotions/selectedit/${id}`
      );
      console.log("test response fetching data", response.data.data);
      setNameTopic(response.data.data.promotion_code);
      setInputTitleCode(response.data.data.promotion_code);
      setIsYesSelected(false); // เมื่อเลือกปุ่ม "ไม่เอา"
      setInputPercentDiscount(response.data.data.discount_value * 100);
      setInputLimitCode(response.data.data.usage_limit);

      // Set the date and time
      const endDate = new Date(response.data.data.end_at);

      // ตั้งค่าเป็นวันที่แบบ LocalTime
      setSelectedEndDate(endDate);

      // ใช้ date-fns เพื่อแปลงเป็น HH:mm (24 ชั่วโมง)
      const formattedTime = format(endDate, "HH:mm"); // เช่น "15:30"
      setSelectedTime(formattedTime);

      // fetch date created and last updated
      setCreatedAtDatePromotion(response.data.data.created_at);
      setUpdatedAtDatePromotion(response.data.data.lastupdated_at);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/admin/promotions/delete/${id}`);
      console.log("Promotion deleted", response.data);
      // fetchUser();
      router.push("/adminpromotioncode");
    } catch (error) {
      console.error("Error deleting promotion:", error);
    }
  };

  useEffect(() => {
    if (id) {
      FetchPromotionCode();
    }
  }, [id]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          const target = e.target as HTMLElement; // Cast ให้เป็น HTMLElement
          if (e.key === "Enter" && target.tagName !== "TEXTAREA") {
            e.preventDefault(); // ป้องกันการกด Enter ยกเว้นใน <textarea>
          }
        }}>
        <div className="flex flex-row w-full">
          <div>
            <AdminSidebar />
          </div>
          <div className="w-full flex flex-col">
            {/* navbar for admin page */}
            <AdminPromotionEditNavbar nameTopic={nameTopic} />

            {/* AdminPromotionCodeAddPromotionCode */}

            {/* พื้นหลัง */}
            <div className=" min-h-screen w-full flex flex-col justify-start items-center py-12 min-w-[1200px]  bg-gray-100 gap-5">
              {/* กล่องใหญ่ */}
              <div className="flex flex-col w-[1120px] py-12 border bg-white border-gray-300 rounded-lg  justify-center px-7 relative ">
                <div className="w-full bg-white flex gap-10 flex-col">
                  {/* Promotion Code InputTitle */}
                  <div className="flex items-center justify-between w-[662px] text-gray-500 font-medium">
                    <label htmlFor="ชื่อบริการ">Promotion Code</label>
                    <input
                      type="text"
                      onChange={handleInputCodeTitle}
                      value={inputTitleCode}
                      className="border border-gray-300 h-11 rounded-lg w-[433px] pl-5 text-black font-normal"
                    />
                  </div>
                  {/* Promotion Code Selet Type */}
                  <div className="flex items-center justify-start w-[500px] text-gray-500 font-medium ">
                    <label htmlFor="ชื่อบริการ" className="min-w-[230px] ">
                      ประเภท
                    </label>
                    <div className="flex flex-col justify-between w-full gap-2">
                      {/* ปุ่ม "เอา" */}
                      <div className="hidden items-center justify-between relative">
                        <label
                          className="flex flex-row cursor-pointer"
                          onClick={handleYesClick}>
                          {/* button for fix */}
                          <button
                            onClick={handleYesClick}
                            className={`${
                              isYesSelected === true
                                ? "bg-blue-500"
                                : "border-gray-200"
                            } w-5 h-5 rounded-full flex items-center justify-center border border-blue-400`}>
                            <div
                              className={`${
                                isYesSelected === true
                                  ? "bg-white"
                                  : "bg-transparent"
                              } w-1 h-1 rounded-full`}
                            />
                          </button>
                          <h1
                            className={`text-sm pl-2 ${
                              isYesSelected === true
                                ? "text-black"
                                : "text-gray-400"
                            }`}>
                            Fixed
                          </h1>
                        </label>
                        {/* input for number bath */}
                        <input
                          type="text"
                          className={`${
                            isYesSelected === true ? "bg-white" : "bg-gray-300"
                          } w-[140px] h-[42px]  pl-5 pr-10 border border-gray-300 rounded-md `}
                          disabled={isYesSelected === false} // ถ้าไม่เลือกจะไม่สามารถพิมพ์ได้
                        />
                        <div className="absolute left-[245px]">
                          <IconBath />
                        </div>
                      </div>

                      {/* ปุ่ม "ไม่เอา" */}
                      <div className="flex items-center justify-between relative">
                        <label
                          className="flex flex-row cursor-pointer"
                          onClick={handleNoClick}>
                          <button
                            onClick={handleNoClick}
                            type="button"
                            className={`${
                              isYesSelected === false
                                ? "bg-blue-500"
                                : "border-gray-200"
                            } w-5 h-5 rounded-full flex items-center justify-center border border-blue-400`}>
                            <div
                              className={`${
                                isYesSelected === false
                                  ? "bg-white"
                                  : "bg-transparent"
                              } w-1 h-1 rounded-full`}
                            />
                          </button>
                          <h1
                            className={`text-sm pl-2 ${
                              isYesSelected === false
                                ? "text-black"
                                : "text-gray-400"
                            }`}>
                            Percent
                          </h1>
                        </label>
                        {/* input for number percent */}
                        <input
                          type="text"
                          className={`${
                            isYesSelected === false ? "bg-white" : "bg-gray-300"
                          } w-[140px] h-[42px] ml-4 pl-5 pr-10 border border-gray-300 rounded-md  appearance-none text-black font-normal`}
                          disabled={isYesSelected === null} // ถ้าเลือก "เอา" จะไม่สามารถพิมพ์ได้
                          onChange={handleInputPercentChange}
                          value={
                            inputPercentDiscount === null
                              ? ""
                              : inputPercentDiscount
                          }
                        />
                        <div className="absolute left-[245px]">
                          <IconPercent />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* limit of usesage */}
                  <div className="flex items-center justify-between w-[662px] text-gray-500 font-medium relative">
                    <label htmlFor="โควต้าการใช้">โควต้าการใช้</label>
                    <input
                      type="text"
                      onChange={handleInputCodeLimit}
                      value={inputLimitCode === null ? "" : inputLimitCode}
                      className="border border-gray-300 h-11 rounded-lg w-[433px] pl-5 text-black font-normal"
                    />
                    <h1 className="absolute right-[10px] text-gray-400">
                      ครั้ง
                    </h1>
                  </div>

                  {/* popup for select date */}
                  <div className="flex items-center justify-between w-[662px] text-gray-500 font-medium">
                    <label htmlFor="วันหมดอายุ" className="">
                      วันหมดอายุ
                    </label>
                    <div className="w-[433px] flex flex-row gap-6 ">
                      <div className="w-[205px]">
                        <Popover
                          open={isCalendarOpen}
                          onOpenChange={setIsCalendarOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between px-3 py-2 h-10 text-sm "
                              onClick={() => setIsCalendarOpen(true)}>
                              <span className="truncate mr-2">
                                {selectedEndDate
                                  ? format(selectedEndDate, "d MMMM yyyy", {
                                      locale: th,
                                    }) // แสดงวันที่ที่เลือก
                                  : ""}
                              </span>
                              <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="bg-white  rounded-lg shadow-lg border-gray-100 border">
                            <Calendar
                              mode="single"
                              selected={selectedEndDate || undefined}
                              initialFocus
                              onSelect={(day) => {
                                setSelectedEndDate(day ?? null); // กำหนดวันที่ที่เลือก
                                setIsCalendarOpen(false); // ปิด Popover หลังจากเลือกวันที่
                              }}
                              disabled={(date) => date < new Date()} // ปิดวันที่ในอดีต
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* popup for select time */}
                      <button
                        className="w-[205px] absolute right-[428px]"
                        type="button">
                        <TimeSelectorAdminPromotionCode
                          value={selectedTime} // ส่งค่าเวลา
                          onChange={handleTimeChange} // ส่งฟังก์ชันจัดการการเปลี่ยนแปลงเวลา
                          selectedDate={selectedEndDate} // ส่งค่าของวันที่เลือก
                        />
                      </button>
                    </div>
                  </div>
                  <div className="h-px w-full bg-gray-300 mb-10"></div>
                  <div className="flex flex-row gap-5 w-[400px]">
                    <div className="flex flex-col justify-between w-full gap-5 text-gray-500 font-medium">
                      <div>สร้างเมื่อ</div>
                      <div>แก้ไขล่าสุด</div>
                    </div>
                    <div className="flex flex-col justify-between w-full gap-5">
                      <div className="flex gap-2">
                        <div>
                          {new Date(createdAtDatePromotion).toLocaleDateString(
                            "th-TH",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          )}
                        </div>
                        {new Date(createdAtDatePromotion).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </div>
                      <div className="flex gap-2">
                        <div>
                          {new Date(updatedAtDatePromotion).toLocaleDateString(
                            "th-TH",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          )}
                        </div>
                        {new Date(updatedAtDatePromotion).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* button delete service */}
              <div className="w-[1120px] flex flex-row justify-end">
                <button
                  className="flex flex-row items-center gap-2 font-medium underline cursor-pointer text-gray-500 active:text-red-600 group"
                  type="button"
                  // onClick={() => setDeleteServiceButton(true)}
                  onClickCapture={() => {
                    // setPromotionToDelete(promotionCode);
                    setShowPopupDelete(true);
                  }}>
                  {/* IconTrash */}
                  <div className="group-active:hidden">
                    <IconTrash />
                  </div>
                  {/* IconTrashRed */}
                  <div className="hidden group-active:inline">
                    <IconTrashRed />
                  </div>
                  ลบบริการ
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Popup */}
      <AdminSubmitPopUp
        setShowPopUpSubmit={setShowPopUpSubmit}
        showPopUpSubmit={showPopUpSubmit}
        message="สร้างรายการสำเร็จ"
        subMessage="กรุณากดยืนยันเพื่อกลับสู่หน้าหลัก ?"
        confirmationText="ยืนยัน"
        redirectPath="/adminpromotioncode"
      />
      {showPopupDelete && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[360px] h-auto flex flex-col items-center rounded-xl p-4 gap-3">
            <div className="w-full">
              <button
                type="button"
                className="ml-auto flex justify-end items-end"
                onClick={() => {
                  setShowPopupDelete(false);
                  // setPromotionToDelete(null);
                }}>
                <IconX />
              </button>
              <div className="flex justify-center">
                <IconWarning />
              </div>
            </div>
            <h1 className="font-medium text-xl ">ยืนยันการลบรายการ ?</h1>
            <h1 className="text-center text-gray-500">
              คุณต้องการลบรายการ &apos;{nameTopic}&apos; <br />
              ใช่หรือไม่
            </h1>
            <div className="flex flex-row gap-3">
              <button
                className="bg-defaultColor text-white w-28 py-2 rounded-lg font-medium"
                onClick={() => {
                  handleDelete();
                  setShowPopupDelete(false);
                  // setPromotionToDelete(null);
                }}>
                ลบรายการ
              </button>
              <button
                className="bg-white text-defaultColor border-[1px] border-defaultColor w-28 py-2 rounded-lg font-medium"
                onClick={() => {
                  setShowPopupDelete(false);
                  // setPromotionToDelete(null);
                }}>
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ----------------------------------------------------------------------------------------------
