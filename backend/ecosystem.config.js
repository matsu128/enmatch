module.exports = {
    apps: [
      {
        name: 'server',
        script: 'server.js',
        env: {
          NODE_ENV: 'development',
          DATABASE_URL: 'postgresql://matsu:Matsumoto128@database-enmatch-local.cxgyis6mubyp.ap-northeast-1.rds.amazonaws.com:5432/enmatchLocal?schema=public',
          JWT_SECRET: 'sblaocignsnwlsngasdfw2a9sa',
          REACT_APP_API_URL: 'https://18.183.99.226:5001/', // フロントエンド用のAPI URL
          PORT: 5001, // サーバーのポート設定
        },
        env_production: {
          NODE_ENV: 'production',
          DATABASE_URL: 'postgresql://matsu:Matsumoto128@database-enmatch-local.cxgyis6mubyp.ap-northeast-1.rds.amazonaws.com:5432/enmatchLocal?schema=public',
          JWT_SECRET: 'sblaocignsnwlsngasdfw2a9sa',
          REACT_APP_API_URL: 'https://18.183.99.226:5001/', // フロントエンド用のAPI URL
          PORT: 5001, // サーバーのポート設定
        }
      }
    ]
  };
  