import { useEffect } from "react";
import useToast from "../hooks/useToast";

const EmailVerification = () => {
  const showToast = useToast();

  showToast(`Email successfully verified!!!`, "success");
  useEffect(() => {
   
    // Delay the redirect by 2 seconds (adjust as needed)
    const redirectTimer = setTimeout(() => {
      window.location.href = "/";
    }, 100);

    // Clear the timer when the component is unmounted
    return () => clearTimeout(redirectTimer);
  }, [showToast]);

  return null ;
};

export default EmailVerification;
