import { ConfigProvider } from "antd";

const ThemeProvider = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#4caf50", // Основной цвет
        colorSuccess: "#81c784", // Цвет успеха
        colorWarning: "#ffeb3b", // Цвет предупреждения
        colorError: "#f44336", // Цвет ошибки
        colorInfo: "#64b5f6", // Цвет информации
        colorTextBase: "#2e7d32", // Основной цвет текста
        colorBgBase: "#e8f5e9", // Основной цвет фона
        fontSizeBase: "16px", // Размер основного шрифта
        fontFamily: '"Arial", sans-serif', // Основной шрифт
        paddingBase: "20px", // Основной отступ
        paddingSmall: "10px", // Маленький отступ
        marginBase: "20px", // Основной отступ
        marginSmall: "10px", // Маленький отступ
        borderRadiusBase: "12px", // Радиус скругления
        borderColorBase: "#a5d6a7", // Основной цвет границы
        heightBase: "40px", // Основная высота
        heightSmall: "30px", // Маленькая высота
        lineHeightBase: "1.6", // Основная высота линии
        boxShadowBase: "0 4px 12px rgba(0, 0, 0, 0.2)", // Основная тень
        boxShadowPrimary: "0 4px 12px rgba(76, 175, 80, 0.2)", // Тень для основного цвета
        colorBgContainer: "#f1f8e9", // Цвет фона контейнера
      },
    }}
  >
    {children}
  </ConfigProvider>
);

export default ThemeProvider;
