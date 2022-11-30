import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'center-component',
  template: 
    "<div [style]='styles' [class]='class'>" +
    "  <ng-content></ng-content>" +
    "</div>" 
})
export class CenterComponent implements OnInit {
  @Input() text: boolean = false;
  @Input() display: "flex" | "grid" = "flex";
  @Input() maxWidth?: string;
  @Input() class?: string;
  styles: any = {};

  constructor(){}

  ngOnInit(){
    this.styles = this.text ? {
      textAlign: "center",
      maxWidth: this.maxWidth,
      marginInline: "auto"
    } : {
      display: this.display,
      maxWidth: this.maxWidth,
      alignItems: "center",
      marginInline: "auto",
      [this.display === "flex" ? "justifyContent" : "placeItems"]: "center"
    };
  }
};
