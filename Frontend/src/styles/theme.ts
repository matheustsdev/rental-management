import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
    colors: {
        primary: {
            50: "#FEEAEF",
            100: "#FED6DF",
            200: "#FA416C",
            300: "#E9063B",
            400: "#9F0428",
            500: "#560216",
            600: "#440211",
            700: "#33010D",
            800: "#220109",
            900: "#110004"
        },
        secondary: {
            50: "#FFFBEE",
            100: "#FFF5D0",
            200: "#FFEEB2",
            300: "#FFE893",
            400: "#FEE175",
            500: "#FFDA58",
            600: "#FFCC12",
            700: "#CDA100",
            800: "#896B00",
            900: "#443600"
        },
        body: {
            400: "#F4F4F4"
        }
    }
})