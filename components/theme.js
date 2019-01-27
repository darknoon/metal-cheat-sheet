export const schemeLight = {
  background: "white",
  foreground: "#333",
  lighter: "#666",
  lightest: "#eee"
};

export default () => (
  <style jsx global>{`
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
        margin: 0;

    }
    html {
      padding 0;
      background: ${schemeLight.background};
      color: ${schemeLight.foreground};
    }

    section {
      margin: auto;
    }
  `}</style>
);
