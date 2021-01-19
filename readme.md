Install dependencies:
    npm i

Install Browser Sync and Nodemon:
    npm i browser-sync -g
    npm install nodemon -g

NPM Scritps:
    run npm dev

Nodemon localhost address: http://localhost:3000/

Local Docker commands:

    cd dist

    Build Docker image:
        docker build -t johnjamison/mailer .

    Run Docker container (on port 3030):
        docker run -p 3030:3030 -e "PORT=3030" -e "SG_API_KEY=SG._XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" johnjamison/mailer

    Push to Docker Hub:
        docker push johnjamison/mailer

Docker server side commands:

    Destroy everything:
        docker container rm -f $(docker ps -aq)

    Pull the latest image:
        docker pull johnjamison/mailer

    Run the image (on port 80):
        docker run -p 80:80 -e "PORT=80" -e "SG_API_KEY=SG._XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" johnjamison/mailer

Serivces:
https://sendgrid.com/

Tutorials and guides:
https://regbrain.com/article/nunjucks-express-app
https://www.smashingmagazine.com/2020/04/express-api-backend-project-postgresql/
https://www.digitalocean.com/community/tutorials/use-expressjs-to-get-url-and-post-parameters
https://vsupalov.com/docker-arg-env-variable-guide/
https://compiledsuccessfully.dev/git-skip-worktree/