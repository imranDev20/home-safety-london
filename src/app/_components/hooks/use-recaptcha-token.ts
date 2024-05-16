import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState, useEffect } from "react";

interface UseRecaptchaTokenOptions {
  action?: string;
}

const useRecaptchaToken = (
  options?: UseRecaptchaTokenOptions
): string | null => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState<string | null>(null);
  const { action = "contact" } = options || {};

  useEffect(() => {
    const getToken = async () => {
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }

      const recaptchaToken = await executeRecaptcha(action);
      setToken(recaptchaToken);
    };

    getToken();
  }, [executeRecaptcha, action]);

  return token;
};

export default useRecaptchaToken;
