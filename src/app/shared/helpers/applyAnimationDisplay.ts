import { ElementRef, Renderer2 } from "@angular/core";


export function applyAnimationDisplay(
  renderer: Renderer2,//Argumento Obligatorio, renderer2 no se puede instanciar
  element: ElementRef,
  onAnimationEnd: () => void
): void {
  renderer.setStyle(element.nativeElement, 'display', 'block');
  renderer.addClass(element.nativeElement, 'block');
  const listener: () => void = renderer.listen(element.nativeElement, 'animationend', () => {
    renderer.setStyle(element.nativeElement, 'display', 'none');
    listener();
    onAnimationEnd();
  });
}
