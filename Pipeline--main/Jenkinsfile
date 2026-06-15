pipeline {
agent any

```
stages {

    stage('Checkout') {
        steps {
            git branch: 'main',
                url: 'https://github.com/Aryan-suri2003/pp.git'
        }
    }

    stage('Build Docker Images') {
        steps {
            sh 'docker compose build'
        }
    }

    stage('Deploy') {
        steps {
            sh '''
            docker compose down || true
            docker compose up -d
            '''
        }
    }

    stage('Verify') {
        steps {
            sh 'docker ps'
        }
    }
}

post {
    success {
        echo 'Deployment Successful'
    }

    failure {
        echo 'Deployment Failed'
    }
}
```

}
