import React from "react";
import Typewriter from "typewriter-effect";
import { useLanguage } from "../../i18n/LanguageContext";

function Type() {
  const { lang, t } = useLanguage();
  const strings = t("home.typewriter");

  return (
    <Typewriter
      key={lang}
      options={{
        strings: Array.isArray(strings) ? strings : [strings],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
