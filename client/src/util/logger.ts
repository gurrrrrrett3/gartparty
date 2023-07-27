const GLOAL_LOG_SETTINGS = {
  // 0 : info, 1 : warn, 2 : error
  consoleLogLevel: 0,
  debugEnabled: (globalThis as any).debugEnabled || false,
};

export default class Logger {
  public static init() {


    if (GLOAL_LOG_SETTINGS.debugEnabled) {
      console.log(`%c[DEBUG] %cDebug Mode Enabled`, "color: blue; font-weight: bold;", "color: green; font-weight: bold;");
    }
  }

  public static debug(method: string, ...message: any[]) {
    if (GLOAL_LOG_SETTINGS.debugEnabled) {
      const col = Logger.getColor(method);
      console.log(
        `%c[DEBUG] %c[${method}] %c${message.join("\n")}`, "color: blue; font-weight: bold;", `color: ${col}; font-weight: bold;`, `color: white; font-weight: bold;`
      );
    }
  }

  public static log(method: string, ...message: any[]) {
    const col = Logger.getColor(method);
    if (GLOAL_LOG_SETTINGS.consoleLogLevel === 0)
      console.log(`%c[${method}] %c${message.join("\n")}`, `color: ${col}; font-weight: bold;`, `color: white;`);
  }

  public static warn(method: string, ...message: any[]) {
    const col = Logger.getColor(method);
    if (GLOAL_LOG_SETTINGS.consoleLogLevel <= 1)
      console.warn(`%c[${method}] %c${message.join("\n")}`, `color: ${col}; font-weight: bold;`, `color: orange;`);
  }

  public static error(method: string, ...message: any[]) {
    const col = Logger.getColor(method);
    if (GLOAL_LOG_SETTINGS.consoleLogLevel <= 2)
      console.error(`%c[${method}] %c${message.join("\n")}`, `color: ${col}; font-weight: bold;`, `color: red; font-weight: bold;`);
  }

  public static info = (method: string, ...message: any[]) => Logger.log(method, ...message);

  public static getColor(str: string): string {
     // calculate hash
     let hash = 0;
     for (let i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
     }
     // convert to hex
     let color = "#";
     for (let i = 0; i < 3; i++) {
       const value = (hash >> (i * 8)) & 0xff;
       color += ("00" + value.toString(16)).substr(-2);
     }
     return color;
  }
}
