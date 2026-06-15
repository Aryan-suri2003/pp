pipeline {
agent any


stages {

    stage('Checkout') {
        steps {
            git branch: 'master',
                url: 'https://github.com/Aryan-suri2003/pp.git'
        }
    }

  stage('Build') {
    steps {
        bat '''
        dir
        docker compose -f docker-compose.yml build
        '''
    }
}

    stage('Deploy') {
        steps {
            bat '''
            docker compose down
            docker compose up -d
            '''
        }
    }

    stage('Verify') {
        steps {
            bat 'docker ps'
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

}
