import { useRouter } from "next/router";
import {
  UserRound as UserIcon,
  ClipboardList as ListIcon,
  History as HistoryIcon,
} from "lucide-react";
interface ParamsProp {
  userId: string | null;
}
export default function UserSidebar({ userId }: ParamsProp) {
  const router = useRouter();
  const pathBlockIfNoUser = (userId: string | null): void => {
    if (!userId) {
      router.push("/");
    }
  };
  const handleProfile = (): void => {
    pathBlockIfNoUser(userId);
    router.push(`/customerservice/${userId}/profile`);
  };
  const handleOrderList = (): void => {
    pathBlockIfNoUser(userId);
    router.push(`/customerservice/${userId}/orderlist`);
  };
  const handleHistory = (): void => {
    pathBlockIfNoUser(userId);
    router.push(`/customerservice/${userId}/history`);
  };

  return (
    <>
      <div
        className="sidebar-body bg-white flex flex-col justify-start items-start 
      my-2 pl-4 pr-9 w-11/12
      lg:w-64 lg:h-64 border rounded-lg">
        <div className="header-box border-b w-full mx-4">
          <h3 className="sidebar-heade font-normal text-xl text-gray-700 p-6">
            บัญชีผู้ใช้
          </h3>
        </div>
        <div className="sidebar-buttons mx-6 my-4 flex flex-row justify-between lg:flex-col">
          <button
            className={`font-normal text-base py-3 pr-5 pl-1 w-32 lg:w-44 text-start
            flex justify-start items-center gap-2 ${
              router.pathname.endsWith(`/profile`)
                ? `text-blue-700`
                : `text-gray-950`
            } `}
            onClick={handleProfile}>
            <span>
              <UserIcon
                size={24}
                color={router.pathname.endsWith(`/profile`) ? "blue" : "grey"}
              />
            </span>
            ข้อมูลผู้ใช้งาน
          </button>

          <button
            className={`font-normal text-base py-3 pr-5 pl-1 w-32 lg:w-44 text-start 
            flex justify-start items-center gap-2 ${
              router.pathname.endsWith(`/orderlist`)
                ? `text-blue-700`
                : `text-gray-950`
            }`}
            onClick={handleOrderList}>
            <span>
              <ListIcon
                size={24}
                color={router.pathname.endsWith(`/orderlist`) ? "blue" : "grey"}
              />
            </span>
            รายการคำสั่งซ่อม
          </button>

          <button
            className={`font-normal text-base py-3 pr-5 pl-1 w-32 lg:w-44 text-start 
            flex justify-start items-center gap-2 ${
              router.pathname.endsWith(`/history`)
                ? `text-blue-700`
                : `text-gray-950`
            } `}
            onClick={handleHistory}>
            <span>
              <HistoryIcon
                size={24}
                color={router.pathname.endsWith(`/history`) ? "blue" : "grey"}
              />
            </span>
            ประวัติการซ่อม
          </button>
        </div>
      </div>
    </>
  );
}
