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
                }
                sh "rm -rf dist"
                nodejs(nodeJSInstallationName: 'node 7', configId: '') {
                    sh "npm install"
                    sh "ng build --base-href /simone/"
                }
                dir("dist") {
                    sh '''
                        export VERSION=`cat ../version.json | python -c "import sys, json; print(json.load(sys.stdin)['version'])"`
                        export COMMIT="$(git rev-parse --short HEAD)"
                        echo "$VERSION" | grep '\\(alpha\\|beta\\)' && export VERSION="${VERSION}-${COMMIT}"
                        tar -cvzf simone-$VERSION-$BUILD_ENV.tgz *
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

                       export SIMONE_ARCHIVE="simone-$VERSION-$BUILD_ENV.tgz"
                       echo "$SIMONE_ARCHIVE" > ${BRANCH_NAME}.latest

                       curl -v --user $NEXUS_BASIC_AUTH --upload-file dist/$SIMONE_ARCHIVE $DEPLOY_URL/$DEPLOY_REPO/charlyghislain/simone/$SIMONE_ARCHIVE
                       curl -v --user $NEXUS_BASIC_AUTH --upload-file ${BRANCH_NAME}.latest $DEPLOY_URL/$DEPLOY_REPO/charlyghislain/simone/${BRANCH_NAME}.latest
                       '''
                }
            }
        }
    }
}
