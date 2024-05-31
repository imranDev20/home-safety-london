import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState, useEffect, useCallback } from "react";

interface UseRecaptchaTokenOptions {
  action?: string;
}

const useRecaptchaToken = (
  options?: UseRecaptchaTokenOptions
): [string | null, () => Promise<void>] => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState<string | null>(null);
  const { action = "contact" } = options || {};

  const getToken = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }
    const recaptchaToken = await executeRecaptcha(action);
    setToken(recaptchaToken);
  }, [executeRecaptcha, action]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const scheduleTokenRefresh = () => {
      interval = setTimeout(async () => {
        await getToken();
        scheduleTokenRefresh();
      }, 90000); // 90 seconds
    };

    getToken().then(scheduleTokenRefresh);

    return () => clearTimeout(interval); // Clear timeout on component unmount
  }, [getToken]);

  const regenerateToken = async () => {
    await getToken();
  };

  return [token, regenerateToken];
};

export default useRecaptchaToken;
