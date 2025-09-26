import { qs } from "./utils.mjs";

export default class Alert {
  constructor() {
    this.path = "../json/alerts.json";
    this.mainElement = qs("main");
  }

  async init() {
    const alerts = await this.getAlerts();
    if (alerts && alerts.length > 0) {
      this.renderAlerts(alerts);
    }
  }

  async getAlerts() {
    try {
      const response = await fetch(this.path);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
      return null;
    }
  }

  renderAlerts(alerts) {
    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");

    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      alertSection.appendChild(p);
    });

    this.mainElement.prepend(alertSection);
  }
}