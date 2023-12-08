import { Component, AfterViewInit } from '@angular/core';

interface Theme {
  background: string;
  color: string;
  primaryColor: string;
  glassColor: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  ngAfterViewInit() {
    const themes: Theme[] = [
      {
        background: "#1A1A2E",
        color: "#FFFFFF",
        primaryColor: "#0F3460",
        glassColor: "#000000"
      },
      {
        background: "#461220",
        color: "#FFFFFF",
        primaryColor: "#E94560",
        glassColor: "#000000"
      },
      // ...
    ];

    const setTheme = (theme: Theme) => {
      const root = document.querySelector(":root") as HTMLElement;
      if (root) {
        root.style.setProperty("--background", theme.background);
        root.style.setProperty("--color", theme.color);
        root.style.setProperty("--primary-color", theme.primaryColor);
        root.style.setProperty("--glass-color", theme.glassColor);
      }
    };

    const displayThemeButtons = () => {
      const btnContainer = document.querySelector(".theme-btn-container") as HTMLElement;
      if (btnContainer) {
        themes.forEach((theme) => {
          const div = document.createElement("div");
          div.className = "theme-btn";
          div.style.cssText = `background: ${theme.background}; width: 25px; height: 25px`;
          btnContainer.appendChild(div);
          div.addEventListener("click", () => setTheme(theme));
        });
      }
    };

    displayThemeButtons();
  }
}