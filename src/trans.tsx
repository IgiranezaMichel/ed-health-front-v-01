/* eslint-disable no-var */
import { useEffect } from "react";
const Trans = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {includedLanguages: 'en,rw',
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  return (
    <>
      <div id="google_translate_element"></div>
      <h4>Start building your app. <span className="bg-success"> Happy</span> Coding!</h4>
    </>
  );
};

export default Trans;
