pipeline {
    agent any

    environment {
        SERVER_IMAGE = 'thanhisme/vote-app-server'
        CLIENT_IMAGE = 'thanhisme/vote-app-client'
        DOCKER_TAG="${GIT_BRANCH.tokenize('/').pop()}-${BUILD_NUMBER}-${GIT_COMMIT.substring(0,7)}"
    }

    stages {
        // stage("Test") {
        //     when {
        //         anyOf {
        //             branch 'master'
        //             branch 'staging'
        //             expression {
        //                 return env.BRANCH_NAME =~ /PR-.*/ && env.CHANGE_TARGET =~ /(master|staging).*/
        //             }
        //         }
        //     }

        //     agent {
        //         docker {
        //             image 'node:18-alpine'
        //             args '-u 0:0'
        //         }
        //     }

        //     steps {
        //         sh "yarn global add turbo"
        //         sh "yarn"
        //         sh "turbo test"
        //     }
        // }

        stage("Build") {  
            when {
                anyOf {
                    branch 'master'
                    branch 'staging'
                }
            }

            steps {
                sh "echo 'VITE_POLLS_NAMESPACE=${env.VITE_POLLS_NAMESPACE}' >> apps/client/.env"
                sh "cat apps/client/.env"

                script {
                    clientImage = docker.build(CLIENT_IMAGE, '-f apps/client/Dockerfile .')
                    serverImage = docker.build(SERVER_IMAGE, '-f apps/server/Dockerfile .')
                }
            }
        }
        
        stage('Push to Docker Hub') {
            when {
                anyOf {
                    branch 'master'
                    branch 'staging'
                }
            }

            steps {
                withDockerRegistry([credentialsId: 'docker-hub', url: ""]) {
                    script {
                        clientImage.push(DOCKER_TAG)
                        serverImage.push(DOCKER_TAG)
                        
                        if (GIT_BRANCH ==~ /.*master.*/) {
                            clientImage.push('latest')
                            serverImage.push('latest')
                        }
                    }
                }
            }
        }
        
        stage('Clean up') {
            when {
                anyOf {
                    branch 'master'
                    branch 'staging'
                }
            }

            steps {
                script {
                    if (GIT_BRANCH ==~ /.*master.*/) {
                        sh 'docker image rm ${CLIENT_IMAGE}'
                        sh 'docker image rm ${SERVER_IMAGE}'
                    }
                }

		        sh 'docker image rm ${CLIENT_IMAGE}:${DOCKER_TAG}'
		        sh 'docker image rm ${SERVER_IMAGE}:${DOCKER_TAG}'

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
