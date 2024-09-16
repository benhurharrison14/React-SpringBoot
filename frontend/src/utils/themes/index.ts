import { createTheme } from "@mui/material/styles";
import { TypographyStyleOptions } from "@mui/material/styles/createTypography";

declare module "@mui/material/styles" {
  interface ThemeOptions {}
  interface TypeBackground {
    elevation0?: string;
    elevation1?: string;
    elevation2?: string;
  }
  interface Palette {
    purple: {
      600?: string;
      500?: string;
      400?: string;
    };
    white: {
      500?: string;
    };
    textColor: {
      highemp?: string;
      lowemp?: string;
      medemp?: string;
    };
    gray: {
      50?: string;
      100?: string;
    };
    background: TypeBackground;
    border: {
      highemp?: string;
      lowemp?: string;
    };
    icon: {
      highemp?: string;
      lowemp?: string;
    };
    accent:{
      red?: string;
      pink?: string
    }
  }

  interface PaletteOptions {
    purple?: {
      600?: string;
      500?: string;
      400?: string;
    };
    white?: {
      500?: string;
    };
    textColor?: {
      highemp?: string;
      lowemp?: string;
      medemp?: string;
    };
    gray?: {
      50?: string;
      100?: string;
    };
    border?: {
      highemp?: string;
      lowemp?: string;
    };
    icon?: {
      highemp?: string;
      lowemp?: string;
    };
    accent?: {
      red?: string
      pink?: string
    }
  }

  interface TypographyVariants {
    title: TypographyStyleOptions;
    heading1: TypographyStyleOptions;
    heading2: TypographyStyleOptions;
    heading3: TypographyStyleOptions;
    body1: TypographyStyleOptions;
    body2: TypographyStyleOptions;
    caption: TypographyStyleOptions;
    button1: TypographyStyleOptions;
    button2: TypographyStyleOptions;
  }
  interface TypographyVariantsOptions {
    title?: TypographyStyleOptions;
    heading1?: TypographyStyleOptions;
    heading2?: TypographyStyleOptions;
    heading3?: TypographyStyleOptions;
    body1?: TypographyStyleOptions;
    body2?: TypographyStyleOptions;
    caption?: TypographyStyleOptions;
    button1?: TypographyStyleOptions;
    button2?: TypographyStyleOptions;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title: true;
    heading1: true;
    heading2: true;
    heading3: true;
    body1: true;
    body2: true;
    caption: true;
    button1: true;
    button2: true
  }
}

let theme = createTheme({
  spacing: 4,
  palette: {
    purple: {
      600: "#393552",
      500: "#6C5DD3",
      400: "#B4A9FF",
    },
    white: {
      500: "#E8E8E9",
    },
    textColor: {
      highemp: "#E8E7F0",
      lowemp: "#A5A5A6",
      medemp: "#C9C8CC",
    },

    background: {
      elevation0: "#19181C",
      elevation1: "#201F24",
      elevation2: "#2D2D30",
    },
    gray: {
      50: "#3A3A3D",
      100: "#262529",
    },
    border: {
      highemp: "#413F4D",
      lowemp: "#28272B",
    },
    icon: {
      highemp: "#D4D2DE",
      lowemp: "#727080",
    },
    accent:{
      red:"#EC977D",
      pink:"#E39AB2"
    }
  },

  typography: {
    title: {
      fontFamily: "Gilroy-Bold",
      fontWeight: 700,
      fontSize: "36px",
      lineHeight: "42px",
    },
    heading1: {
      fontFamily: "Gilroy-Bold",
      fontWeight: 600,
      fontSize: "28px",
      lineHeight: "29.4px",
    },
    heading2: {
      fontFamily: "Gilroy-Semibold",
      fontWeight: 600,
      fontSize: "24px",
      lineHeight: "29.4px",
    },
    heading3: {
      fontFamily: "Gilroy-Medium",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "27px",
      textAlign: "left",
    },
    body1: {
      fontFamily: "Gilroy-Medium",
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: "22px",
    },
    body2: {
      fontFamily: "Gilroy-Semibold",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "17.15px",
      letterSpacing: "0.01em",
      textAlign: "left",
    },
    caption: {
      fontFamily: "Gilroy-Medium",
      fontWeight: 500,
      fontSize: "12px",
      lineHeight: "14.56px",
      letterSpacing: "0.02em",
      textAlign: "left",
    },
    button1: {
      fontFamily: "Gilroy-Semibold",
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "19px",
      textAlign: "left",
    },
    button2: {
      fontFamily: "Gilroy-Semibold",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "14px",
      textAlign: "left",
    },
  },
});

theme = createTheme({ ...theme });

export default theme;
