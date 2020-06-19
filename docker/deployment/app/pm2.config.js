module.exports = {
  apps: [{
    name: 'mongodb-schedule',
    script: './src/main.js',
    interpreter: 'babel-node',
    autorestart: false,
    watch: true,
    'ignore_watch': ['node_modules', '*.log'],
    env: {
      'NODE_ENV': 'development'
    },
    env_production: {
      'NODE_ENV': 'production'
    }
  }]
}
