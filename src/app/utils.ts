export class Utils {

  static get screenWidth(): number {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  static get isMobile(): boolean {
    return this.screenWidth <= 768;
  }

}
