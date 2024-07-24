export type ConfigType = {
  debug: boolean;
};

const ConfigDefaults: ConfigType = {
  debug: false,
};

const config: ConfigType = {
  debug:
    (process.env.DEBUG ? !!Number(process.env.DEBUG) : undefined) ??
    ConfigDefaults.debug,
};

export default config;
