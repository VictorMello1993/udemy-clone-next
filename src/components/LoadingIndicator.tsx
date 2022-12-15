import { useEffect, useState } from "react";
import { MdHourglassBottom, MdHourglassTop } from "react-icons/md";

export function LoadingIndicator() {
  const [top, setTop] = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => setTop(!top), 500);
    return () => clearTimeout(timeoutId);
  }, [top]);

  return top ? <MdHourglassTop size="16px" color="#a435f0" /> : <MdHourglassBottom size="16px" color="#a435f0" />;
}
