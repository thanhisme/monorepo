pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'thanhisme/vote-app'
        DOCKER_TAG="${GIT_BRANCH.tokenize('/').pop()}-${BUILD_NUMBER}-${GIT_COMMIT.substring(0,7)}"
    }

    stages {
        stage("Test") {
            when {
                anyOf {
                    branch 'master'
                    branch 'staging'
                    expression {
                        return env.BRANCH_NAME =~ /PR-.*/ && env.CHANGE_TARGET =~ /(master|staging).*/
                    }
                }
            }

            agent {
                docker {
                    image 'node:18-alpine'
                    args '-u 0:0'
                }
            }

            steps {
                sh "yarn global add turbo"
                sh "yarn"
                sh "turbo test"
            }
        }

        stage("Build") {  
            when {
                branch 'master|staging'
            }

            steps {
                script {
                    clientImage = docker.build(DOCKER_IMAGE, '-f apps/client .')
                    serverImage = docker.build(DOCKER_IMAGE, '-f apps/server .')
                }
            }
        }
        
        stage('Push to Docker Hub') {
            when {
                branch 'master|staging'
            }

            steps {
                withDockerRegistry([credentialsId: 'docker-hub', url: ""]) {
                    script {
                        image.push(DOCKER_TAG)
                        
                        if (GIT_BRANCH ==~ /.*master.*/) {
                            image.push('latest')
                        }
                    }
                }
            }
        }
        
        stage('Clean up') {
            when {
                branch 'master|staging'
            }

            steps {
                script {
                    if (GIT_BRANCH ==~ /.*master.*/) {
                        sh 'docker image rm ${DOCKER_IMAGE}'
                    }
                }
                
		        sh 'docker image rm ${DOCKER_IMAGE}:${DOCKER_TAG}'
            	sh 'docker logout'
            }
        }
    } 

    post {
        success {
            echo 'Succeeded'
        }

        failure {
            echo 'Failed'
        }
    }
}
