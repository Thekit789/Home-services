import { useRouter } from "next/router";
import { useServices } from "./ServicesContext";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const categoryBgClassMap: Record<string, string> = {
  บริการทั่วไป: "text-blue-800 bg-blue-100",
  บริการห้องครัว: "text-purple-900 bg-purple-100",
  บริการห้องน้ำ: "text-green-900 bg-green-100",
};

const ServicesListRendering: React.FC = () => {
  const { servicesData, getServicesData, isLoading } = useServices(); // Get isLoading from context
  const [serviceID, setServiceID] = useState<number>(0);
  const router = useRouter();
  const limitRender = 9;

  const dataRender = servicesData.slice(0, limitRender);

  const selectCategory = (value: string) => {
    getServicesData(value);
  };

  const redirectToServiceDetail = useCallback((): void => {
    router.push(`/${serviceID}`);
  }, [router, serviceID]);

  useEffect(() => {
    if (serviceID) {
      redirectToServiceDetail();
    }
  }, [serviceID, redirectToServiceDetail]);

  return (
    <div className="flex flex-col items-center ">
      {isLoading ? (
        // Loading indicator
        <div className="flex justify-center items-center text-center py-8 lg:py-12 px-4">
          <span className="flex flex-col items-center gap-6">
            <div>
              <div className="w-16 h-16 border-8 border-dotted rounded-full animate-spin border-blue-500 mx-auto "></div>
              <h2 className="text-gray-700 mt-4 font-semibold text-xl">
                L o a d i n g ...
              </h2>
            </div>
          </span>
        </div>
      ) : dataRender.length > 0 ? (
        // Service List
        <section className="min-w-[375px] w-full h-auto pb-14 lg:pt-8 bg-gray-100 lg:max-w-[1440px] mx-auto flex justify-center">
          <div className="w-full grid grid-cols-1 gap-6 justify-self-center mt-6 sm:grid-cols-2 lg:max-w-[1121px] lg:grid-cols-3 lg:justify-self-center lg:gap-12">
            {dataRender.map((service, index) => {
              const colorCategoryClass =
                categoryBgClassMap[service.category] || " ";
              return (
                <article
                  key={index}
                  className="w-[349px] h-[365px] flex flex-col items-center mx-auto bg-white border border-gray-300 rounded-lg overflow-hidden"
                >
                  {/* ... (service card code) */}
                  <Image
                    src={service.service_picture_url}
                    alt={service.service_name}
                    width={349}
                    height={365}
                    className="w-full h-[200px] cursor-pointer transition hover:scale-105 duration-700"
                    onClick={() => {
                      setServiceID(service.service_id);
                    }}
                  />

                  <div className="flex flex-col items-start justify-between p-4 gap-2 w-full h-[165px]">
                    <p
                      className={`w-fit h-fit px-3 py-1 flex items-center justify-center rounded-lg text-xs font-normal cursor-pointer text-blue-800 ${colorCategoryClass}`}
                      onClick={() => {
                        selectCategory(service.category);
                      }}
                    >
                      {service.category}
                    </p>
                    <h1
                      className="text-lg font-medium text-gray-950 lg:text-xl cursor-pointer hover:shadow-md transition duration-500"
                      onClick={() => {
                        setServiceID(service.service_id);
                      }}
                    >
                      {service.service_name}
                    </h1>
                    <h2 className="flex gap-2 text-sm font-normal text-gray-700">
                      <Image
                        src="/image/pricetag.svg"
                        alt="pricetaglogo"
                        width={16}
                        height={16}
                      />
                      {service.service_pricing}
                    </h2>
                    <button
                      className="text-base font-semibold underline underline-offset-1 text-blue-600 hover:scale-105 "
                      onClick={() => {
                        setServiceID(service.service_id);
                      }}
                    >
                      เลือกบริการ
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : (
        //No data
        <div className="flex justify-center items-center text-center py-4 lg:py-12 px-4">
          <span className="flex flex-col items-center gap-6">
            <div className="flex flex-col lg:flex-row items-center justify-items-center gap-1 h-auto">
              <Image
                src="/image/Warning.gif"
                alt="homeservicelogo"
                width={60}
                height={60}
                className=""
              />
              <h2 className="text-gray-700 font-semibold text-xl">
                Sorry, we couldn&apos;t find any services matching your search.
              </h2>
            </div>
          </span>
        </div>
      )}
      {/* ... (rest of your component code) */}
      <section className="w-full h-[458px] sm:h-auto flex justify-center relative px-6 py-12 overflow-hidden bg-blue-600 lg:items-center lg:h-[284px]">
        <h1 className="min-w-[327px] w-full h-[243px] sm:px-10 text-lg font-medium text-center text-[#FFFFFF] lg:justify-center lg:px-0 lg:flex lg:max-w-[810px] lg:max-h-[120px] ">
          <p className="lg:hidden">
            เพราะเราคือช่าง ผู้ให้บริการเรื่องบ้านอันดับ
            <br className="sm:hidden"></br> 1 แบบครบวงจร
            <br></br>
            โดยทีมช่างมืออาชีพมากกว่า 100 ทีม<br className="sm:hidden"></br>
            สามารถตอบโจทย์ด้านการบริการเรื่องบ้าน<br className="sm:hidden"></br>
            ของคุณ และสร้าง
            <br className="sm:hidden"></br>
            ความสะดวกสบายในการติดต่อกับทีมช่าง<br className="sm:hidden"></br>
            ได้ทุกที่ ทุกเวลา ตลอด 24 ชม.<br className="sm:hidden"></br>
            มั่นใจ ช่างไม่ทิ้งงาน<br className="sm:hidden"></br>
            พร้อมรับประกันคุณภาพงาน
          </p>
          <p className="hidden lg:block lg:pt-0 lg:text-xl">
            เพราะเราคือช่าง ผู้ให้บริการเรื่องบ้านอันดับ 1 แบบครบวงจร
            โดยทีมช่างมืออาชีพมากกว่า 100 ทีม <br></br>
            สามารถตอบโจทย์ด้านการบริการเรื่องบ้านของคุณ และสร้าง<br></br>
            ความสะดวกสบายในการติดต่อกับทีมช่าง ได้ทุกที่ ทุกเวลา ตลอด 24 ชม.
            <br></br>
            มั่นใจ ช่างไม่ทิ้งงาน พร้อมรับประกันคุณภาพงาน
          </p>
        </h1>
        <Image
          src="/image/homeservicelogo.png"
          alt="homeservicelogo"
          width={250}
          height={250}
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-[250px] h-[250px] opacity-20 lg:w-[416px] lg:h-[416px] lg:left-[1370px] lg:top-[-29px]"
        />
      </section>
    </div>
  );
};

export default ServicesListRendering;
