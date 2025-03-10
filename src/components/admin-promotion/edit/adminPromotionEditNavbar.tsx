import { useRouter } from "next/router";
import { IconArrowBack } from "@/components/ui/IconArrowBack";

interface AdminPromotionEditNavbarProps {
  nameTopic: string;
}

export function AdminPromotionEditNavbar({
  nameTopic,
}: AdminPromotionEditNavbarProps): JSX.Element {
  const router = useRouter();

  return (
    <>
      {/* navbar for admin page */}
      <div className="flex flex-row items-center justify-between bg-white sticky top-0 h-20 px-10 py-5 min-w-[1200px] border-b  border-gray-300 z-10 ">
        <div
          className="flex flex-row items-center cursor-pointer"
          onClick={() => router.push("/adminpromotioncode")}
        >
          <IconArrowBack />
          <nav className="flex flex-col">
            <div className="text-xs">Promotion Code</div>
            <div className="text-xl font-medium">{nameTopic}</div>
          </nav>
        </div>
        <nav className="h-full flex flex-row items-center gap-6 relative">
          <button
            className="bg-white text-defaultColor text-base h-full px-7 flex items-center gap-3 rounded-lg w-32 text-center justify-center border border-defaultColor"
            onClick={() => router.push("/adminpromotioncode")}
            type="button"
          >
            ยกเลิก
          </button>
          <button
            className="bg-defaultColor text-white text-base h-full px-7 flex items-center gap-3 rounded-lg w-32 text-center justify-center"
            type="submit"
          >
            ยืนยัน
          </button>
        </nav>
      </div>
    </>
  );
}
