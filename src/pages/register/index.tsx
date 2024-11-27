import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Registration() {
  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleTermsClose = (): void => {
    setIsTermsOpen(false);
  };

  const handlePrivacyClose = (): void => {
    setIsPrivacyOpen(false);
  };

  const handleCheckboxChange = (): void => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="flex justify-center">
          <div className="mx-4 my-10 border border-gray-300 justify-center rounded-lg bg-white lg:w-[614px] lg:mx-auto">
            <form>
              <h2 className="text-[20px] text-center my-5">ลงทะเบียน</h2>
              <div className="flex flex-col mx-2 my-5 lg:w-3/4 lg:mx-auto">
                <label>ชื่อ - นามสกุล</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="กรุณากรอกชื่อ นามสกุล"
                  required
                  className="border border-gray-300 rounded-md h-10 pl-3"
                ></input>
              </div>
              <div className="flex flex-col mx-2 my-5 lg:w-3/4 lg:mx-auto">
                <label>เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="กรุณากรอกเบอร์โทรศัพท์"
                  required
                  className="border border-gray-300 rounded-md h-10 pl-3"
                ></input>
              </div>
              <div className="flex flex-col mx-2 my-5 lg:w-3/4 lg:mx-auto">
                <label>อีเมล</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="กรุณากรอกอีเมล"
                  required
                  className="border border-gray-300 rounded-md h-10 pl-3"
                ></input>
              </div>
              <div className="flex flex-col mx-2 my-5 lg:w-3/4 lg:mx-auto">
                <label>รหัสผ่าน</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="กรุณากรอกรหัสผ่าน"
                  required
                  className="border border-gray-300 rounded-md h-10 pl-3"
                ></input>
              </div>
              <div className="flex flex-row items-baseline mx-2 my-5 lg:w-3/4 lg:mx-auto">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  required
                  onChange={handleCheckboxChange}
                  checked={isChecked}
                  className={`w-5 h-5 translate-y-1 ${
                    isChecked ? "opacity-100" : "opacity-40"
                  }`}
                />
                <label
                  htmlFor="terms"
                  className="ml-4 text-[16px] text-gray-600 w-5/6"
                >
                  ยอมรับ{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-400 underline font-bold"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsTermsOpen(true);
                    }}
                  >
                    ข้อตกลงและเงื่อนไข
                  </a>{" "}
                  และ{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-400 underline font-bold"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsPrivacyOpen(true);
                    }}
                  >
                    นโยบายความเป็นส่วนตัว
                  </a>
                  .
                </label>
              </div>
              <div className="mx-3 lg:w-3/4 lg:mx-auto">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 focus:bg-blue-800"
                >
                  ลงทะเบียน
                </button>
              </div>

              <div className="my-5 relative w-full flex items-center justify-center lg:w-3/4 lg:mx-auto">
                <div className="absolute inset-x-0 top-1/2 border-t border-gray-300"></div>
                <span className="relative bg-white px-4 text-gray-500">
                  หรือลงชื่อเข้าใช้ผ่าน
                </span>
              </div>
              <div className="mx-3 lg:w-3/4 lg:mx-auto">
                <button
                  type="submit"
                  className="w-full flex gap-4 justify-center py-3 px-6 text-blue-600 border border-blue-600 font-semibold rounded-md hover:bg-blue-500 focus:bg-blue-800"
                >
                  <img src="/image/facebooklogo.svg"></img>
                  เข้าสู่ระบบด้วย Facebook
                </button>
              </div>
              <div className="my-5 text-center">
                <a className="text-blue-600 underline">กลับไปหน้าเข้าสู่ระบบ</a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Popup dialog for terms and agreement */}
      <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>ข้อตกลงและเงื่อนไข</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <h2 className="font-semibold text-xl">
              ข้อตกลงและเงื่อนไขการใช้งาน
            </h2>

            <p className="mt-4">
              ยินดีต้อนรับสู่เว็บไซต์ของเรา! ก่อนที่คุณจะใช้บริการเว็บไซต์นี้
              กรุณาอ่านข้อตกลงและเงื่อนไขนี้อย่างละเอียด
              ข้อตกลงนี้ควบคุมการใช้งานเว็บไซต์ และการบริการที่เกี่ยวข้องทั้งหมด
              หากคุณไม่เห็นด้วยกับข้อตกลงเหล่านี้
              กรุณาหลีกเลี่ยงการใช้เว็บไซต์ของเรา
            </p>

            <h3 className="mt-6 font-semibold">1. การใช้งานเว็บไซต์</h3>
            <p>
              เว็บไซต์นี้ให้บริการเพื่อให้ข้อมูล
              และเครื่องมือแก่ผู้ใช้ในการทำธุรกรรมต่าง ๆ ในบางกรณี
              คุณอาจต้องลงทะเบียนเพื่อใช้บริการบางอย่าง
              และคุณรับผิดชอบในการรักษาความปลอดภัยของบัญชีผู้ใช้ของคุณ
              รวมถึงรหัสผ่านที่ใช้ในการเข้าสู่ระบบ
            </p>

            <h3 className="mt-6 font-semibold">2. ข้อจำกัดความรับผิดชอบ</h3>
            <p>
              เว็บไซต์ของเราไม่สามารถรับประกันได้ว่าเว็บไซต์จะทำงานได้ตลอดเวลา
              หรือปราศจากข้อผิดพลาด
              เราไม่รับผิดชอบต่อความเสียหายหรือความสูญเสียใด ๆ
              ที่เกิดจากการใช้บริการเว็บไซต์นี้
            </p>

            <h3 className="mt-6 font-semibold">
              3. ข้อมูลส่วนบุคคลและความเป็นส่วนตัว
            </h3>
            <p>
              เราเคารพในความเป็นส่วนตัวของผู้ใช้งาน
              และจะจัดการกับข้อมูลส่วนบุคคลของคุณตามนโยบายความเป็นส่วนตัว
              โปรดตรวจสอบนโยบายความเป็นส่วนตัวของเราเพื่อเรียนรู้เกี่ยวกับวิธีการที่เรารวบรวม
              ใช้ และเก็บรักษาข้อมูลของคุณ
            </p>

            <h3 className="mt-6 font-semibold">
              4. ลิขสิทธิ์และทรัพย์สินทางปัญญา
            </h3>
            <p>
              เนื้อหาทั้งหมดบนเว็บไซต์ รวมถึงข้อความ รูปภาพ โลโก้ และกราฟิก
              เป็นทรัพย์สินทางปัญญาของเรา และได้รับการคุ้มครองโดยกฎหมายลิขสิทธิ์
              คุณไม่สามารถใช้เนื้อหาดังกล่าวเพื่อการค้า หรือกระทำการใด ๆ
              ที่ละเมิดลิขสิทธิ์โดยไม่ได้รับอนุญาต
            </p>

            <h3 className="mt-6 font-semibold">5. การเปลี่ยนแปลงข้อตกลง</h3>
            <p>
              เราขอสงวนสิทธิ์ในการเปลี่ยนแปลงหรือปรับปรุงข้อตกลงนี้ได้ทุกเวลา
              โดยจะมีการประกาศการเปลี่ยนแปลงในหน้านี้
              ข้อตกลงที่แก้ไขแล้วจะมีผลบังคับใช้ทันทีที่เราโพสต์บนเว็บไซต์
            </p>

            <h3 className="mt-6 font-semibold">6. กฎหมายที่ใช้บังคับ</h3>
            <p>
              ข้อตกลงและเงื่อนไขนี้จะอยู่ภายใต้กฎหมายของประเทศไทย
              และคุณยินยอมให้ศาลที่มีเขตอำนาจในประเทศไทยเป็นศาลที่มีอำนาจในการพิจารณาคดีเกี่ยวกับข้อพิพาทที่เกิดขึ้นจากการใช้งานเว็บไซต์นี้
            </p>

            <h3 className="mt-6 font-semibold">7. การติดต่อ</h3>
            <p>
              หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับข้อตกลงนี้ กรุณาติดต่อเราได้ที่:
            </p>
            <p>Email: support@techup.com</p>
            <p>Phone: (+66)12-345-6789</p>
          </DialogDescription>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="py-2 px-4 bg-gray-200 rounded-md"
              onClick={handleTermsClose}
            >
              ปิด
            </button>
            <button
              className="py-2 px-4 bg-blue-600 text-white rounded-md"
              onClick={handleTermsClose}
            >
              ยอมรับ
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Popup dialog for privacy policy */}
      <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>ข้อตกลงและเงื่อนไข</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <h2 className="font-semibold text-xl">
              ข้อตกลงและเงื่อนไขการใช้งาน
            </h2>

            <p className="mt-4">
              ยินดีต้อนรับสู่เว็บไซต์ของเรา! ก่อนที่คุณจะใช้บริการเว็บไซต์นี้
              กรุณาอ่านข้อตกลงและเงื่อนไขนี้อย่างละเอียด
              ข้อตกลงนี้ควบคุมการใช้งานเว็บไซต์ และการบริการที่เกี่ยวข้องทั้งหมด
              หากคุณไม่เห็นด้วยกับข้อตกลงเหล่านี้
              กรุณาหลีกเลี่ยงการใช้เว็บไซต์ของเรา
            </p>

            <h3 className="mt-6 font-semibold">1. การใช้งานเว็บไซต์</h3>
            <p>
              เว็บไซต์นี้ให้บริการเพื่อให้ข้อมูล
              และเครื่องมือแก่ผู้ใช้ในการทำธุรกรรมต่าง ๆ ในบางกรณี
              คุณอาจต้องลงทะเบียนเพื่อใช้บริการบางอย่าง
              และคุณรับผิดชอบในการรักษาความปลอดภัยของบัญชีผู้ใช้ของคุณ
              รวมถึงรหัสผ่านที่ใช้ในการเข้าสู่ระบบ
            </p>

            <h3 className="mt-6 font-semibold">2. ข้อจำกัดความรับผิดชอบ</h3>
            <p>
              เว็บไซต์ของเราไม่สามารถรับประกันได้ว่าเว็บไซต์จะทำงานได้ตลอดเวลา
              หรือปราศจากข้อผิดพลาด
              เราไม่รับผิดชอบต่อความเสียหายหรือความสูญเสียใด ๆ
              ที่เกิดจากการใช้บริการเว็บไซต์นี้
            </p>

            <h3 className="mt-6 font-semibold">
              3. ข้อมูลส่วนบุคคลและความเป็นส่วนตัว
            </h3>
            <p>
              เราเคารพในความเป็นส่วนตัวของผู้ใช้งาน
              และจะจัดการกับข้อมูลส่วนบุคคลของคุณตามนโยบายความเป็นส่วนตัว
              โปรดตรวจสอบนโยบายความเป็นส่วนตัวของเราเพื่อเรียนรู้เกี่ยวกับวิธีการที่เรารวบรวม
              ใช้ และเก็บรักษาข้อมูลของคุณ
            </p>

            <h3 className="mt-6 font-semibold">
              4. ลิขสิทธิ์และทรัพย์สินทางปัญญา
            </h3>
            <p>
              เนื้อหาทั้งหมดบนเว็บไซต์ รวมถึงข้อความ รูปภาพ โลโก้ และกราฟิก
              เป็นทรัพย์สินทางปัญญาของเรา และได้รับการคุ้มครองโดยกฎหมายลิขสิทธิ์
              คุณไม่สามารถใช้เนื้อหาดังกล่าวเพื่อการค้า หรือกระทำการใด ๆ
              ที่ละเมิดลิขสิทธิ์โดยไม่ได้รับอนุญาต
            </p>

            <h3 className="mt-6 font-semibold">5. การเปลี่ยนแปลงข้อตกลง</h3>
            <p>
              เราขอสงวนสิทธิ์ในการเปลี่ยนแปลงหรือปรับปรุงข้อตกลงนี้ได้ทุกเวลา
              โดยจะมีการประกาศการเปลี่ยนแปลงในหน้านี้
              ข้อตกลงที่แก้ไขแล้วจะมีผลบังคับใช้ทันทีที่เราโพสต์บนเว็บไซต์
            </p>

            <h3 className="mt-6 font-semibold">6. กฎหมายที่ใช้บังคับ</h3>
            <p>
              ข้อตกลงและเงื่อนไขนี้จะอยู่ภายใต้กฎหมายของประเทศไทย
              และคุณยินยอมให้ศาลที่มีเขตอำนาจในประเทศไทยเป็นศาลที่มีอำนาจในการพิจารณาคดีเกี่ยวกับข้อพิพาทที่เกิดขึ้นจากการใช้งานเว็บไซต์นี้
            </p>

            <h3 className="mt-6 font-semibold">7. การติดต่อ</h3>
            <p>
              หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับข้อตกลงนี้ กรุณาติดต่อเราได้ที่:
            </p>
            <p>Email: support@techup.com</p>
            <p>Phone: (+66)12-345-6789</p>
          </DialogDescription>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="py-2 px-4 bg-gray-200 rounded-md"
              onClick={handlePrivacyClose}
            >
              ปิด
            </button>
            <button
              className="py-2 px-4 bg-blue-600 text-white rounded-md"
              onClick={handlePrivacyClose}
            >
              ยอมรับ
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Registration;
