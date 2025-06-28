module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      max_memory_restart: "200M", // Limite de mémoire
      error_file: "./logs/err.log", // Fichier Log des erreurs
      env_production: {
        NODE_ENV: "production",
      },
      instances: 3, // les 3 instances en parallèle
      exec_mode: "cluster", // Mode cluster pour les instances
    },
  ],
};
