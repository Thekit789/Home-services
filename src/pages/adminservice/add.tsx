// import libary
import React, { useState } from "react";
import axios from "axios";
// import component
import { AdminSidebar } from "@/components/admin/adminsidebar";
import { AdminserviceAddIndex } from "@/components/adminservice/add/adminserviceAddIndex";
import { AdminServiceAddNavbar } from "@/components/adminservice/add/adminserviceAddNavbar";
import { AdminSubmitPopUp } from "@/components/admin/adminSubmitPopUp";

// create interface for subservice
interface SubService {
  description: string;
  unit: string;
  pricePerUnit: number;
}

export default function AdminNavbar() {
  // array of object form subservice
  const [inputSubservice, setInputSubservice] = useState<SubService[]>([]);
  // name service
  const [inputTitle, setInputTitle] = useState<string>("");
  // select category
  const [inputCat, setInputCat] = useState<number>();
  // input to show image
  const [inputImage, setInputImage] = useState<File | null>(null);

  // popup alert
  const [showPopUpSubmit, setShowPopUpSubmit] = React.useState(false);
  const [showPopUpDeleteImg, setShowPopUpDeleteImg] = useState<Boolean>(false);
  // console.log("inputImage", inputImage);

  // เพิ่ม state สำหรับเก็บข้อความแจ้งเตือน
const [titleEmpty, setTitleEmpty] = useState<boolean>(false);
const [categoryEmpty, setCategoryEmpty] = useState<boolean>(false);
const [subserviceEmpty, setSubserviceEmpty] = useState<boolean>(false);
const [imageEmpty, setImageEmpty] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // ตั้งค่า isValid เป็น true ก่อนการตรวจสอบ
    let isValid = true;

    // ตรวจสอบ title
    if (!inputTitle) {
      setTitleEmpty(true);
      isValid = false;
    }

    // ตรวจสอบ category
    if (!inputCat) {
      setCategoryEmpty(true);
      isValid = false;
    }

    // ตรวจสอบ subservices
    if (inputSubservice.length === 0) {
      setSubserviceEmpty(true);
      isValid = false;
    }

    // ตรวจสอบ image
    if (!inputImage) {
      setImageEmpty(true);
      isValid = false;
    }

    // ถ้าข้อมูลไม่ครบถ้วน จะไม่ทำการส่งข้อมูล
    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append("title", inputTitle);
    formData.append("category_id", inputCat?.toString() || "");
    if (inputImage) {
      formData.append("image", inputImage);
    }
    formData.append("subservices", JSON.stringify(inputSubservice));

    // การแสดงข้อมูลข้างใน formdata ได้นั้นต้องใช้วิธีการ loop
    console.log("FormData contents:");
    let formDataObject: { [key: string]: any } = []; // สร้าง object เปล่าเพื่อเก็บข้อมูล

    for (let [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    // แสดงข้อมูลทั้งหมดในรูปแบบ object
    console.log(formDataObject);

    try {
      await axios.post(`/api/admin/management/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("fromdata2", formData);
      setShowPopUpSubmit(true);

      // console.log("newInputData", newInputData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          // Cast ให้เป็น HTMLElement
          const target = e.target as HTMLElement;
          if (e.key === "Enter" && target.tagName !== "TEXTAREA") {
            // ป้องกันการกด Enter ยกเว้นใน <textarea>
            e.preventDefault();
          }
        }}
      >
        <div className="flex flex-row w-full">
          <div>
            {/* sidebar for show navigate */}
            <AdminSidebar />
          </div>
          <div className="flex flex-col w-full">
            {/* navbar for admin page */}
            <AdminServiceAddNavbar />
            {/* adminservice index */}
            <AdminserviceAddIndex
              setInputSubservice={setInputSubservice}
              inputtitle={setInputTitle}
              setInputCat={setInputCat}
              SetInputimage={setInputImage}
              setShowPopUpDeleteImg={setShowPopUpDeleteImg}
              showPopUpDeleteImg={showPopUpDeleteImg}

              // แสดงข้อความแจ้งเตือน
              titleEmpty={titleEmpty}
              categoryEmpty={categoryEmpty}
              subserviceEmpty={subserviceEmpty}
              imageEmpty={imageEmpty}
              setTitleEmpty={setTitleEmpty}
              setCategoryEmpty={setCategoryEmpty}
              setSubserviceEmpty={setSubserviceEmpty}
            />
          </div>
        </div>
      </form>
      {/* Show popup when the submit button is clicked */}
      <AdminSubmitPopUp
        setShowPopUpSubmit={setShowPopUpSubmit}
        showPopUpSubmit={showPopUpSubmit}
        message="สร้างรายการสำเร็จ"
        subMessage="กรุณากดยืนยันเพื่อกลับสู่หน้าหลัก ?"
        confirmationText="ยืนยัน"
        redirectPath="/adminservice"
      />
    </>
  );
}
