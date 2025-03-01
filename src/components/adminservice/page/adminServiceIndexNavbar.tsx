import { IconFinding } from "@/components/ui/IconFindingGrey";
import { IconPlus } from "@/components/ui/IconPlusWhite";
import { useRouter } from "next/router";

// กำหนดประเภทของ props ที่ component รับ
interface AdminServiceIndexNavbarProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AdminServiceIndexNavbar({
  handleInputChange,
}: AdminServiceIndexNavbarProps) {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-row items-center justify-between bg-white sticky top-0 h-20 px-10 py-5 min-w-[1200px] border-b  border-gray-300">
        {/* หัวข้อที่แสดงใน navbar */}
        <div className="text-xl">บริการ</div>
        <div className="h-full flex flex-row items-center gap-6 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 ">
            <IconFinding />
          </div>
          <input
            type="text"
            placeholder="ค้นหาบริการ..."
            onChange={handleInputChange}
            className="border border-gray-300 h-full rounded-lg w-80 pl-10"
          />
          <button
            className=" bg-defaultColor text-white text-base h-full px-7 flex items-center gap-3 rounded-lg"
            onClick={() => router.push("/adminservice/add")}
          >
            เพิ่มบริการ
            <span>
              <IconPlus />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
