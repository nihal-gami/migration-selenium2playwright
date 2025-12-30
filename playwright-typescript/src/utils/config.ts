import * as fs from 'fs';
import * as path from 'path';

interface ConfigProperties {
  browser: string;
  baseUrl: string;
  username: string;
  password: string;
  implicitWait: number;
  explicitWait: number;
  pageLoadTimeout: number;
}

class ConfigReader {
  private static properties: ConfigProperties = ConfigReader.loadProperties();

  private static loadProperties(): ConfigProperties {
    try {
      const configPath = path.join(__dirname, '../../config/config.properties');
      const fileContent = fs.readFileSync(configPath, 'utf-8');
      const lines = fileContent.split('\n');
      
      const props: Partial<ConfigProperties> = {};
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split('=');
          if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim();
            switch (key.trim()) {
              case 'browser':
                props.browser = value;
                break;
              case 'base.url':
                props.baseUrl = value;
                break;
              case 'username':
                props.username = value;
                break;
              case 'password':
                props.password = value;
                break;
              case 'implicit.wait':
                props.implicitWait = parseInt(value, 10);
                break;
              case 'explicit.wait':
                props.explicitWait = parseInt(value, 10);
                break;
              case 'page.load.timeout':
                props.pageLoadTimeout = parseInt(value, 10);
                break;
            }
          }
        }
      }
      
      return {
        browser: props.browser || 'chromium',
        baseUrl: props.baseUrl || 'https://opensource-demo.orangehrmlive.com/',
        username: props.username || '',
        password: props.password || '',
        implicitWait: props.implicitWait || 10,
        explicitWait: props.explicitWait || 10,
        pageLoadTimeout: props.pageLoadTimeout || 30,
      };
    } catch (error) {
      console.error('Error loading config.properties:', error);
      // Fallback to defaults
      return {
        browser: process.env.BROWSER || 'chromium',
        baseUrl: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/',
        username: process.env.USERNAME || 'Admin',
        password: process.env.PASSWORD || 'admin123',
        implicitWait: 10,
        explicitWait: 10,
        pageLoadTimeout: 30,
      };
    }
  }

  static getProperty(key: keyof ConfigProperties): string | number {
    return ConfigReader.properties[key];
  }

  static getBrowser(): string {
    return String(ConfigReader.properties.browser);
  }

  static getBaseUrl(): string {
    return ConfigReader.properties.baseUrl;
  }

  static getUsername(): string {
    return ConfigReader.properties.username;
  }

  static getPassword(): string {
    return ConfigReader.properties.password;
  }

  static getImplicitWait(): number {
    return ConfigReader.properties.implicitWait;
  }

  static getExplicitWait(): number {
    return ConfigReader.properties.explicitWait;
  }

  static getPageLoadTimeout(): number {
    return ConfigReader.properties.pageLoadTimeout;
  }
}

export default ConfigReader;

