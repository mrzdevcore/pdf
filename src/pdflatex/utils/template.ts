type Data = Record<string, unknown>;

export interface ConstructorOptions {
  open?: string;
  close?: string;
  isEscape?: boolean;
}

export default class Template {
  private readonly open: string;
  private readonly close: string;
  private readonly isEscape: boolean;

  constructor(options?: ConstructorOptions) {
    this.open = options?.open ?? '</';
    this.close = options?.close ?? '/>';
    this.isEscape = options?.isEscape ?? true;
  }

  render(str: string, data: Data): string {
    const reg = new RegExp(`${this.open}([\\s\\S]+?)${this.close}`, 'g');
    return str.replace(reg, (match, key: string): string => {
      let value: any = data;
      key
        .replace(/ /g, '')
        .split('.')
        .forEach((_key) => {
          value = value[_key];
        });
      if (value === undefined) return match;
      return this.escape(value);
    });
  }

  private escape(str: any): string {
    if (typeof str === 'object') {
      str = JSON.stringify(str);
    }
    str = String(str);
    if (this.isEscape === false) return str;
    return str
      .replace(/&(?!\w+;)/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
