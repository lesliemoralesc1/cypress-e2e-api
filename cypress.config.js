const { defineConfig } = require("cypress");
const { merge } = require("mochawesome-merge");
const marge = require("mochawesome-report-generator");

const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

module.exports = defineConfig({
  experimentalSessionAndOrigin: true,
  experimentalSessionSupport: true,

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: false,
    json: true
  },

  e2e: {
    video: true,
    videosFolder: "cypress/videos",
    screenshotOnRunFailure: true,

    async setupNodeEvents(on, config) {

      // Limpiar reportes viejos antes de correr
      fse.emptyDirSync("cypress/reports/mochawesome");
      fse.ensureDirSync("cypress/reports");

      // Al finalizar TODOS los specs
      on("after:run", async () => {
        const reportDir = "cypress/reports/mochawesome";

        // Unir JSONs
        const jsonReport = await merge({
          files: [path.join(reportDir, "*.json")],
        });

        // Guardar JSON final
        const outputJson = "cypress/reports/report.json";
        fs.writeFileSync(outputJson, JSON.stringify(jsonReport, null, 2));

        // Generar HTML
        await marge.create(jsonReport, {
          reportDir: "cypress/reports",
          reportFilename: "report",
          inline: true, // incrusta assets para que sea portable
        });

        console.log("📊 Reporte Mochawesome generado en cypress/reports/report.html");
      });

      return config;
    },
  },
});
