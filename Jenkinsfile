#!groovy

pipeline {
    agent any
    parameters {
        booleanParam(name: 'DEBUG', defaultValue: true,
            description: 'Include sources in build output.')
        string(name: 'DEPLOY_URL', defaultValue: 'https://valuya.be:50443/nexus/repository',
            description: 'Deployment repository')
        string(name: 'DEPLOY_REPO', defaultValue: 'web-snapshots',
            description: 'Deployment repository')
    }
    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    stages {
        stage ('Build') {
            steps {
                script {
                    env.BUILD_ENV = params.DEBUG ? "dev" : "prod"
                    booleanParam(name: 'DOCKER_NO_CACHE', defaultValue: false, description: '')
                }
                sh "rm -rf dist"
                nodejs(nodeJSInstallationName: 'node 7', configId: '') {
                    sh "npm install"
                    sh "ng build"
                }
                dir("dist") {
                    sh '''
                        export VERSION=`cat ../version.json | python -c "import sys, json; print(json.load(sys.stdin)['version'])"`
                        export COMMIT="$(git rev-parse --short HEAD)"
                        echo "$VERSION" | grep '\\(alpha\\|beta\\)' && export VERSION="${VERSION}-${COMMIT}"
                        zip -rv simone-$VERSION.zip *
                        '''
                }
            }
        }
        stage ('Publish') {
            steps {
                withCredentials([usernameColonPassword(credentialsId: 'nexus-basic-auth', variable: 'NEXUS_BASIC_AUTH')]) {
                     sh '''
                       export VERSION=`cat version.json | python -c "import sys, json; print(json.load(sys.stdin)['version'])"`
                       export COMMIT="$(git rev-parse --short HEAD)"
                       echo "$VERSION" | grep '\\(alpha\\|beta\\)' && export VERSION="${VERSION}-${COMMIT}"

                       export SIMONE_ARCHIVE="simone-$VERSION-$BUILD_ENV.zip"
                       echo "SIMONE_ARCHIVE" > ${BRANCH_NAME}.latest

                       curl -v --user $NEXUS_BASIC_AUTH --upload-file dist/SIMONE_ARCHIVE $DEPLOY_URL/$DEPLOY_REPO/charlyghislain/simone/$SIMONE_ARCHIVE
                       curl -v --user $NEXUS_BASIC_AUTH --upload-file ${BRANCH_NAME}.latest.gestemps $DEPLOY_URL/$DEPLOY_REPO/charlyghislain/simone/${BRANCH_NAME}.latest
                       '''
                }
            }
        }
    }
}