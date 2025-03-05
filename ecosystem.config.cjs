module.exports = {
  apps: [
    {
      name: 'ecf',
      script: './app/buil/bin/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
}
