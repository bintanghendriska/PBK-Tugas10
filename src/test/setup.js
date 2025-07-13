import { config } from "@vue/test-utils";

// Konfigurasi global untuk Vue Test Utils
config.global.stubs = {
  "router-link": true,
  "router-view": true,
};
