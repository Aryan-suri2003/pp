# Go to the project root (if you are not already there)
cd "c:\Users\surij\Downloads\Pipeline--main"

# Create the file – you can use any editor, but here we use a heredoc for simplicity
cat > Jenkinsfile <<'EOF'
pipeline {
    agent any

    environment {
        // GitHub Personal‑Access‑Token stored in Jenkins as a secret text credential named "github-pat"
        GITHUB_PAT = credentials('github-pat')
    }

    options {
        ansiColor('xterm')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    stages {
        stage('Checkout') {
            steps {
                // HTTPS URL with the token embedded – no interactive auth needed
                git url: "https://${GITHUB_PAT}@github.com/Aryan-suri2003/pp.git",
                    branch: 'master'
            }
        }

        stage('Build Images') {
            steps {
                sh '''
                    echo "🔧 Building Docker images …"
                    docker compose build --pull
                '''
            }
        }

        stage('Start Stack') {
            steps {
                sh '''
                    echo "🚀 Starting Docker Compose stack …"
                    docker compose up -d
                '''
            }
        }

        stage('Health Check') {
            steps {
                script {
                    def maxWait = 60
                    def waited  = 0
                    while (waited < maxWait) {
                        def running = sh(script: "docker compose ps --services --filter 'status=running' | wc -l",
                                         returnStdout: true).trim()
                        def defined = sh(script: "docker compose config --services | wc -l",
                                         returnStdout: true).trim()
                        if (running == defined) {
                            echo "✅ All ${defined} services are up."
                            break
                        }
                        echo "⏳ Waiting (${waited}s)…"
                        sleep time: 5, unit: 'SECONDS'
                        waited += 5
                    }
                    if (waited >= maxWait) {
                        error "❌ Services did not become healthy after ${maxWait}s"
                    }
                }
            }
        }

        stage('Sanity Test') {
            steps {
                script {
                    // Adjust the service/port if yours differ
                    def port = sh(script: "docker compose port frontend 3000 | cut -d: -f2",
                                  returnStdout: true).trim()
                    if (port) {
                        sh """
                            echo "🔍 Testing http://localhost:${port}"
                            curl --max-time 10 -f http://localhost:${port} || exit 1
                        """
                    } else {
                        echo "⚠️ Frontend service/port not found – skipping curl test."
                    }
                }
            }
        }
    }

    post {
        always {
            echo "🧹 Cleaning up Docker Compose stack …"
            sh 'docker compose down --remove-orphans --volumes || true'
        }
        success { echo "✅ Pipeline completed successfully." }
        failure { echo "❌ Pipeline failed." }
    }
}
EOF
