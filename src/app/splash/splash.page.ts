import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';



@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements AfterViewInit {

  // conectar elemento en el div para que pueda ser animado con id="animatedFooter"
  @ViewChild('animatedFooter') animatedFooter!: ElementRef ;


  constructor(private router: Router, 
              private aniCtrl: AnimationController) { }
  
  ngAfterViewInit(): void {
    const mi_animacion = this.aniCtrl.create()
      .addElement(this.animatedFooter.nativeElement)
      .duration(5000)
      .iterations(Infinity)
      .fromTo('transform', 'scale(1)', 'scale(1.5)')
      .fromTo('opacity', '1', '0.3')
      .fromTo('transform', 'scale(1.5)', 'scale(1)')
      .fromTo('opacity', '0.3', '1');
      mi_animacion.play()
  }

  ngOnInit() {
    setTimeout(()=>{
      this.router.navigate(['/login']);
    },5000);
  }

}
