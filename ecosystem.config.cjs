module.exports = {
  apps: [
    {
      name: 'ecf',
      script: './bin/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
}
