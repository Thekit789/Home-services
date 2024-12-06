import React, { useState } from 'react';


export default function IconDrag() {
    const [active, setActive] = useState(false);
  
    const handleMouseDown = () => setActive(true);
    const handleMouseUp = () => setActive(false);
  
    return (
      <svg
        className="cursor-pointer"
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <path
          d="M10 6.50012C9.46957 6.50012 8.96086 6.28941 8.58579 5.91434C8.21071 5.53926 8 5.03056 8 4.50012C8 3.96969 8.21071 3.46098 8.58579 3.08591C8.96086 2.71084 9.46957 2.50012 10 2.50012C10.5304 2.50012 11.0391 2.71084 11.4142 3.08591C11.7893 3.46098 12 3.96969 12 4.50012C12 5.03056 11.7893 5.53926 11.4142 5.91434C11.0391 6.28941 10.5304 6.50012 10 6.50012ZM10 12.5001C9.46957 12.5001 8.96086 12.2894 8.58579 11.9143C8.21071 11.5393 8 11.0306 8 10.5001C8 9.96969 8.21071 9.46098 8.58579 9.08591C8.96086 8.71084 9.46957 8.50012 10 8.50012C10.5304 8.50012 11.0391 8.71084 11.4142 9.08591C11.7893 9.46098 12 9.96969 12 10.5001C12 11.0306 11.7893 11.5393 11.4142 11.9143C11.0391 12.2894 10.5304 12.5001 10 12.5001ZM10 18.5001C9.46957 18.5001 8.96086 18.2894 8.58579 17.9143C8.21071 17.5393 8 17.0306 8 16.5001C8 15.9697 8.21071 15.461 8.58579 15.0859C8.96086 14.7108 9.46957 14.5001 10 14.5001C10.5304 14.5001 11.0391 14.7108 11.4142 15.0859C11.7893 15.461 12 15.9697 12 16.5001C12 17.0306 11.7893 17.5393 11.4142 17.9143C11.0391 18.2894 10.5304 18.5001 10 18.5001Z"
          fill={active ? "#9AA1B0" : "#CCD0D7"} // เปลี่ยนสีเมื่อ active
        />
        <path
          d="M16 6.50012C15.4696 6.50012 14.9609 6.28941 14.5858 5.91434C14.2107 5.53926 14 5.03056 14 4.50012C14 3.96969 14.2107 3.46098 14.5858 3.08591C14.9609 2.71084 15.4696 2.50012 16 2.50012C16.5304 2.50012 17.0391 2.71084 17.4142 3.08591C17.7893 3.46098 18 3.96969 18 4.50012C18 5.03056 17.7893 5.53926 17.4142 5.91434C17.0391 6.28941 16.5304 6.50012 16 6.50012ZM16 12.5001C15.4696 12.5001 14.9609 12.2894 14.5858 11.9143C14.2107 11.5393 14 11.0306 14 10.5001C14 9.96969 14.2107 9.46098 14.5858 9.08591C14.9609 8.71084 15.4696 8.50012 16 8.50012C16.5304 8.50012 17.0391 8.71084 17.4142 9.08591C17.7893 9.46098 18 9.96969 18 10.5001C18 11.0306 17.7893 11.5393 17.4142 11.9143C17.0391 12.2894 16.5304 12.5001 16 12.5001ZM16 18.5001C15.4696 18.5001 14.9609 18.2894 14.5858 17.9143C14.2107 17.5393 14 17.0306 14 16.5001C14 15.9697 14.2107 15.461 14.5858 15.0859C14.9609 14.7108 15.4696 14.5001 16 14.5001C16.5304 14.5001 17.0391 14.7108 17.4142 15.0859C17.7893 15.461 18 15.9697 18 16.5001C18 17.0306 17.7893 17.5393 17.4142 17.9143C17.0391 18.2894 16.5304 18.5001 16 18.5001Z"
          fill={active ? "#9AA1B0" : "#CCD0D7"} // เปลี่ยนสีเมื่อ active
        />
      </svg>
    );
  }
  