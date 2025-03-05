module.exports = {
  apps: [
    {
      name: 'ecf',
      script: './build/bin/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
}
