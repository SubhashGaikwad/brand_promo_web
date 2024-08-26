#!/usr/bin/env groovy
properties([
    buildDiscarder(logRotator(numToKeepStr: '5', daysToKeepStr: '30'))
])
node {
      def profile = "qa" // default port
    try {
        stage('Checkout') {
            // Checkout the source code from the repository
            checkout scm
        }

        stage('Install Dependencies') {
            // Install necessary dependencies
            sh 'npm install'
        }

        stage('GIT Branch profile') {
            // Set the port based on the branch name content
            if (env.BRANCH_NAME.contains('release')) {
                profile="qa";
            } else if (env.BRANCH_NAME.contains('tag')) {
                profile="preprod"
            }
            echo "this run with profile: ${profile}"
        }

        stage('Build') {
            // Build the Angular app
            sh "ng build --source-map --configuration=${profile} --base-href=./ --output-path=dist/brandnti"
        }

        stage('Approve Deployment') {
            timeout(time: 60, unit: "MINUTES") {
                 input message: 'Do you want to approve the deployment?', ok: 'Yes'
            }
        }

        stage('Archive Artifacts') {
            // Archive the build artifacts
            archiveArtifacts artifacts: 'dist/brandnti/**', allowEmptyArchive: true
        }

        stage('Deploy to Apache2') {

            // Remove the specific app deployment
            sh """
                sudo rm -rf /var/www/html/brandnti-${profile}/
            """

            // Copy new deployment files
            sh """
                sudo mkdir -p /var/www/html/brandnti-${profile}
                sudo cp -r dist/brandnti/* /var/www/html/brandnti-${profile}/
            """
        }

        stage('Restart Apache2') {
            sh """
                sudo systemctl restart apache2
            """
        }
    } catch (Exception e) {
        currentBuild.result = 'FAILURE'
        throw e
    } finally {
        // Cleanup actions if needed, for example:
        // sh 'rm -rf node_modules'
    }
}
